import fastify from "fastify";
import { WebSocketServer } from "ws";

const app = fastify();

app.get("*", async (_req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send("Hello World");
});

app.listen({ port: 420_0 });

const wss = new WebSocketServer({ port: 69_69 });

wss.on("connection", (ws) => {
  let i = 0;
  setInterval(() => ws.send(String(i++)), 1000);
});
