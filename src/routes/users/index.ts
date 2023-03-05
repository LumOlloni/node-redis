import { FastifyInstance } from 'fastify';
import { UserController } from '../../controllers/UserController';
import { CreateUser, ParamUserId, UpdateUser, UserBody,  UserResponse } from '../../schema';

const userController:UserController = new UserController();

export default function (server:FastifyInstance , opts:any , done: any) {

  server.get('/', (request , replay) => {  
    userController.get(replay);
  })

  server.post<{Body: typeof UserBody }>('/', CreateUser,  async (request , replay) => {
    const {email , age , name , surname} = request.body; 
    const userResponse : UserResponse = await userController.addUser({ email , age , name , surname });
    const statusCode = userResponse.status ? 200 : 400;
    replay.code(statusCode).send(userResponse);
  });

  server.get<{Params: typeof ParamUserId}>('/:id', async(request , replay) => {
    const { id } = request.params;
    const userResponse : UserResponse = await userController.getUser(id);
    const statusCode = userResponse.status ? 200 : 404;
    replay.code(statusCode).send(userResponse);
  });

  server.put<{Body: typeof UserBody , Params: typeof ParamUserId }>('/:id', UpdateUser , async (request , replay) => {
    let id = request.params.id;
    const {email , age , name , surname} = request.body; 
    const userResponse : UserResponse = await userController.updateUser({ email , age , name , surname , id });
    const statusCode = userResponse.status ? 200 : 400;
    replay.code(statusCode).send(userResponse);
  });

  server.delete<{Params: typeof ParamUserId}>('/:id', async (request , replay) => {
    const id = request.params.id;
    const userResponse : UserResponse = await userController.deleteUser(id);
    const statusCode = userResponse.status ? 200 : 404;
    replay.code(statusCode).send(userResponse);
  })

  done();
}