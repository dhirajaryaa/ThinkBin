import { defineConfig, env } from "prisma/config";
import { configDotenv } from 'dotenv';

configDotenv({
  path: "./.env.local"
});

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("TB_DATABASE_URL"),
  },
});
