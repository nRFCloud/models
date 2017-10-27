export class BadRequestError extends Error {
    constructor(...params) {
        super(...params);
        this.name = BadRequestError.name;
        Error.captureStackTrace(this, BadRequestError);
    }
}
