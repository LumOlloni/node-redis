import { FastifyInstance } from 'fastify';
import { FastifyRequestType } from 'fastify/types/type-provider';


export default function (server:FastifyInstance , opts:any , done: any) {
  
  server.get('/', (request:FastifyRequestType , replay) => {  
    replay.code(200).send({nane: 'hello'});
  })
  done();
}