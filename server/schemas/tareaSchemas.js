import { Type } from "@sinclair/typebox"

export const tareaSchema = Type.Object({
    id_tarea: Type.Integer(),
    id_creador: Type.Integer(),
    grupo: Type.Union([
        Type.Literal("user"),
        Type.Literal("admin"),
        Type.Literal("superadmin")
    ]),
    titulo: Type.String({
        maxLength:100
    }),
    descripcion: Type.Union([Type.String(), Type.Null()]),
    prioridad: Type.Union([
        Type.Literal("0:baja"),
        Type.Literal("1:media"),
        Type.Literal("2:alta")
    ]),
    creada: Type.String({ 
        format: "date-time"
    }),
    terminada: Type.Union([
        Type.String({ format: "date-time" }),
        Type.Null()
    ]),
    estado: Type.String()
})

export const tareaShcemaPost = Type.Composite([
    Type.Omit(tareaSchema, ["id_tarea", "id_creador", "creada", "terminada", "estado", "descripcion", "prioridad"]),
    Type.Partial(Type.Pick(tareaSchema, ["descripcion", "prioridad"]))
])


