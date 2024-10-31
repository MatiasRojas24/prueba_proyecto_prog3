import { ISucursal } from "../types/dtos/sucursal/ISucursal";
import { BackendClient } from "./BackendClient";

// Clase PersonaService que extiende BackendClient para interactuar con la API de empresa
export class SucursalService extends BackendClient<ISucursal> {
    async getAllByEmpresaId(id:number): Promise<ISucursal[]> {
        const response = await fetch(`${this.baseUrl}/${id}`);
        const data = await response.json();
        return data as ISucursal[];
    }
}
