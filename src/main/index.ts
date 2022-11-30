import { app, BrowserWindow } from "electron";
import "./server";

app.whenReady().then(() => {
  const win = new BrowserWindow({ width: 800, height: 600 });

  // when compiled this will be in <repo-root>/dist-electron/index.js
  win.loadFile(__dirname + "/../dist/index.html");
});
