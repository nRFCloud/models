export class AccessDeniedError extends Error {
    constructor(...params) {
        super(...params);
        Error.captureStackTrace(this, AccessDeniedError);
    }
}
