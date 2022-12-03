import EventEmitter from "events";

export const events = [
  "clock-tick",
  "clock-tick-10",
  "clock-tick-100",
  "clock-tick-1000",
  "log-info",
  "log-warning",
  "log-error",
];

export const eventBus = new EventEmitter();
