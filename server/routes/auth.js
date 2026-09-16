import { Type } from "@sinclair/typebox";
import { usuariosRepo } from "../repositories/users.js";

import { LoginSchema, PayloadSchema } from "../schemas/usersSchema.js";


const authRoutes = async (fastify, opts) => {
  fastify.post("/login", {
    schema: {
      tags: ["auth"],
      summary: "Login",
      description: "login asdd",
      body: LoginSchema,
      response: {
        200: Type.Object({
          token: Type.String(),
        }),
      },
    },
    handler: async function (request, reply) {
      const { username, password } = request.body;
      const data = await usuariosRepo.verificarCredenciales(username, password);
      return { token: fastify.jwt.sign(data) };
    },
  });


  
    fastify.get("/", {
    schema: {
      tags: ["auth"],
      summary: "Get user",
      description: "Obtener el user guardado en el token",
      response: {
        200: PayloadSchema,
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    onRequest: [fastify.authenticate],
    handler: async function (request, reply) {
      return request.user;
    },
  });


};
export default authRoutes;
//# sourceMappingURL=auth-routes.js.map
