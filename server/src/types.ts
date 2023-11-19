import { EntityManager } from "@mikro-orm/postgresql";
import { Request, Response } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";

export type MyContext = {
  em: EntityManager;
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
  redis: Redis;
};
