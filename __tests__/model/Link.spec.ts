import { URLValue, Link } from '../..';

const validateLink = link => {
    expect(link.href.equals(new URLValue('http://example.com/some-item/42'))).toEqual(true);
    expect(link.subject.equals(new URLValue('http://example.com/jsonld/some'))).toEqual(true);
    expect(link.rel).toEqual(undefined);
    expect(link.$context.equals(Link.$context)).toEqual(true);
};

describe('Link', () => {
    describe('constructor()', () => {
        it('should accept values', () => {
            const link = new Link(new URLValue('http://example.com/some-item/42'), new URLValue('http://example.com/jsonld/some'));
            validateLink(link);
        });
        it('should accept rel argument', () => {
            const link = new Link(
                new URLValue('http://example.com/some-item/42'),
                new URLValue('http://example.com/jsonld/some'),
                'next'
            );
            expect(link.rel).toEqual('next');
        });
        it('should parse it\'s own values', () => {
            const link = new Link(
                new URLValue('http://example.com/some-item/42'),
                new URLValue('http://example.com/jsonld/some')
            );
            const link2 = new Link(
                link.href,
                link.subject,
                link.rel
            );
            validateLink(link2);
        });
    });

    describe('JSON', () => {
        it('should parse it\'s JSON representation', () => {
            const link = Link.fromJSON(JSON.parse(JSON.stringify(new Link(new URLValue('http://example.com/some-item/42'), new URLValue('http://example.com/jsonld/some')))));
            validateLink(link);
        });
    });

    describe('$context', () => {
        it('should exist', () => {
            expect(Link.$context.toString()).toEqual('https://github.com/nRFCloud/models#Link');
        });
    });
});
