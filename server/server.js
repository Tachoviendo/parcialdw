import { buildApp } from "../server/app.js";

const app = await buildApp();

try {
    await app.listen({ port: 3000, host: "localhost" });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
