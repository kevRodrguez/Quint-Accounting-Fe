import api from "@/lib/axios";


export class EstadisticasService {

    public static async totalAsientosUltimosTresMeses(

    ): Promise<any> {
        try {
            const response = await api.get('estadisticas/tres-meses')
            console.log("respuesta del api directa", response.data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const message =
                    (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
                throw new Error(`Error al obtener asientos de los ultimos 3 meses: ${message}`);
            }
            throw new Error("Error desconocido al consultar estadisticas de asientos");
        }
    }

    public static async totalActivos(
    ): Promise<any> {
        try {
            const response = await api.get('estadisticas/total-activos-mes')
            console.log("respuesta del api directa", response.data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const message =
                    (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
                throw new Error(`Error al obtener total de activos: ${message}`);
            }
            throw new Error("Error desconocido al consultar total de activos");
        }
    }

    public static async totalPasivos(
    ): Promise<any> {
        try {
            const response = await api.get('estadisticas/total-pasivos-mes')
            console.log("respuesta del api directa", response.data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const message =
                    (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
                throw new Error(`Error al obtener total de pasivos: ${message}`);
            }
            throw new Error("Error desconocido al consultar total de pasivos");
        }
    }

    public static async totalCapitalContable(
    ): Promise<any> {
        try {
            const response = await api.get('estadisticas/total-capital-contable-mes')
            console.log("respuesta del api directa", response.data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const message =
                    (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
                throw new Error(`Error al obtener total de capital contable: ${message}`);
            }
            throw new Error("Error desconocido al consultar total de capital contable");
        }
    }

    public static async totalIngresos(
    ): Promise<any> {
        try {
            const response = await api.get('estadisticas/total-ingresos-mes')
            console.log("respuesta del api directa", response.data);
            return response.data;
        } catch (error: any) {
            if (error.response) {
                const message =
                    (error.response?.status || 'Error') + " " + (error.response?.data?.message || error.message || 'Error desconocido');
                throw new Error(`Error al obtener total de ingresos: ${message}`);
            }
            throw new Error("Error desconocido al consultar total de ingresos");
        }
    }

}
