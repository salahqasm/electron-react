import { app, BrowserWindow } from "electron";
import path from "path";
import { getPreloadPath, isDev } from "./util.js";
import { DEV_PORT } from "../config/consts.js";
import { pollResources } from "./resourceManager.js";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    win.loadURL("http://localhost:" + DEV_PORT);
  } else {
    win.loadFile(path.join(app.getAppPath(), "/dist-ui/index.html"));
  }
};

app.whenReady().then(() => {
  createWindow();
  pollResources();
});
