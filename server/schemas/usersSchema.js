import { Type } from "@sinclair/typebox";



export const GrupoSchema = Type.Union([
  Type.Literal("user"),
  Type.Literal("admin"),
  Type.Literal("superadmin"),
]);
export const UsuarioSchema = Type.Object({
  id_usuario: Type.Integer(),
  username: Type.String({ minLength: 3, maxLength: 30 }),
  nombres: Type.String(),
  apellidos: Type.String(),
  fecha_nacimiento: Type.String({ format: "date" }),
  nombre_completo: Type.String(),
  grupos: Type.Array(Type.String(), { minItems: 1 }),
  activo: Type.Boolean(),
});
export const CrearUsuarioSchema = Type.Object({
  username: Type.String({ minLength: 3, maxLength: 30 }),
  nombres: Type.String({ minLength: 1 }),
  apellidos: Type.String({ minLength: 1 }),
  fecha_nacimiento: Type.String({ format: "date" }),
  grupos: Type.Array(GrupoSchema, { minItems: 1 }),
  password: Type.String({ minLength: 6 }),
});
export const ActualizarUsuarioSchema = Type.Partial(
  Type.Object({
    nombres: Type.String({ minLength: 1 }),
    apellidos: Type.String({ minLength: 1 }),
    fecha_nacimiento: Type.String({ format: "date" }),
    grupos: Type.Array(GrupoSchema, { minItems: 1 }),
    activo: Type.Boolean(),
  }),
);
export const LoginSchema = Type.Object(
  {
    username: Type.String(),
    password: Type.String(),
  },
  {
    examples: [
      {
        username: "admin",
        password: "Contraseña1",
      },
      {
        username: "user",
        password: "Contraseña1",
      },
      {
        username: "superadmin",
        password: "Contraseña1",
      },
    ],
  },
);
export const PayloadSchema = Type.Object({
  id_usuario: UsuarioSchema.properties.id_usuario,
  username: UsuarioSchema.properties.username,
  grupos: UsuarioSchema.properties.grupos,
});
//# sourceMappingURL=usuarios-schema.js.map
