import { IEmpresa } from "../types/dtos/empresa/IEmpresa";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de empresa
export class EmpresaService extends BackendClient<IEmpresa> {}
