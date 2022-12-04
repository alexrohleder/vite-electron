import eventBus from "./events";

export type StateType = {
  timer?: number;
  timerState?: "running" | "paused";
};

const store: StateType = {};

/**
 * This is a simple state store that holds the global state of the server and
 * emits events when the state changes; the events are fan-out to all connected
 * clients, via websockets and other means.
 */
const state = {
  set<K extends keyof StateType>(key: K, value: StateType[K]) {
    const previousValue = store[key];

    store[key] = value;

    if (previousValue !== value) {
      eventBus.emit(key, value);
    }
  },

  get<K extends keyof StateType>(key: K): StateType[K] {
    return store[key];
  },
};

export default state;
