import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-blue-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Página no encontrada
          </h2>
          <p className="text-gray-600 mb-8">
            Lo sentimos, la página que buscas no existe o ha sido movida.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </Link>
          
          <div className="flex justify-center space-x-4">
            <Link
              href="/servicios"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Servicios
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/contacto"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contacto
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/cita"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Reservar Cita
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
