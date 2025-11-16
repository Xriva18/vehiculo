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

