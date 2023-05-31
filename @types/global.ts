type AlertType = 'error' | 'warning' | 'info' | 'success';
type AlertOptions = { message: string; body?: string; duration?: number };
type AlertEventPayload = AlertOptions & { type: AlertType };

export type { AlertOptions, AlertType, AlertEventPayload };
