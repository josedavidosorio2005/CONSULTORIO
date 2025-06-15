import { google } from 'googleapis';
import type { calendar_v3 } from 'googleapis';

export interface CalendarEvent {
  summary: string;
  description?: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  attendees?: Array<{
    email: string;
    displayName?: string;
  }>;
}

export interface AppointmentData {
  nombre: string;
  email: string;
  telefono: string;
  fecha: string;
  hora: string;
  servicio: string;
  comentarios?: string;
}

export interface CalendarResponse {
  success: boolean;
  eventId?: string;
  eventLink?: string;
  message: string;
  error?: string;
}

export interface AvailableSlotsResponse {
  success: boolean;
  availableSlots: string[];
  error?: string;
}

export interface AuthResponse {
  success: boolean;
  tokens?: Record<string, unknown>;
  message: string;
  error?: string;
}

class GoogleCalendarService {
  private calendar: calendar_v3.Calendar | null = null;
  private auth: InstanceType<typeof google.auth.OAuth2> | null = null;

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth(): Promise<void> {
    try {
      // Configuración de autenticación usando variables de entorno
      const credentials = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'
      };

      this.auth = new google.auth.OAuth2(
        credentials.client_id,
        credentials.client_secret,
        credentials.redirect_uri
      );

      // Si tienes un refresh token guardado
      if (process.env.GOOGLE_REFRESH_TOKEN) {
        this.auth.setCredentials({
          refresh_token: process.env.GOOGLE_REFRESH_TOKEN
        });
      }

      this.calendar = google.calendar({ version: 'v3', auth: this.auth });
    } catch (error) {
      console.error('Error inicializando Google Calendar:', error);
    }
  }

  // Crear evento en Google Calendar
  async createAppointment(appointmentData: AppointmentData): Promise<CalendarResponse> {
    if (!this.calendar) {
      return {
        success: false,
        message: 'Google Calendar no está inicializado',
        error: 'Calendar service not initialized'
      };
    }

    try {
      // Combinar fecha y hora
      const startDateTime = new Date(`${appointmentData.fecha}T${appointmentData.hora}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // 1 hora después

      const event: CalendarEvent = {
        summary: `Cita FisioSalut - ${appointmentData.servicio}`,
        description: `
          Cliente: ${appointmentData.nombre}
          Teléfono: ${appointmentData.telefono}
          Servicio: ${appointmentData.servicio}
          Comentarios: ${appointmentData.comentarios || 'Ninguno'}
        `.trim(),
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'Europe/Madrid',
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'Europe/Madrid',
        },
        attendees: [
          {
            email: appointmentData.email,
            displayName: appointmentData.nombre
          }
        ],
      };

      const response = await this.calendar.events.insert({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        requestBody: event,
        sendUpdates: 'all', // Envía invitaciones por email
      });

      return {
        success: true,
        eventId: response.data.id || undefined,
        eventLink: response.data.htmlLink || undefined,
        message: 'Cita creada exitosamente en Google Calendar'
      };

    } catch (error) {
      console.error('Error creando cita en Google Calendar:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Error al crear la cita en Google Calendar'
      };
    }
  }

  // Obtener eventos disponibles
  async getAvailableSlots(date: string): Promise<string[]> {
    if (!this.calendar) {
      console.error('Google Calendar no está inicializado');
      // Retornar slots por defecto si hay error
      return ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];
    }

    try {
      const startOfDay = new Date(`${date}T09:00:00`);
      const endOfDay = new Date(`${date}T20:00:00`);

      const response = await this.calendar.events.list({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.data.items || [];
      const busySlots = events.map((event) => {
        if (event.start?.dateTime) {
          const start = new Date(event.start.dateTime);
          return start.getHours().toString().padStart(2, '0') + ':' + 
                 start.getMinutes().toString().padStart(2, '0');
        }
        return null;
      }).filter(Boolean) as string[];

      // Generar slots disponibles (9:00 - 20:00, cada 30 minutos)
      const allSlots: string[] = [];
      for (let hour = 9; hour < 20; hour++) {
        allSlots.push(`${hour.toString().padStart(2, '0')}:00`);
        allSlots.push(`${hour.toString().padStart(2, '0')}:30`);
      }

      // Filtrar slots ocupados
      return allSlots.filter(slot => !busySlots.includes(slot));

    } catch (error) {
      console.error('Error obteniendo slots disponibles:', error);
      // Retornar slots por defecto si hay error
      return ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'];    }
  }

  // Cancelar cita
  async cancelAppointment(eventId: string): Promise<CalendarResponse> {
    if (!this.calendar) {
      return {
        success: false,
        message: 'Google Calendar no está inicializado',
        error: 'Calendar service not initialized'
      };
    }

    try {
      await this.calendar.events.delete({
        calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
        eventId: eventId,
        sendUpdates: 'all'
      });

      return {
        success: true,
        message: 'Cita cancelada exitosamente'
      };

    } catch (error) {
      console.error('Error cancelando cita:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Error al cancelar la cita'
      };
    }
  }

  // Obtener URL de autorización para setup inicial
  getAuthUrl(): string {
    if (!this.auth) {
      throw new Error('OAuth2 client not initialized');
    }

    const scopes = [
      'https://www.googleapis.com/auth/calendar',
      'https://www.googleapis.com/auth/calendar.events'
    ];

    return this.auth.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
      prompt: 'consent'
    });
  }

  // Procesar código de autorización
  async processAuthCode(code: string): Promise<AuthResponse> {
    if (!this.auth) {
      return {
        success: false,
        message: 'OAuth2 client not initialized',
        error: 'Auth client not initialized'
      };
    }

    try {
      const { tokens } = await this.auth.getToken(code);
      this.auth.setCredentials(tokens);      return {
        success: true,
        tokens: tokens as Record<string, unknown>,
        message: 'Autorización completada exitosamente'
      };

    } catch (error) {
      console.error('Error procesando código de autorización:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Error en la autorización'
      };
    }
  }
}

// Export a singleton instance
const googleCalendarService = new GoogleCalendarService();
export default googleCalendarService;
