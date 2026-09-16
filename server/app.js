import * as path from "node:path";
import AutoLoad from "@fastify/autoload";
import {} from "fastify";
import Fastify from "fastify";

import { fileURLToPath } from "node:url";
import { transformarErrorPostgres } from "../server/errors/errores.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {};



export async function buildApp(fastifyy, opts) {

    const fastify = Fastify({
        logger: {
            transport: { target: "pino-pretty" }
        }
    });

  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: opts,
    forceESM: true,
  });
  void fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: opts,
    forceESM: true,
  });
  fastify.setErrorHandler((error, request, reply) => {
    fastify.log.info({ error });
    if (error.schema === "public") {
      error = transformarErrorPostgres(error);
    }
    throw error;
  });

    return fastify
};

//# sourceMappingURL=app.js.map
