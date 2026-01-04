import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapater = new PrismaBetterSqlite3({
  url: "file:./prisma/eventmaker.db",
});

export const prisma = new PrismaClient({ adapter: adapater });
