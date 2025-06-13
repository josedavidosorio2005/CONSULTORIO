import { NextRequest, NextResponse } from 'next/server';
import GoogleCalendarService from '@/lib/googleCalendar';

export async function POST(request: NextRequest) {
  try {
    const appointmentData = await request.json();

    // Validar datos requeridos
    const requiredFields = ['nombre', 'email', 'telefono', 'fecha', 'hora', 'servicio'];
    const missingFields = requiredFields.filter(field => !appointmentData[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Campos requeridos faltantes: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    // Crear evento en Google Calendar
    const result = await GoogleCalendarService.createAppointment(appointmentData);

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Cita creada exitosamente',
        eventId: result.eventId,
        eventLink: result.eventLink
      });
    } else {
      return NextResponse.json(
        { 
          success: false, 
          message: result.message,
          error: result.error 
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error en API de citas:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error interno del servidor',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
