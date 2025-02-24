import type { EventSpy } from '../event-spy';

export function toHaveReceivedEventTimes(eventSpy: EventSpy, count: number) {
  if (!eventSpy) {
    return {
      message: () => `toHaveReceivedEventTimes event spy is null`,
      pass: false,
    };
  }

  if (typeof (eventSpy as any).then === 'function') {
    return {
      message: () =>
        `expected spy to have received event, but it was not resolved (did you forget an await operator?).`,
      pass: false,
    };
  }

  if (!eventSpy.eventName) {
    return {
      message: () => `toHaveReceivedEventTimes did not receive an event spy`,
      pass: false,
    };
  }

  const pass = eventSpy.length === count;

  return {
    message: () =>
      `expected event "${eventSpy.eventName}" to have been called ${count} times, but it was called ${eventSpy.events.length} times`,
    pass: pass,
  };
}
