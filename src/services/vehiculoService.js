import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export async function getVehiculos() {
    const { data, error } = await supabase.from("tb_vehiculo").select();
    if (error) {
        console.error("Error obteniendo vehículos:", error);
        return [];
    }
    return data || [];
}

export async function getAccesoriosVehiculo() {
    const { data, error } = await supabase.from("tb_accesorios_vehiculo").select();
    if (error) {
        console.error("Error obteniendo accesorios de vehículos:", error);
        return [];
    }
    return data || [];
}

export async function getVehiculosConAccesorios() {
    const { data: vehiculos, error: errorVehiculos } = await supabase.from("tb_vehiculo").select();
    if (errorVehiculos) {
        console.error("Error obteniendo vehículos:", errorVehiculos);
        return [];
    }

    const { data: accesorios, error: errorAccesorios } = await supabase.from("tb_accesorios_vehiculo").select();
    if (errorAccesorios) {
        console.error("Error obteniendo accesorios:", errorAccesorios);
        return vehiculos || [];
    }

    // Combinar vehículos con sus accesorios
    const vehiculosConAccesorios = (vehiculos || []).map(vehiculo => ({
        ...vehiculo,
        accesorios: (accesorios || []).filter(acc => acc.numero_serie_vehiculo === vehiculo.numero_serie_vehiculo)
    }));

    return vehiculosConAccesorios;
}

