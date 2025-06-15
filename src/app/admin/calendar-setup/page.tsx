'use client';
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/ToastProvider';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function CalendarSetupPage() {
  const [authUrl, setAuthUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Verificar si ya hay autorización
      const response = await fetch('/api/appointments/available?date=2025-01-01');
      if (response.ok) {
        setIsAuthorized(true);
      }    } catch (error) {
      // No hay autorización
      console.log('No hay autorización previa', error);
    }
  };

  const getAuthUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/google');
      const data = await response.json();
      
      if (data.success) {
        setAuthUrl(data.authUrl);
        addToast({
          type: 'info',
          title: 'URL de autorización generada',
          message: 'Haz clic en el enlace para autorizar el acceso a Google Calendar'
        });
      } else {
        addToast({
          type: 'error',
          title: 'Error al generar autorización',
          message: data.message
        });
      }    } catch (error) {
      console.error('Error getting auth URL:', error);
      addToast({
        type: 'error',
        title: 'Error de conexión',
        message: 'No se pudo conectar con el servidor'
      });
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/appointments/available?date=' + new Date().toISOString().split('T')[0]);
      const data = await response.json();
      
      if (data.success) {
        addToast({
          type: 'success',
          title: 'Conexión exitosa',
          message: 'Google Calendar está conectado correctamente'
        });
        setIsAuthorized(true);
      } else {
        addToast({
          type: 'error',
          title: 'Error de conexión',
          message: 'No se pudo conectar con Google Calendar'
        });
      }    } catch (error) {
      console.error('Error testing connection:', error);
      addToast({
        type: 'error',
        title: 'Error de prueba',
        message: 'Error al probar la conexión'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Configuración de Google Calendar
            </h1>
            <p className="mt-2 text-gray-600">
              Configura la integración con Google Calendar para gestionar las citas automáticamente
            </p>
          </div>

          {/* Estado de conexión */}
          <div className={`mb-8 p-4 rounded-lg ${
            isAuthorized 
              ? 'bg-green-50 border border-green-200' 
              : 'bg-yellow-50 border border-yellow-200'
          }`}>
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${
                isAuthorized ? 'bg-green-500' : 'bg-yellow-500'
              }`}></div>
              <span className={`font-medium ${
                isAuthorized ? 'text-green-800' : 'text-yellow-800'
              }`}>
                {isAuthorized 
                  ? '✅ Google Calendar conectado' 
                  : '⚠️ Google Calendar no conectado'
                }
              </span>
            </div>
          </div>

          {/* Instrucciones */}          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Pasos para configurar:</h2>
            <ol className="list-decimal list-inside space-y-3 text-gray-700">
              <li>Asegúrate de tener configuradas las variables de entorno en tu archivo .env</li>
              <li>Haz clic en &quot;Generar URL de Autorización&quot; para obtener el enlace</li>
              <li>Visita el enlace y autoriza el acceso a tu Google Calendar</li>
              <li>Copia el refresh token que obtengas y agrégalo a tu .env</li>
              <li>Prueba la conexión para verificar que todo funciona</li>
            </ol>
          </div>

          {/* Variables de entorno requeridas */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">            <h3 className="font-semibold mb-2">Variables de entorno requeridas (.env):</h3>
            <pre className="text-sm text-gray-700 overflow-x-auto">
{`GOOGLE_CLIENT_ID=tu_client_id_aquí
GOOGLE_CLIENT_SECRET=tu_client_secret_aquí
GOOGLE_REFRESH_TOKEN=tu_refresh_token_aquí
GOOGLE_CALENDAR_ID=primary
GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback`}
            </pre>
          </div>

          {/* Acciones */}
          <div className="space-y-4">
            <button
              onClick={getAuthUrl}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Generando...</span>
                </>
              ) : (
                'Generar URL de Autorización'
              )}
            </button>

            {authUrl && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">                <p className="font-medium text-blue-900 mb-2">URL de Autorización:</p>
                <a 
                  href={authUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline break-all"
                >
                  {authUrl}
                </a>
                <p className="text-sm text-blue-700 mt-2">
                  Haz clic en el enlace para autorizar el acceso a Google Calendar
                </p>
              </div>
            )}

            <button
              onClick={testConnection}
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Probando...</span>
                </>
              ) : (
                'Probar Conexión'
              )}
            </button>
          </div>

          {/* Información adicional */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold mb-2">ℹ️ Información importante:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Esta configuración solo la debe hacer un administrador</li>
              <li>• Los tokens de acceso se guardan de forma segura</li>
              <li>• Una vez configurado, las citas se sincronizarán automáticamente</li>
              <li>• Puedes cambiar el calendario usando GOOGLE_CALENDAR_ID</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
