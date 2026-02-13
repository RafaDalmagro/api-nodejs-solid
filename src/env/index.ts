import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "production", "test"]).default("dev"),
    PORT: z.coerce.number().default(3000),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error(
        "Variáveis de ambiente inválidas",
        z.treeifyError(_env.error),
    );

    throw new Error("Variáveis de ambiente inválidas");
}

export const env = _env.data;