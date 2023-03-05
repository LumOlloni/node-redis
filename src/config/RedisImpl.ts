import { Redis } from "../interface";
import { createClient } from 'redis';
import { RedisException } from "../exceptions";

class RedisImpl implements Redis {
  private _client: any; 

  constructor() {
    this._client = createClient();
  }
  getClient() {
    return this;
  }
  async connect(): Promise<void> {
    try {
      await this._client.connect(); 
      console.log('connected');
    } catch (error) {
      await this._client.disconnect();
      throw new RedisException(`Redis error connection`);
    }
  }
  async set(key: string, value: string): Promise<void> {
    try {
      await this._client.set(key, value);
      console.log('set..');
      
    } catch (error) {
      throw new RedisException(`Can't set ${key} , ${value}`);
    }
  }
  
  async get(key: string): Promise<any | null>{
    try {
      const value = await this._client.get(key);
      console.log('value', value);
      
      return value ? value : null;
    } catch (error) {
      console.log('error', error);
      
     throw new RedisException(`Can't get ${key}`);
      
    }
  }
  async disconnect(): Promise<void> {
    try {
      await this._client.disconnect();   
    } catch (error) {
      throw new RedisException('Redis error disconnect');
    }
  } 
}

const redisClient : Redis = new RedisImpl();

export { redisClient }