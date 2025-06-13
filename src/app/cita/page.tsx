'use client';
import { useState } from 'react';
import { useValidation } from '@/hooks/useValidation';
import { useToast } from '@/components/ui/ToastProvider';

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
  ];

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
      // Simular envío del formulario
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      addToast({
        type: 'success',
        title: 'Cita solicitada exitosamente',
        message: 'Te contactaremos pronto para confirmar tu cita'
      });
      
      resetForm();    } catch (err) {
      console.error('Error al solicitar cita:', err);
      addToast({
        type: 'error',
        title: 'Error al solicitar cita',
        message: 'Hubo un problema al procesar tu solicitud. Inténtalo de nuevo.'
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
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Reserva tu Cita</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Completa el formulario para solicitar una cita con nuestros profesionales
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl">        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
              />
              {isFieldInvalid('telefono') && (
                <p className="mt-1 text-sm text-red-600">{errors.telefono}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="fecha" className="block text-sm font-semibold leading-6 text-gray-900">
              Fecha preferida
            </label>
            <div className="mt-2.5">
              <input
                type="date"
                name="fecha"
                id="fecha"
                required
                value={data.fecha}
                onChange={(e) => updateField('fecha', e.target.value)}
                onBlur={() => handleBlur('fecha')}
                className={getFieldClasses('fecha')}
              />
              {isFieldInvalid('fecha') && (
                <p className="mt-1 text-sm text-red-600">{errors.fecha}</p>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="hora" className="block text-sm font-semibold leading-6 text-gray-900">
              Hora preferida
            </label>
            <div className="mt-2.5">
              <input
                type="time"
                name="hora"
                id="hora"
                required
                value={data.hora}
                onChange={(e) => updateField('hora', e.target.value)}
                onBlur={() => handleBlur('hora')}
                className={getFieldClasses('hora')}
              />
              {isFieldInvalid('hora') && (
                <p className="mt-1 text-sm text-red-600">{errors.hora}</p>
              )}
            </div>
          </div>
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
            disabled={isSubmitting}
            className="block w-full rounded-md bg-blue-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Solicitar Cita'}
          </button>
        </div>
      </form>
    </div>
  );
}
