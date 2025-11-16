import { useState, useEffect } from 'react';
import { getVehiculos } from '../services/vehiculoService';

function Inventario() {
  const [vehiculos, setVehiculos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function cargarVehiculos() {
      const data = await getVehiculos();
      setVehiculos(data);
      setLoading(false);
    }
    cargarVehiculos();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Cargando inventario...</p>
      </div>
    );
  }

  if (vehiculos.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No hay vehículos disponibles en el inventario.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Listado de Vehículos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehiculos.map((vehiculo) => (
          <div
            key={vehiculo.numero_serie_vehiculo}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Imagen del vehículo */}
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
              {vehiculo.foto ? (
                <img
                  src={vehiculo.foto}
                  alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div
                className="w-full h-full flex items-center justify-center text-gray-400"
                style={{ display: vehiculo.foto ? 'none' : 'flex' }}
              >
                <svg
                  className="w-16 h-16"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            {/* Información del vehículo */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {vehiculo.marca} {vehiculo.modelo}
              </h3>
              <div className="space-y-1 text-sm text-gray-600">
                <p><span className="font-semibold">Número de Serie:</span> {vehiculo.numero_serie_vehiculo}</p>
                <p><span className="font-semibold">Marca:</span> {vehiculo.marca}</p>
                <p><span className="font-semibold">Modelo:</span> {vehiculo.modelo}</p>
                <p><span className="font-semibold">Año:</span> {vehiculo.anio}</p>
                <p><span className="font-semibold">Color:</span> {vehiculo.color || 'N/A'}</p>
                <p><span className="font-semibold">Kilometraje:</span> {vehiculo.kilometraje ? `${vehiculo.kilometraje.toLocaleString()} km` : 'N/A'}</p>
                <p><span className="font-semibold">Condición:</span> {vehiculo.condicion || 'N/A'}</p>
                <p className="text-lg font-bold text-blue-600 mt-2">
                  ${vehiculo.precio ? vehiculo.precio.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'N/A'}
                </p>
                <div className="mt-2">
                  <span
                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                      vehiculo.estado_disponibilidad
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {vehiculo.estado_disponibilidad ? 'Disponible' : 'No Disponible'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventario;

