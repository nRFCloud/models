import {Link} from '../../src/model/Link';
import {URLValue} from '../../src/value/URLValue';
import {ApiIndex} from '../../src/model/ApiIndex';

const validateIndex = index => {
    expect(index.$context.equals(ApiIndex.$context)).toEqual(true);
    const link = index.links[0];
    expect(link.href.equals(new URLValue('http://example.com/some-item/42'))).toEqual(true);
    expect(link.subject.equals(new URLValue('http://example.com/jsonld/some'))).toEqual(true);
    expect(link.rel).toEqual(undefined);
    expect(link.$context.equals(Link.$context)).toEqual(true);
};

describe('ApiIndex', () => {
    describe('constructor()', () => {
        it('should accept values', () => {
            const link = new Link(new URLValue('http://example.com/some-item/42'), new URLValue('http://example.com/jsonld/some'));
            const index = new ApiIndex([link]);
            validateIndex(index);
        });
    });

    describe('JSON', () => {
        it('should parse it\'s JSON representation', () => {
            const link = Link.fromJSON(JSON.parse(JSON.stringify(new Link(new URLValue('http://example.com/some-item/42'), new URLValue('http://example.com/jsonld/some')))));
            const index = new ApiIndex([link]);
            validateIndex(index);
        });
    });

    describe('$context', () => {
        it('should exist', () => {
            expect(ApiIndex.$context.toString()).toEqual('https://github.com/nRFCloud/models#ApiIndex');
        });
    });
});
