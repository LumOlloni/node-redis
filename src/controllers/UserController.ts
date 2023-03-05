import { FastifyReply } from "fastify";
import { redisClient } from "../config";
import { NotFoundException, RedisException, StatusMessage } from "../exceptions";
import { SafeParse } from "../helpers";
import { Redis } from "../interface";
import { UserResponse } from "../schema";


class UserController {
  private redis: Redis;

  constructor() {
    this.redis = redisClient;
  }
  async getUser(id: number) : Promise<UserResponse> {
    const response : UserResponse = {};
    try {
      const redisUsers = await this.allUsers();
      const allUsers: Array<any> =  SafeParse.jsonParse<Array<any>>(redisUsers);

      const currentUser = allUsers.find((user:any) => user.id === +id);
      if (!currentUser) {
        throw new NotFoundException(`User with this ${id} dosen't exist`);
      }
      response.status = true;
      response.user = currentUser;
    } catch (error:any) {
      response.code = error.code;
      response.status = false;
      response.error = error.message;
    }

    return response;
  }
  async deleteUser(id: number): Promise<UserResponse> {
    const response : UserResponse = {};
  
    try {
      const redisUsers = await this.allUsers();
      const allUsers: Array<any> =  SafeParse.jsonParse<Array<any>>(redisUsers);
      
      const currentUser = allUsers.find((user:any) => user.id === +id);
      
      if (!currentUser) {        
        throw new NotFoundException(`User with this ${id} dosen't exist`);
      }

      const newUsers = allUsers.filter((user:any) => user.id !== +id);
      
      await this.redis.set('users', SafeParse.strigifyParse<any>(newUsers));
      response.status = true;
      response.message = `User with ${id} is deleted `;

    } catch (error:any) {
      response.code = error.code;
      response.status = false;
      response.error = error.message;
    }
    return response;
  }
  async updateUser({ id , name , age , email , surname }: any) : Promise<UserResponse> {
    const response : UserResponse = {
      status: false,
      user: {}
    };

    try {
      const redisUsers = await this.allUsers();
      const allUsers: Array<any> =  SafeParse.jsonParse<Array<any>>(redisUsers);
      const updateUser = allUsers.find((user:any) => user.id === id);
      updateUser.name = name;
      updateUser.age = age;
      updateUser.email = email;
      updateUser.surname = surname;
      response.status = true;
      response.user = updateUser;

    } catch (error) {
      response.error = "Can't update users";
      throw new RedisException("Can't update users");
    }
    return response;
  }

  async addUser({ name , age , surname , email }: any) : Promise<UserResponse> {
    const response : UserResponse = {
      status: false,
      user: {}
    };

    try {
      const redisUsers = await this.allUsers();
      if (!redisUsers) return response;

      const allUsers: Array<any> =  SafeParse.jsonParse<Array<any>>(redisUsers);

      const user = {name , age , surname , email , id: new Date().getTime()};

      allUsers.push(user);

      await this.redis.set('users', SafeParse.strigifyParse<any>(allUsers));
      
      response.status = true;
      response.user = user;
    } 
      catch (error) {
      new RedisException("Can't save users");
      response.error = "Can't save users";
    }
    
    return response;
  }
  async allUsers() : Promise<any> {
    return await this.redis.get('users');
  }

  async get(replay: FastifyReply) {
    try {
      const users = await this.allUsers();
      replay.code(StatusMessage.SUCCESS).send({
        success: true,
        data: JSON.parse(users)
      });
    } catch (error) {
      replay.code(StatusMessage.NOTFOUND).send({
        success: false,
        data: []
      }); 
    }
  }
}

export { UserController };