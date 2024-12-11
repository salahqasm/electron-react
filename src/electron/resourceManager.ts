import OsUtils from "os-utils";
import { POLLING_INTERVAL } from "../config/consts.js";
import os from "os";
import fs from "fs";
export function pollResources() {
  setInterval(async () => {
    console.log(await getCpuUsage());
    console.log(getRamUsage());
    console.log(getStorage());
  }, POLLING_INTERVAL);
}
export function getStaticData() {
    const totalStorage = getStorage().total;
    const cpuName = os.cpus()[0].model;
    const cpuSpeed = os.cpus()[0].speed;
    const totalMemory = Math.round(OsUtils.totalmem());
  
    return {
      totalStorage,
      cpuName,
      cpuSpeed,
      totalMemory,
    };
  }
  
function getRamUsage() {
  const freeMemory = OsUtils.freememPercentage();
  return 1 - freeMemory;
}

async function getCpuUsage() {
  return new Promise((resolve) => OsUtils.cpuUsage(resolve));
}

function getStorage() {
  const stats = fs.statfsSync(process.platform == "win32" ? "C://" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bsize * stats.bfree;
  return {
    total: Math.round(total / 1_000_000_000),
    usage: 1 - free / total,
    free: free / 1_000_000_000,
  };
}

