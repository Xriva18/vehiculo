import { useState } from 'react';
import Consultas from './components/Consultas';
import Inventario from './components/Inventario';

function App() {
  const [tabActivo, setTabActivo] = useState('consultas');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header azul */}
      <header className="bg-blue-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold">Venta Vehículos por Internet</h1>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex space-x-1 px-6">
          <button
            onClick={() => setTabActivo('consultas')}
            className={`px-6 py-4 font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative ${
              tabActivo === 'consultas' ? 'text-blue-600' : ''
            }`}
          >
            Parámetros Consulta
            {tabActivo === 'consultas' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></span>
            )}
          </button>
          <button
            onClick={() => setTabActivo('inventario')}
            className={`px-6 py-4 font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 relative ${
              tabActivo === 'inventario' ? 'text-blue-600' : ''
            }`}
          >
            Inventario de Vehículos
            {tabActivo === 'inventario' && (
              <span className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></span>
            )}
          </button>
        </div>
      </div>

      {/* Contenido */}
      <main className="bg-gray-50 min-h-screen">
        {tabActivo === 'consultas' && <Consultas />}
        {tabActivo === 'inventario' && <Inventario />}
      </main>
    </div>
  );
}

export default App;
