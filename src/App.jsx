import { useState, useEffect } from 'react'
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

function App() {

  const [vehiculos, setVehiculos] = useState([]);
  
  async function getVehiculos() {
    const { data } = await supabase.from("tb_vehiculo").select();
    setVehiculos(data);
  }
  
  useEffect(() => {
    getVehiculos();
  }, []);
  

  return (
    <>
      
      <ul className="list-disc list-inside bg-red-200">
      {vehiculos.map((vehiculo) => (
        <li key={vehiculo.id || vehiculo.name}>{vehiculo.name || vehiculo.marca || JSON.stringify(vehiculo)}</li>
      ))}
    </ul>
    </>
  )
}

export default App
