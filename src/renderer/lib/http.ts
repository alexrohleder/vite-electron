import { HTTP_SERVER_PORT } from "../../main/server/settings";

async function http(path: string, body?: any): Promise<boolean> {
  const response = await fetch(`http://localhost:${HTTP_SERVER_PORT}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : "{}",
  });

  const data = await response.json();

  return data.ok ?? false;
}

export default http;
