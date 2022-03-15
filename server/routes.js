import { logger } from "./util.js";
import config from "./config.js";
import { Controller } from "./controller.js";

const {
  location,
  pages: {
    homeHTML,
    controllerHTML
  },
  constants: {
    CONTENT_TYPE
  }
} = config;

const controller = new Controller();

const routes = async (request, response) => {

  const { method, url } = request;

  if (method === "GET" && url === "/") {

    response.writeHead(302, {
      "Location": location.home
    })

    return response.end();

  }

  if (method === "GET" && url === "/home") {

    const {
      stream
    } = await controller.getFileStream(homeHTML);

    return stream.pipe(response);

  }

  if (method === "GET" && url === "/controller") {

    const {
      stream
    } = await controller.getFileStream(controllerHTML);

    return stream.pipe(response);

  }

  // files...
  if (method === "GET") {

    const { stream, type } = await controller.getFileStream(url);

    const contentType = CONTENT_TYPE[type];

    if (contentType) {
      
      response.writeHead(200, {
        "Content-Type": contentType
      });

    }

    return stream.pipe(response);

  }

  response.writeHead(404);

  response.end();

}

const handleError = ((error, response) => {

  if (error.message.includes("ENOENT:")) {
    logger.warn(`asset nout found: ${error.stack}`);
    response.writeHead(404);
    return response.end();
  }

  logger.error(`caught error on API ${error.stack}`);
  response.writeHead(500);
  return response.end();

})

export function handler(request, response) {

  return routes(request, response)
    .catch((error) => handleError(error, response));

}
