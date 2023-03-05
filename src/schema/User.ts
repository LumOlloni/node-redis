import { Type } from "@sinclair/typebox";
import { RouteShorthandOptions } from "fastify";

const UserBody = Type.Object({
  name: Type.String(),
  surname: Type.String(),
  age: Type.String(),
  email: Type.String(),
});


const ParamUserId = Type.Object({
  id: Type.String(),
})

type UserResponse = {
  status?: boolean,
  user?: object;
  message?: string;
  error?: string;
  code?: number;
}

const CreateUser : RouteShorthandOptions = {
  schema: {
    body: UserBody,
  }
}

const UpdateUser : RouteShorthandOptions = {
  schema: {
    params: {
      type: 'object',
      properties: {
        id: {type: 'string'},
      }
    },
    body: UserBody,
  }
}

export { CreateUser , UserBody  , UpdateUser  }
export type { UserResponse, ParamUserId}
