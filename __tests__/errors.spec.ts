import {
    AccessDeniedError,
    ApplicationError,
    BadRequestError,
    EntityNotFoundError,
} from '../';

const errs: { [key: string]: { new (): any } } = {
    AccessDeniedError,
    ApplicationError,
    BadRequestError,
    EntityNotFoundError,
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
