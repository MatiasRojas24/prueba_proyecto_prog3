import { FC, useState } from "react";
import { ICreateSucursal } from "../../../../../../types/dtos/sucursal/ICreateSucursal";
import { SucursalService } from "../../../../../../services/SucursalService";
import { useAppDispatch, useAppSelector } from "../../../../../../hooks/redux";
import { Button, Form, Modal } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import TextFieldValue from "../../../../textField/TextField";
import styles from "./ModalCrearSucursal.module.css"

interface IModalSucursal {
    openModal: boolean;
    setOpenModal: (state: boolean) => void;
}

export const ModalCrearSucursal: FC<IModalSucursal> = ({ openModal, setOpenModal }: IModalSucursal) => {
    const empresaActive = useAppSelector(
        (state) => state.empresaReducer.empresaActive
    );
    const sucursalActive = useAppSelector(
        (state) => state.sucursalReducer.sucursalActive
    );

    const initialValues: ICreateSucursal = {
        nombre: "",
        horarioApertura: "",
        horarioCierre: "",
        esCasaMatriz: false,
        latitud: 0,
        longitud: 0,
        domicilio: {
            calle: "",
            numero: 0,
            cp: 0,
            piso: 0,
            nroDpto: 0,
            idLocalidad: 0,
        },
        idEmpresa: (empresaActive ? (empresaActive.id) : (0)),
        logo: null,
    }

    const API_URL = import.meta.env.VITE_API_URL;
    const sucursalService = new SucursalService(API_URL + "/sucursales/create")

    const dispatch = useAppDispatch();

    const handleClose = () => {
        setOpenModal(false);
        setSelectedImage(null)
        setImagePreviewUrl(null)
    };

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
                id={"sucursalModal"}
                show={openModal}
                onHide={handleClose}
                size={"xl"}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header className={styles.modalHeader}>
                    {sucursalActive ?
                        (
                            <Modal.Title>Editar Sucursal</Modal.Title>
                        )
                        :
                        (
                            <Modal.Title>Crear una Sucursal</Modal.Title>
                        )}
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                    <Formik
                        validationSchema={Yup.object({
                            nombre: Yup.string().required("campo requerido"),
                            horarioApertura: Yup.string().required("campo requerido"),
                            horarioCierre: Yup.string().required("campo requerido"),
                            esCasaMatriz: Yup.boolean(),
                            latitud: Yup.number().required("campo requerido"),
                            longitud: Yup.number().required("campo requerido"),
                            calle: Yup.string().required("campo requerido"),
                            numero: Yup.number().required("campo requerido"),
                            cp: Yup.number().required("campo requerido"),
                            piso: Yup.number().required("campo requerido"),
                            nroDpto: Yup.number().required("campo requerido"),
                            idLocalidad: Yup.number().required("campo requerido"),
                            logo: Yup.string().required("campo requerido"),
                        })}
                        initialValues={sucursalActive ? sucursalActive : initialValues}
                        enableReinitialize={true}
                        onSubmit={async (values: ICreateSucursal) => {
                            handleClose();
                        }}
                    >
                        {() => (
                            <Form autoComplete="off" style={{ display: "flex", flexDirection: "column", gap: "5vh" }}>
                                <div className={styles.containerFormModal}>
                                    <div className={styles.containerFormModalIzquierda}>
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                    </div>
                                    <div className={styles.containerFormModalCentro}>
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                    </div>
                                    <div className={styles.containerFormModalDerecha}>
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                        <TextFieldValue
                                            name="nombre"
                                            type="text"
                                            placeholder="Ingrese su nombre"
                                            customWidth="45vh"
                                        />
                                    </div>
                                </div>
                                <div className={styles.containerImagen}>
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
