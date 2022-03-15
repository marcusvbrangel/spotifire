import { join, dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const root = join( currentDir, "../");

const audioDirectory = join(root, "audio");
const publicDirectory = join(root, "public");

const songsDirectory = join(audioDirectory, "songs");
const fxDirectory = join(audioDirectory, "fx");

export default {
  port: process.env.PORT || 3000,
  dir: {
    root,
    publicDirectory,
    songsDirectory,
    fxDirectory
  },
  pages: {
    homeHTML: "home/index.html",
    controllerHTML: "controller/index.html"
  },
  location: {
    home: "/home"
  }
}
