export class EntityNotFoundError extends Error {
    constructor(...params) {
        super(...params);
        Error.captureStackTrace(this, EntityNotFoundError);
    }
}
