import {Status} from '../..';

const validateStatus = status => {
    expect(status.$context.equals(Status.$context)).toEqual(true);
    const {maintenance, version, time} = status;
    expect(maintenance).toEqual(false);
    expect(version).toEqual('1.0.0-beta.1');
    expect(time).toBeInstanceOf(Date);
};

describe('Status', () => {
    describe('constructor()', () => {
        it('should accept values', () => {
            const index = new Status(false, '1.0.0-beta.1');
            validateStatus(index);
        });
    });

    describe('JSON', () => {
        it('should parse it\'s JSON representation', () => {
            const status = Status.fromJSON(JSON.parse(JSON.stringify(new Status(false, '1.0.0-beta.1'))));
            validateStatus(status);
        });
    });

    describe('$context', () => {
        it('should exist', () => {
            expect(Status.$context.toString()).toEqual('https://github.com/nRFCloud/models#Status');
        });
    });
});
