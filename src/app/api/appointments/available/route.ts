import { NextRequest, NextResponse } from 'next/server';
import GoogleCalendarService from '@/lib/googleCalendar';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json(
        { success: false, message: 'Fecha requerida' },
        { status: 400 }
      );
    }

    // Validar formato de fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json(
        { success: false, message: 'Formato de fecha inválido (YYYY-MM-DD)' },
        { status: 400 }
      );
    }

    const availableSlots = await GoogleCalendarService.getAvailableSlots(date);

    return NextResponse.json({
      success: true,
      date: date,
      availableSlots: availableSlots
    });

  } catch (error) {
    console.error('Error obteniendo slots disponibles:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error obteniendo horarios disponibles',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
