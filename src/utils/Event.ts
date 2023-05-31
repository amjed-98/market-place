/* eslint-disable no-undef */

import type { AlertEventPayload } from '../../@types/global';

/* eslint-disable no-unused-vars */
type EventType = keyof DocumentEventMap | 'alert';
type Listener<E extends EventType, Payload> = (
  event: CustomEvent<E extends 'alert' ? AlertEventPayload : Payload>,
) => void;

const Event = {
  on<E extends EventType, Payload>(eventType: E, listener: Listener<E, Payload>) {
    document.addEventListener(eventType, listener as EventListener);

    return () => this.off(eventType, listener);
  },

  off<E extends EventType, Payload>(eventType: E, listener: Listener<E, Payload>) {
    document.removeEventListener(eventType, listener as EventListener);
  },

  emit<E extends EventType, Payload>(eventType: E, payload?: Payload) {
    const event = new CustomEvent<Payload>(eventType, { detail: payload });

    return document.dispatchEvent(event);
  },
};

export default Event;
