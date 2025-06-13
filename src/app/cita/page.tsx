'use client';
import { useState } from 'react';
import { useValidation } from '@/hooks/useValidation';
import { useToast } from '@/components/ui/ToastProvider';
import Calendar from '@/components/ui/Calendar';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

interface CitaFormData extends Record<string, string> {
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  servicio: string;
  comentarios: string;
}

const initialData: CitaFormData = {
  nombre: '',
  email: '',
  telefono: '',
  fecha: '',
  hora: '',
  servicio: '',
  comentarios: '',
};

const validationConfig = {
  nombre: { required: true, minLength: 2, maxLength: 50 },
  email: { required: true, email: true },
  telefono: { required: true, phone: true },
  fecha: { required: true },
  hora: { required: true },
  servicio: { required: true },
  comentarios: { maxLength: 500 }
};

export default function CitaPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [showCalendar, setShowCalendar] = useState(false);
  const { addToast } = useToast();
  
  const {
    data,
    errors,
    updateField,
    handleBlur,
    validateAll,
    resetForm,
    isFieldInvalid
  } = useValidation(initialData, validationConfig);

  const servicios = [
    'Fisioterapia Deportiva',
    'Rehabilitación Física', 
    'Terapia Manual',
    'Fisioterapia Neurológica',
    'Masaje Terapéutico',
    'Punción Seca',
    'Ondas de Choque',
    'Electroterapia'
  ];

  // Manejar selección de fecha y hora desde el calendario
  const handleTimeSelect = (date: Date, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    
    // Actualizar los campos del formulario
    const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
    updateField('fecha', formattedDate);
    updateField('hora', time);
    
    if (time) {
      addToast({
        type: 'success',
        title: 'Horario seleccionado',
        message: `${date.toLocaleDateString('es-ES', { 
          weekday: 'long', 
          day: 'numeric', 
          month: 'long' 
        })} a las ${time}`
      });
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) {
      addToast({
        type: 'error',
        title: 'Error en el formulario',
        message: 'Por favor, corrige los errores antes de continuar'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Enviar datos a la API de Google Calendar
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        addToast({
          type: 'success',
          title: 'Cita creada exitosamente',
          message: 'Tu cita ha sido agendada en Google Calendar. Recibirás una invitación por email.'
        });
        
        // Mostrar enlace al evento (opcional)
        if (result.eventLink) {
          console.log('Enlace del evento:', result.eventLink);
        }
        
        // Reset form and calendar state
        resetForm();
        setSelectedDate(null);
        setSelectedTime('');
        setShowCalendar(false);
      } else {
        addToast({
          type: 'error',
          title: 'Error al crear la cita',
          message: result.message || 'Hubo un problema al agendar tu cita. Inténtalo de nuevo.'
        });
      }
    } catch (err) {
      console.error('Error al solicitar cita:', err);
      addToast({
        type: 'error',
        title: 'Error de conexión',
        message: 'No se pudo conectar con el servidor. Verifica tu conexión e inténtalo de nuevo.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const getFieldClasses = (fieldName: keyof CitaFormData) => {
    const baseClasses = "block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6";
    const errorClasses = "ring-red-300 focus:ring-red-600";
    const normalClasses = "ring-gray-300 focus:ring-blue-600";
    
    return `${baseClasses} ${isFieldInvalid(fieldName as keyof CitaFormData) ? errorClasses : normalClasses}`;
  };
  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reserva tu Cita</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Selecciona una fecha y hora disponible, luego completa tus datos
        </p>
      </div>

      {/* Toggle Calendar/Form */}
      <div className="mx-auto mt-8 max-w-xl">
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={() => setShowCalendar(true)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showCalendar
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📅 Seleccionar Horario
          </button>
          <button
            type="button"
            onClick={() => setShowCalendar(false)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              !showCalendar
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            📝 Datos del Paciente
          </button>
        </div>
      </div>

      {/* Calendar View */}
      {showCalendar && (
        <div className="mt-16">          <Calendar
            onTimeSelect={handleTimeSelect}
            selectedDate={selectedDate || undefined}
            selectedTime={selectedTime}
          />
          
          {selectedDate && selectedTime && (
            <div className="mx-auto mt-8 max-w-xl">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900">Cita Seleccionada:</h3>
                <p className="text-blue-800">
                  📅 {selectedDate.toLocaleDateString('es-ES', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </p>
                <p className="text-blue-800">🕐 {selectedTime}</p>
              </div>
              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => setShowCalendar(false)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Continuar con los Datos →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Form View */}
      {!showCalendar && (
        <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl">
          {/* Selected appointment summary */}
          {selectedDate && selectedTime && (
            <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-900">Horario Seleccionado:</h3>
              <p className="text-green-800">
                📅 {selectedDate.toLocaleDateString('es-ES', { 
                  weekday: 'long', 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })} a las {selectedTime}
              </p>
              <button
                type="button"
                onClick={() => setShowCalendar(true)}
                className="mt-2 text-sm text-green-700 hover:text-green-900 underline"
              >
                Cambiar horario
              </button>
            </div>
          )}

          {!selectedDate || !selectedTime ? (
            <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800">
                ⚠️ Primero selecciona una fecha y hora disponible en el calendario
              </p>
              <button
                type="button"
                onClick={() => setShowCalendar(true)}
                className="mt-2 bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Ir al Calendario
              </button>
            </div>
          ) : null}

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="nombre" className="block text-sm font-semibold leading-6 text-gray-900">
                Nombre completo
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  required
                  value={data.nombre}
                  onChange={(e) => updateField('nombre', e.target.value)}
                  onBlur={() => handleBlur('nombre')}
                  className={getFieldClasses('nombre')}
                  placeholder="Tu nombre completo"
                />
                {isFieldInvalid('nombre') && (
                  <p className="mt-1 text-sm text-red-600">{errors.nombre}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
                Email
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={data.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  className={getFieldClasses('email')}
                  placeholder="tu@email.com"
                />
                {isFieldInvalid('email') && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="telefono" className="block text-sm font-semibold leading-6 text-gray-900">
                Teléfono
              </label>
              <div className="mt-2.5">
                <input
                  type="tel"
                  name="telefono"
                  id="telefono"
                  required
                  value={data.telefono}
                  onChange={(e) => updateField('telefono', e.target.value)}
                  onBlur={() => handleBlur('telefono')}
                  className={getFieldClasses('telefono')}
                  placeholder="+34 123 456 789"
                />
                {isFieldInvalid('telefono') && (
                  <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
                )}
              </div>
            </div>
            
            {/* Hidden fecha and hora fields - populated by calendar */}
            <input type="hidden" name="fecha" value={data.fecha} />
            <input type="hidden" name="hora" value={data.hora} />
            
            <div className="sm:col-span-2">
              <label htmlFor="servicio" className="block text-sm font-semibold leading-6 text-gray-900">
                Servicio
              </label>
              <div className="mt-2.5">
                <select
                  id="servicio"
                  name="servicio"
                  required
                  value={data.servicio}
                  onChange={(e) => updateField('servicio', e.target.value)}
                  onBlur={() => handleBlur('servicio')}
                  className={getFieldClasses('servicio')}
                >
                  <option value="">Selecciona un servicio</option>
                  {servicios.map((servicio) => (
                    <option key={servicio} value={servicio}>
                      {servicio}
                    </option>
                  ))}
                </select>
                {isFieldInvalid('servicio') && (
                  <p className="mt-1 text-sm text-red-600">{errors.servicio}</p>
                )}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="comentarios" className="block text-sm font-semibold leading-6 text-gray-900">
                Comentarios adicionales
              </label>
              <div className="mt-2.5">
                <textarea
                  name="comentarios"
                  id="comentarios"
                  rows={4}
                  value={data.comentarios}
                  onChange={(e) => updateField('comentarios', e.target.value)}
                  onBlur={() => handleBlur('comentarios')}
                  className={getFieldClasses('comentarios')}
                  placeholder="Describe tu consulta o necesidades específicas..."
                />
                {isFieldInvalid('comentarios') && (
                  <p className="mt-1 text-sm text-red-600">{errors.comentarios}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-10">
            <button
              type="submit"
              disabled={isSubmitting || !selectedDate || !selectedTime}
              className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Creando cita...</span>
                </>
              ) : (
                'Confirmar Cita'
              )}
            </button>
            {(!selectedDate || !selectedTime) && (
              <p className="mt-2 text-sm text-gray-600 text-center">
                Selecciona una fecha y hora para continuar
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
