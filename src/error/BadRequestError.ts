export class BadRequestError extends Error {
    constructor(...params) {
        super(...params);
        Error.captureStackTrace(this, BadRequestError);
    }
}
