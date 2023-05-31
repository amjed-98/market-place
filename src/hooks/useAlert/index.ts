import { useCallback } from 'react';
import { Event } from '@/utils';
import type { AlertOptions, AlertType } from '../../../@types/global';

export default function useAlert() {
  const showAlert = (type: AlertType, { message, body, duration = 3000 }: AlertOptions) => {
    Event.emit('alert', { type, message, body, duration });
  };

  return {
    showAlert: useCallback(showAlert, []),
  };
}
