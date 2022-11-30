import fastify from "fastify";
import { WebSocketServer } from "ws";

function handleInput(
  input: { key: string; value: any },
  output: (key: string, value: any) => void
) {
  output("something", "else");
}

export function startHttpServer() {
  const http = fastify();

  http.get("*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    const input = { key: req.routerPath, value: req.query };

    handleInput(input, (key, value) => {
      res.send({ key, value });
    });
  });

  http.listen({ port: 420_0 });
}

export function startWsServer() {
  const ws = new WebSocketServer({ port: 69_69 });

  ws.on("connection", (socket) => {
    socket.on("message", (data) => {
      const input = JSON.parse(data.toString());

      handleInput(input, (key, value) => {
        socket.send(JSON.stringify({ key, value }));
      });
    });
  });
}
