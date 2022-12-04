import type { EventsType } from "../../main/server/lib/events";
import { WS_SERVER_PORT } from "../../main/server/settings";

const socket = new WebSocket("ws://localhost:" + WS_SERVER_PORT);

export function subscribe<K extends keyof EventsType>(
  key: K,
  listener: (value: EventsType[K]) => void
) {
  function handler(event: MessageEvent<any>) {
    const { event: eventKey, data } = JSON.parse(event.data);

    if (eventKey === key) {
      listener(data);
    }
  }

  socket.addEventListener("message", handler);

  return () => socket.removeEventListener("message", handler);
}

export default socket;
