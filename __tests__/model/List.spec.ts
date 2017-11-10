import { LinkedEntitySchema } from '../../dist/generated/LinkedEntitySchema';
import { ListSchema } from '../../dist/generated/ListSchema';
import { LinkedEntity } from '../../src/model/LinkedEntity';
import { URLValue } from '../../src/value/URLValue';
import { List } from '../../src/model/List';
import { Link } from '../../src/model/Link';

class DummyModel extends LinkedEntity {
    static $context = new URLValue('https://github.com/nRFCloud/models#Dummy');
    static $contextVersion = 1;
    readonly name: string;

    constructor(name: string) {
        super(DummyModel.$context, DummyModel.$contextVersion);
        this.name = name;
    }

    toJSON(): DummyModelSchema {
        const {name} = this;
        return {
            ...super.toJSON(),
            ...{name}
        };
    }
}

declare type DummyModelSchema = (LinkedEntitySchema & {
    name: string;
});

const items = [new DummyModel('foo')];

const link = new Link(
    new URLValue('http://example.com/some-item/42'),
    new URLValue('http://example.com/jsonld/some'),
    'next'
);

function validateList(list) {
    expect(list.$context.equals(List.$context)).toEqual(true);
    expect(list.total).toEqual(1);
    expect(list.hasNext).toEqual(true);
    expect(list.hasPrev).toEqual(false);
    expect(list.$links[0]).toEqual(link);
}

describe('List', () => {
    describe('constructor()', () => {
        it('should accept values', () => {
            const list = new List(items, 1, [link]);
            validateList(list);
        });
        it('should parse it\'s own values', () => {
            const list = new List(items, 1, [link]);
            const list2 = new List(
                list.items,
                list.total,
                list.$links,
            );
            validateList(list2);
        });
    });

    describe('JSON', () => {
        it('should parse it\'s JSON representation', () => {
            validateList(List.fromJSON(JSON.parse(JSON.stringify(new List(items, 1, [link]))), s => s));
        });

        describe('should always return empty item and link arrays', () => {
            const jsondata: ListSchema = JSON.parse(JSON.stringify(new List([], 0)));
            test('if empty items given, it should be empty in JSON', () => {
                expect(jsondata.items).toBeInstanceOf(Array);
            });
            test('if empty $links given, it should be empty in JSON', () => {
                expect(jsondata.__links).toBeInstanceOf(Array);
            });
        });
    });

    describe('$context', () => {
        it('should exist', () => {
            expect(List.$context.toString()).toEqual('https://github.com/nRFCloud/models#List');
        });
    });
});
