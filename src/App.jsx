import { useState, useEffect } from 'react'
import { getVehiculos, getAccesoriosVehiculo } from './services/vehiculoService';

function App() {

  const [vehiculos, setVehiculos] = useState([]);
  const [accesorios, setAccesorios] = useState([]);
  
  useEffect(() => {
    async function cargarDatos() {
      const vehiculosData = await getVehiculos();
      const accesoriosData = await getAccesoriosVehiculo();
      setVehiculos(vehiculosData);
      setAccesorios(accesoriosData);
    }
    cargarDatos();
  }, []);
  

  return (
    <>
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Vehículos</h2>
        <ul className="list-disc list-inside bg-red-200 p-4 rounded">
          {vehiculos.map((vehiculo) => (
            <li >{JSON.stringify(vehiculo)}</li>
          ))}
        </ul>
      </div>
      
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Accesorios de Vehículos</h2>
        <ul className="list-disc list-inside bg-blue-200 p-4 rounded">
          {accesorios.map((accesorio) => (
            <li >{ JSON.stringify(accesorio)}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
