import fastify from "fastify";
import { WebSocketServer } from "ws";
import { HTTP_SERVER_PORT, WS_SERVER_PORT } from "./lib/constants";
import { eventBus, events } from "./lib/events";

/**
 * The HTTP Server receives synchronous requests from the client, processes them
 * using one service, and returns a response. The service may call other services
 * and/or the event bus to perform asynchronous tasks.
 */
export function startHttpServer() {
  const http = fastify();

  http.get("*", (_req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("ok");
  });

  http.listen({ port: HTTP_SERVER_PORT });
}

/**
 * The WebSocket Server receives asynchronous requests from the event bus, and
 * sends them to the client. The client may send requests back to the server
 * using the HTTP Server.
 */
export function startWsServer() {
  const ws = new WebSocketServer({ port: WS_SERVER_PORT });

  // subscribe to all events of the event bus and fan out to all socket clients
  events.forEach((event) => {
    eventBus.on(event, (data) => {
      ws.clients.forEach((client) => {
        client.send(JSON.stringify({ event, data }));
      });
    });
  });
}

// todo: TCP server on same schematics of the WS server
