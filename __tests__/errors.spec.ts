import {
    AccessDeniedError,
    ApplicationError,
    BadRequestError,
    EntityNotFoundError,
} from '../';

const errs = {
    AccessDeniedError: AccessDeniedError,
    ApplicationError: ApplicationError,
    BadRequestError: BadRequestError,
    EntityNotFoundError: EntityNotFoundError,
};

describe('errors', () => {
    Object.keys(errs).forEach(err => {
        describe(err, () => {
            describe('instanceof', () => {
                it('should be comparable', () => {
                    expect(new errs[err]()).toBeInstanceOf(Error);
                    expect(new errs[err]()).toBeInstanceOf(errs[err]);
                });
            });
        });
    });
});
