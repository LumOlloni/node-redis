import { ServerException } from "../exceptions";

class SafeParse {
  static jsonParse<T>(data: string) : T {
    let json = null;
    try {
      json = JSON.parse(data);
    } catch (error) {
      new ServerException('Data is not parsed');
    }
    return json;
  }
  static strigifyParse<T>(data: object | Array<T>) : string {
    let stringParsed = '';
    try {
      stringParsed = JSON.stringify(data);
    } catch (error) {
      new ServerException('Data is not  strigifyed');
    }
    return stringParsed;
  }
}

export { SafeParse }