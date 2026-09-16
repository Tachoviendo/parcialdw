
import { Type } from "@sinclair/typebox";

import {
  UsuarioSchema,
  CrearUsuarioSchema,
  ActualizarUsuarioSchema,
} from "../schemas/usersSchema.js";


import {usuariosRepo} from "../repositories/users.js"


const usuarioRoutes = async (fastify, _opts) => {
  fastify.get("/usuarios", {
    schema: {
      tags: ["usuarios"],
      summary: "Listar todos los usuarios",
      description: "Devuelve la lista completa de usuarios registrados",
      response: {
        200: Type.Array(UsuarioSchema),
      },
    },
    handler: async function (_request, _reply) {
      return await usuariosRepo.obtenerTodos();
    },
  });
  fastify.post("/usuarios", {
    schema: {
      tags: ["usuarios"],
      summary: "Crear un nuevo usuario",
      description:
        "Registra un usuario en la base de datos junto con sus credenciales",
      body: CrearUsuarioSchema,
      response: {
        201: UsuarioSchema,
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    handler: async function (request, reply) {
      reply.status(201);
      return usuariosRepo.crear(request.body);
    },
  });
  fastify.get("/usuarios/:id_usuario", {
    schema: {
      tags: ["usuarios"],
      summary: "Obtener un usuario",
      description: "Devuelve el usuario correspondiente al ID especificado",
      params: Type.Object({
        id_usuario: UsuarioSchema.properties.id_usuario,
      }),
      response: {
        200: UsuarioSchema,
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    handler: async function (request, _reply) {
      return await usuariosRepo.obtenerPorId(request.params.id_usuario);
    },
  });
  fastify.put("/usuarios/:id_usuario", {
    schema: {
      tags: ["usuarios"],
      summary: "Actualizar un usuario",
      description: "Actualiza los datos parciales o totales de un usuario",
      params: Type.Object({
        id_usuario: Type.Integer(),
      }),
      body: ActualizarUsuarioSchema,
      response: {
        200: UsuarioSchema,
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    handler: async function (request, _reply) {
      return usuariosRepo.actualizar(request.params.id_usuario, request.body);
    },
  });
  fastify.delete("/usuarios/:id_usuario", {
    schema: {
      tags: ["usuarios"],
      summary: "Eliminar un usuario",
      description:
        "Elimina de forma permanente un usuario y sus credenciales asociadas",
      params: Type.Object({
        id_usuario: Type.Integer(),
      }),
      response: {
        204: Type.Null(),
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    handler: async function (request, reply) {
      await usuariosRepo.eliminar(request.params.id_usuario);
      reply.status(204);
      return null;
    },
  });
};
export default usuarioRoutes;
//# sourceMappingURL=usuarios-routes.js.map
