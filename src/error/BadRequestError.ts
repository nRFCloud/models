export class BadRequestError extends Error {
    constructor(...params: any[]) {
        super(...params);
        this.name = BadRequestError.name;
        Error.captureStackTrace(this, BadRequestError);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }
}
