import type { AsientoRequest } from "@/types/asientoRequest.interface";
import type { AsientoResponse } from "@/types/asientoResponse.interface";
import api from "@/lib/axios";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { toast } from "react-toastify";


export class EstadisticasService {

    public static async totalAsientosUltimosTresMeses(

    ): Promise<any> {
        try {
            const response = await api.get('estadisticas/tres-meses')
            console.log("respuesta del api directa", response.data);
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const message =
                    error.status + " " + error.response?.data?.message || error.message;
                throw new Error(`Error al obtener asientos de los ultimos 3 meses: ${message}`);
            }
            throw new Error("Error desconocido al consultar estadisticas de asientos");
        }
    }

}
