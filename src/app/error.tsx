'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-red-600 mb-4">Oops!</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Algo salió mal
          </h2>
          <p className="text-gray-600 mb-8">
            Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => reset()}
            className="inline-block w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            Intentar de nuevo
          </button>
          
          <Link
            href="/"
            className="inline-block w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Volver al inicio
          </Link>
          
          <div className="text-sm text-gray-500">
            Si el problema persiste, contacta con nuestro equipo de soporte.
          </div>
        </div>
      </div>
    </div>
  );
}
