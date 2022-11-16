import { Prisma, PrismaClient } from "@prisma/client";

export type Database = PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>;

const database: Database = new PrismaClient();

export { database };
