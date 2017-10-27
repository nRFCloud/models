export class AccessDeniedError extends Error {
    constructor(...params) {
        super(...params);
        this.name = AccessDeniedError.name;
        Error.captureStackTrace(this, AccessDeniedError);
    }
}
