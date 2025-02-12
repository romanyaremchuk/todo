import "fastify";
import { Pool } from "mysql2/promise";

// extending for mysql support
declare module "fastify" {
  interface FastifyInstance {
    mysql: Pool;
  }
}
