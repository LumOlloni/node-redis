
import fastify from "fastify";
import AutoLoad from '@fastify/autoload'
import { join } from 'path'
import * as dotenv from 'dotenv';
import {redisClient} from './config';
dotenv.config()

redisClient.connect();


const server = fastify({
  logger: true,
});


server.register(AutoLoad, {
  dir: join(__dirname, 'routes'),
  options: { prefix: '/api' }
})

export default server;