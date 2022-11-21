export interface IRepository 
{
    createAccount(name: string, email: string, password: string): Promise<void>;
    loginAccount(email: string, password: string): Promise<any>;
}
export enum StatusCode {
    OK = 200,
    Created = 201,
    NoContent = 204,
    NotModified = 304,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    Conflict = 409,
    Gone = 410,
    UnprocessableEntity = 422,
    InternalServerError = 500
}