import { Link, LinkedEntity, URLValue } from '../../';

const l = new Link(new URLValue('https://example.com/api/custom-cards/foo/search?services=foo,bar&includePublic=false&offset=10'), new URLValue('http://example.com/jsonld/some'), 'next');

const validateLinkedEntity = (linkedEntity: LinkedEntity) => {
    expect(linkedEntity.$context.equals(new URLValue('http://example.com/jsonld/some'))).toEqual(true);
    expect(linkedEntity.$contextVersion).toEqual(1);
    expect(linkedEntity.$links).toEqual([l]);
};

class MyEntity extends LinkedEntity {
}

describe('LinkedEntity', () => {
    describe('constructor()', () => {
        it('should accept values', () => {
            const linkedEntity = new MyEntity(
                new URLValue('http://example.com/jsonld/some'),
                1,
                [l]
            );
            validateLinkedEntity(linkedEntity);
        });
        it('should parse it\'s own values', () => {
            const linkedEntity = new MyEntity(
                new URLValue('http://example.com/jsonld/some'),
                1,
                [l]
            );
            const linkedEntity2 = new MyEntity(
                linkedEntity.$context,
                linkedEntity.$contextVersion,
                linkedEntity.$links,
            );
            validateLinkedEntity(linkedEntity2);
        });
    });
});
