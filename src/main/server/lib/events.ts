import EventEmitter from "events";
import type { StateType } from "./state";

export type EventsType = StateType;

const emitter = new EventEmitter();

const eventBus = {
  on<K extends keyof EventsType>(
    key: K,
    listener: (value: EventsType[K]) => void
  ) {
    emitter.on(key, listener);

    return () => emitter.off(key, listener);
  },
  emit<K extends keyof EventsType>(key: K, value: EventsType[K]) {
    emitter.emit(key, value);
  },
};

export default eventBus;
