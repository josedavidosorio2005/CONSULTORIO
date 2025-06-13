'use client';
import { useState, useEffect } from 'react';

interface Contacto {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  mensaje: string;
  leido: boolean;
  createdAt: string;
}

interface Cita {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  servicio: string;
  fecha: string;
  hora: string;
  mensaje?: string;
  estado: string;
  createdAt: string;
}

export default function AdminPage() {
  const [contactos, setContactos] = useState<Contacto[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [activeTab, setActiveTab] = useState<'contactos' | 'citas'>('contactos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [contactosRes, citasRes] = await Promise.all([
        fetch('/api/contacto'),
        fetch('/api/citas')
      ]);
      
      if (contactosRes.ok) {
        const contactosData = await contactosRes.json();
        setContactos(contactosData);
      }
      
      if (citasRes.ok) {
        const citasData = await citasRes.json();
        setCitas(citasData);
      }
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatOnlyDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="mt-2 text-gray-600">Gestiona los mensajes de contacto y las citas programadas</p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('contactos')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'contactos'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Mensajes de Contacto ({contactos.length})
            </button>
            <button
              onClick={() => setActiveTab('citas')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'citas'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Citas Programadas ({citas.length})
            </button>
          </nav>
        </div>

        {/* Contenido de las tabs */}
        {activeTab === 'contactos' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Mensajes de Contacto</h2>
            {contactos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay mensajes de contacto</p>
            ) : (
              <div className="grid gap-6">
                {contactos.map((contacto) => (
                  <div key={contacto.id} className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{contacto.nombre}</h3>
                        <p className="text-sm text-gray-500">
                          {formatDate(contacto.createdAt)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        contacto.leido 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {contacto.leido ? 'Leído' : 'Nuevo'}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Email:</strong> {contacto.email}</p>
                      {contacto.telefono && (
                        <p><strong>Teléfono:</strong> {contacto.telefono}</p>
                      )}
                      <div>
                        <strong>Mensaje:</strong>
                        <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded">{contacto.mensaje}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'citas' && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Citas Programadas</h2>
            {citas.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay citas programadas</p>
            ) : (
              <div className="grid gap-6">
                {citas.map((cita) => (
                  <div key={cita.id} className="bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{cita.nombre}</h3>
                        <p className="text-sm text-gray-500">
                          Solicitada el {formatDate(cita.createdAt)}
                        </p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        cita.estado === 'PENDIENTE' 
                          ? 'bg-yellow-100 text-yellow-800'
                          : cita.estado === 'CONFIRMADA'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cita.estado}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <p><strong>Email:</strong> {cita.email}</p>
                      <p><strong>Teléfono:</strong> {cita.telefono}</p>
                      <p><strong>Servicio:</strong> {cita.servicio}</p>
                      <p><strong>Fecha:</strong> {formatOnlyDate(cita.fecha)}</p>
                      <p><strong>Hora:</strong> {cita.hora}</p>
                      {cita.mensaje && (
                        <div>
                          <strong>Comentarios:</strong>
                          <p className="mt-1 text-gray-700 bg-gray-50 p-3 rounded">{cita.mensaje}</p>
                        </div>
                      )}
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
