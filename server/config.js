import { join, dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirnamefileURLToPath(import.meta.url);
const root = join( currentDir, "../");

const audioDirectory = join(root, "audio");
const publicDirectory = join(root, "public");

const songsDirectory = join(audioDirectory, "songs");
const fxDirectory = join(audioDirectory, "fx");

export default {
  dir: {
    root,
    publicDirectory,
    songsDirectory,
    fxDirectory
  }
}
