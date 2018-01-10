export class AccessDeniedError extends Error {
    constructor(...params: any[]) {
        super(...params);
        this.name = AccessDeniedError.name;
        Error.captureStackTrace(this, AccessDeniedError);
        Object.setPrototypeOf(this, AccessDeniedError.prototype);
    }
}
