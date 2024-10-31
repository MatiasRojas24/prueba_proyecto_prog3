import { useAppDispatch, useAppSelector } from "../../../../../hooks/redux";
import { EmpresaService } from "../../../../../services/EmpresaService";
import { ICreateEmpresaDto } from "../../../../../types/dtos/empresa/ICreateEmpresaDto";
import { removeEmpresaActive } from "../../../../../redux/store/slices/EmpresaReducer"
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import styles from "./ModalCrearEmpresa.module.css"
import TextFieldValue from "../../../textField/TextField";
import { useState } from "react";

interface IModalEmpresa {
    getEmpresas: Function; // Función para obtener las empresas
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

export const ModalCrearEmpresa = ({
    getEmpresas,
    openModal,
    setOpenModal,
}: IModalEmpresa) => {
    // Valores iniciales para el formulario
    const initialValues: ICreateEmpresaDto = {
        nombre: "",
        razonSocial: "",
        cuit: 0,
        logo: null,
    };

    const API_URL = import.meta.env.VITE_API_URL;
    const empresaService = new EmpresaService(API_URL + "/empresas");

    const empresaActive = useAppSelector(
        (state) => state.empresaReducer.empresaActive
    );
    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpenModal(false);
        setSelectedImage(null)
        setImagePreviewUrl(null)
        dispatch(removeEmpresaActive());
    };

    // Estado del logo de la empresa
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    // Estado para el URL de la imagen
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setImagePreviewUrl(URL.createObjectURL(file)); // Crea la URL de la imagen
        }
    };

    return (
        <div>
            <Modal
                id={"empresaModal"}
                show={openModal}
                onHide={handleClose}
                size={"lg"}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className={styles.modalHeader}>
                    {/* Título del modal dependiendo de si se está editando o añadiendo una empresa */}
                    {empresaActive ? (
                        <Modal.Title>Editar empresa</Modal.Title>
                    ) : (
                        <Modal.Title>Crear una empresa</Modal.Title>
                    )}
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Formik
                        validationSchema={Yup.object({
                            nombre: Yup.string().required("campo requerido"),
                            razonSocial: Yup.string().required("campo requerido"),
                            cuit: Yup.number().required('campo requerido'),
                            logo: Yup.string()
                        })
                        }
                        initialValues={empresaActive ? empresaActive : initialValues}
                        enableReinitialize={true}
                        onSubmit={async (values: ICreateEmpresaDto) => {
                            // Enviar los datos al servidor al enviar el formulario
                            if (empresaActive) {
                                await empresaService.put(empresaActive.id, values);
                            } else {
                                await empresaService.post(values);
                            }
                            // Obtener las personas actualizadas y cerrar el modal
                            getEmpresas();
                            handleClose();
                        }}
                    >
                        {() => (
                            <Form autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "5vh" }}>
                                <div className={styles.containerFormModal}>
                                    <TextFieldValue
                                        name="nombre"
                                        type="text"
                                        placeholder="Ingrese su nombre"
                                        customWidth="45vw"
                                    />
                                    <TextFieldValue
                                        name="razonSocial"
                                        type="text"
                                        placeholder="Ingrese la razón social de la empresa"
                                        customWidth="45vw"
                                    />
                                    <TextFieldValue
                                        name="cuit"
                                        type="number"
                                        placeholder="Ingrese el cuit de la empresa"
                                        customWidth="45vw"
                                    />
                                    <div className={styles.containerAgregarimagen}>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            id="file-upload"
                                            style={{ display: 'none' }} // Oculta el input
                                            name="logo"
                                        />
                                        {/* Botón personalizado */}
                                        <label htmlFor="file-upload" className={styles.customFileUpload}>
                                            Seleccionar imagen
                                        </label>
                                        {selectedImage ? (
                                            <img
                                                src={imagePreviewUrl!}
                                                alt="Vista previa"
                                                style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'cover' }}
                                            />
                                        ) : (
                                            <span className="material-symbols-outlined" style={{ scale: '3.8' }} >no_photography</span>
                                        )}
                                    </div>
                                </div>
                                <div className={styles.containerBotonesFormModal}>
                                    <Button className={styles.buttonModalCancelar} onClick={handleClose}>Cancelar</Button>
                                    <Button className={styles.buttonModalConfirmar} type="submit">Confirmar</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: "#08192D", borderTop: "none" }}></Modal.Footer>
            </Modal>
        </div>
    )
}
