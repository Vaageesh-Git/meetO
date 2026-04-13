type EventCallback = (payload: any) => void | Promise<void>;

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, EventCallback[]> = new Map();

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public subscribe(eventType: string, callback: EventCallback): void {
    const callbacks = this.listeners.get(eventType) || [];
    callbacks.push(callback);
    this.listeners.set(eventType, callbacks);
  }

  public publish(eventType: string, payload: any): void {
    const callbacks = this.listeners.get(eventType) || [];
    // Standardizing on async processing of events implicitly
    callbacks.forEach(callback => {
      try {
        callback(payload);
      } catch (error) {
        console.error(`Error processing event ${eventType}:`, error);
      }
    });
  }
}
