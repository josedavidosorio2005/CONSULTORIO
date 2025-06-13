import { NextRequest, NextResponse } from 'next/server';
import GoogleCalendarService from '@/lib/googleCalendar';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (code) {
      // Procesar código de autorización
      const result = await GoogleCalendarService.processAuthCode(code);
      
      if (result.success) {
        return NextResponse.json({
          success: true,
          message: 'Autorización completada exitosamente',
          tokens: result.tokens
        });
      } else {
        return NextResponse.json(
          { 
            success: false, 
            message: result.message,
            error: result.error 
          },
          { status: 400 }
        );
      }
    } else {
      // Generar URL de autorización
      const authUrl = GoogleCalendarService.getAuthUrl();
      
      return NextResponse.json({
        success: true,
        authUrl: authUrl,
        message: 'Visita la URL de autorización para conectar con Google Calendar'
      });
    }

  } catch (error) {
    console.error('Error en autenticación de Google Calendar:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Error en la autenticación',
        error: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
