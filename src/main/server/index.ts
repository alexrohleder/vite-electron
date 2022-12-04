import fastify from "fastify";
import cors from "@fastify/cors";
import { WebSocketServer } from "ws";
import { HTTP_SERVER_PORT, WS_SERVER_PORT } from "./settings";
import eventBus, { EventsType } from "./lib/events";
import services from "./services";

export function startHttpServer() {
  const http = fastify();

  http.register(cors);

  // expose service methods as http routes
  const register = (path: string, schedule: (payload: any) => Promise<void>) =>
    http.post(path, async (req, res) =>
      schedule(req.body)
        .then(() => res.send({ ok: true }))
        .catch((err) => res.send({ ok: false, err: err.message }))
    );

  register("/pause", () => services.timer.pause());
  register("/resume", () => services.timer.resume());

  http.listen({ port: HTTP_SERVER_PORT });
}

export function startWsServer() {
  const ws = new WebSocketServer({ port: WS_SERVER_PORT });

  const register = (event: keyof EventsType) =>
    eventBus.on(event, (data) =>
      ws.clients.forEach((client) =>
        client.send(JSON.stringify({ event, data }))
      )
    );

  // subscribe to all events of the event bus and fan out to all socket clients
  register("timer");
  register("timerState");

  // todo: push the current state on connection
}
