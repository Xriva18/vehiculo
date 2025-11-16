import { useState, useEffect } from 'react';
import { getVehiculosConAccesorios } from '../services/vehiculoService';

function Consultas() {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculosFiltrados, setVehiculosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Estados para los filtros
  const [filtroAnio, setFiltroAnio] = useState('');
  const [filtroMarcaModelo, setFiltroMarcaModelo] = useState('');
  const [filtroAccesorio, setFiltroAccesorio] = useState('');
  const [filtroRangoPrecio, setFiltroRangoPrecio] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      const data = await getVehiculosConAccesorios();
      setVehiculos(data);
      setLoading(false);
    }
    cargarDatos();
  }, []);

  // Obtener opciones únicas para los dropdowns
  const añosUnicos = [...new Set(vehiculos.map(v => v.anio))].sort((a, b) => b - a);
  const marcasModelosUnicos = [...new Set(vehiculos.map(v => `${v.marca}/${v.modelo}`))].sort();
  const accesoriosUnicos = [...new Set(
    vehiculos.flatMap(v => v.accesorios?.map(acc => acc.nombre_accesorio) || [])
  )].sort();

  // Rangos de precios predefinidos
  const rangosPrecio = [
    { label: 'Todos', value: '' },
    { label: '$0 - $50,000', value: '0-50000' },
    { label: '$50,000 - $100,000', value: '50000-100000' },
    { label: '$100,000 - $200,000', value: '100000-200000' },
    { label: '$200,000 - $500,000', value: '200000-500000' },
    { label: '$500,000+', value: '500000+' },
  ];

  const aplicarFiltros = () => {
    let filtrados = [...vehiculos];

    // Filtro por año
    if (filtroAnio) {
      filtrados = filtrados.filter(v => v.anio === parseInt(filtroAnio));
    }

    // Filtro por marca/modelo
    if (filtroMarcaModelo) {
      const [marca, modelo] = filtroMarcaModelo.split('/');
      filtrados = filtrados.filter(v => v.marca === marca && v.modelo === modelo);
    }

    // Filtro por accesorio
    if (filtroAccesorio) {
      filtrados = filtrados.filter(v =>
        v.accesorios?.some(acc => acc.nombre_accesorio === filtroAccesorio)
      );
    }

    // Filtro por rango de precio
    if (filtroRangoPrecio) {
      if (filtroRangoPrecio === '500000+') {
        filtrados = filtrados.filter(v => v.precio && v.precio >= 500000);
      } else {
        const [min, max] = filtroRangoPrecio.split('-').map(Number);
        filtrados = filtrados.filter(v => v.precio && v.precio >= min && v.precio < max);
      }
    }

    setVehiculosFiltrados(filtrados);
    setMostrarResultados(true);
  };

  const verTodo = () => {
    setVehiculosFiltrados(vehiculos);
    setMostrarResultados(true);
    // Limpiar filtros
    setFiltroAnio('');
    setFiltroMarcaModelo('');
    setFiltroAccesorio('');
    setFiltroRangoPrecio('');
  };

  const limpiarFiltros = () => {
    setFiltroAnio('');
    setFiltroMarcaModelo('');
    setFiltroAccesorio('');
    setFiltroRangoPrecio('');
    setMostrarResultados(false);
    setVehiculosFiltrados([]);
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="bg-gray-100 rounded-lg p-6">
        {/* Formulario de filtros */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-xl font-bold text-gray-800">Parámetros de Consulta</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Filtro Año */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Año_Modelo
              </label>
              <select
                value={filtroAnio}
                onChange={(e) => setFiltroAnio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                {añosUnicos.map((anio) => (
                  <option key={anio} value={anio}>
                    {anio}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Marca/Modelo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Marca/Modelo
              </label>
              <select
                value={filtroMarcaModelo}
                onChange={(e) => setFiltroMarcaModelo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                {marcasModelosUnicos.map((marcaModelo) => (
                  <option key={marcaModelo} value={marcaModelo}>
                    {marcaModelo}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Accesorios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Accesorios
              </label>
              <select
                value={filtroAccesorio}
                onChange={(e) => setFiltroAccesorio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Todos</option>
                {accesoriosUnicos.map((accesorio) => (
                  <option key={accesorio} value={accesorio}>
                    {accesorio}
                  </option>
                ))}
              </select>
            </div>

            {/* Filtro Rango de Precios */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rango de Precios
              </label>
              <select
                value={filtroRangoPrecio}
                onChange={(e) => setFiltroRangoPrecio(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {rangosPrecio.map((rango) => (
                  <option key={rango.value} value={rango.value}>
                    {rango.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Botones */}
          <div className="flex gap-3 justify-center">
            <button
              onClick={aplicarFiltros}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Buscar
            </button>
            <button
              onClick={verTodo}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
            >
              Ver Todo
            </button>
            {mostrarResultados && (
              <button
                onClick={limpiarFiltros}
                className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 font-medium"
              >
                Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Resultados */}
        {mostrarResultados && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Resultados: {vehiculosFiltrados.length} vehículo(s) encontrado(s)
            </h3>
            {vehiculosFiltrados.length === 0 ? (
              <p className="text-gray-600 text-center py-8">
                No se encontraron vehículos con los filtros seleccionados.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {vehiculosFiltrados.map((vehiculo) => (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Consultas;

