export class EntityNotFoundError extends Error {
    constructor(...params) {
        super(...params);
        this.name = EntityNotFoundError.name;
        Error.captureStackTrace(this, EntityNotFoundError);
    }
}
