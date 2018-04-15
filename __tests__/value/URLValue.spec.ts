import { URLValue, URLValueType, MaybeURLValueType } from '../..';

// Test data from https://mathiasbynens.be/demo/url-regex

const goodURIs = [
    'https://example.com',
    'https://example.com/dakjh/sadkjh.html',
    'https://svc.d-b.solutions/AB-CDE/V1.23',
    'http://foo.com/blah_blah',
    'http://foo.com/blah_blah/',
    'http://foo.com/blah_blah_(wikipedia)',
    'http://foo.com/blah_blah_(wikipedia)_(again)',
    'http://www.example.com/wpstyle/?p=364',
    'https://www.example.com/foo/?bar=baz&inga=42&quux',
    'http://foo.com/blah_(wikipedia)#cite-1',
    'http://foo.com/blah_(wikipedia)_blah#cite-1',
    'http://foo.com/(something)?after=parens',
    'http://code.google.com/events/#&product=browser',
    'http://j.mp',
    'http://foo.bar/?q=Test%20URL-encoded%20stuff',
    'http://1337.net',
    'http://a.b-c.de',
    'http://223.255.255.254',
    'http://142.42.1.1/',
    'http://142.42.1.1:8080/',
    'http://0.0.0.0',
    'http://10.1.1.0',
    'http://10.1.1.1',
    'https://example.com/foo#fragment?with=escaped%20query!',
    'https://static.wixstatic.com/media/dbd157_7aee6.png/v1/fill/w_216,h_217,al_c,usm_0.66_1.00_0.01/dbd157_7aee6.png',
];

const badURIs = [
    'bogus',
    17,
    // Legal URIs, but not supported
    // Auth
    'http://userid:password@example.com:8080',
    'http://userid:password@example.com:8080/',
    'http://userid@example.com',
    'http://userid@example.com/',
    'http://userid@example.com:8080',
    'http://userid@example.com:8080/',
    'http://userid:password@example.com',
    'http://userid:password@example.com/',
    // Unicode
    'http://➡.ws/䨹',
    'http://⌘.ws',
    'http://⌘.ws/',
    'http://☺.damowmow.com/',
    'http://foo.com/unicode_(✪)_in_parens',
    // IDN
    'http://✪df.ws/123',
    'http://مثال.إختبار',
    'http://例子.测试',
    'http://उदाहरण.परीक्षा',
    "http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com",
    'ftp://foo.bar/baz', // Scheme not supported
    // Illegal URIs
    'http://',
    'http://.',
    'http://..',
    'http://../',
    'http://?',
    'http://??',
    'http://??/',
    'http://#',
    'http://##',
    'http://##/',
    'http://foo.bar?q=Spaces should be encoded',
    '//',
    '//a',
    '///a',
    '///',
    'http:///a',
    'foo.com',
    'rdar://1234',
    'h://test',
    'http:// shouldfail.com',
    ':// should fail',
    'http://foo.bar/foo(bar)baz quux',
    'ftps://foo.bar/',
    'http://-error-.invalid/',
    // FIXME: 'http://a.b--c.de/',
    'http://-a.b.co',
    'http://a.b-.co',
    'http://3628126748',
    'http://.www.foo.bar/',
    'http://www.foo.bar./',
    'http://.www.foo.bar./',
    // Unescaped fragment
    'https://example.com/foo#fragment?with=un-escaped query!',
    'http://foo.com/blah_blah#%',
];

describe('URLValue', () => {
    describe('constructor()', () => {
        it('should parse an URI', () => {
            goodURIs.forEach(uri => {
                let u = new URLValue(uri);
                expect(u.toString()).toEqual(uri);
            });
        });

        it('should parse an instance of URLValue', () => {
            const u = new URLValue(
                new URLValue('https://example.com/').slashless(),
            );
            expect(u.toString()).toEqual('https://example.com');
        });

        it('should not parse invalid URIs', () => {
            badURIs.forEach(uri => {
                expect(() => {
                    new URLValue(uri.toString());
                }).toThrow(TypeError);
            });
        });
        describe('slashless()', () => {
            it('should return a copy with out a slash', () => {
                expect(
                    new URLValue('https://example.com/').slashless().toString(),
                ).toEqual('https://example.com');
                expect(
                    new URLValue('https://example.com').slashless().toString(),
                ).toEqual('https://example.com');
            });
        });
    });

    describe('.equals()', () => {
        it('should return true for the same URLs', () => {
            expect(
                new URLValue('https://example.com').equals(
                    new URLValue('https://example.com'),
                ),
            ).toEqual(true);
        });
        it('should return false for different URLs', () => {
            expect(
                new URLValue('https://example.com').equals(
                    new URLValue('http://example.com'),
                ),
            ).toEqual(false);
        });
    });

    describe('append()', () => {
        it('should return a new URL with the appended string', () => {
            const u = new URLValue('https://example.com');
            const u2 = u.append('/status');
            expect(u2.toString()).toEqual('https://example.com/status');
            expect(u).not.toEqual(u2);
        });
    });

    describe('hostname', () => {
        it('should return the hostname part of the URL', () => {
            expect(
                new URLValue(
                    'http://foo.example.com/somedir/somefile.txt?foo=bar&bar=baz',
                ).hostname,
            ).toEqual('foo.example.com');
        });
    });

    describe('protocol', () => {
        it('should return the protocol part of the URL', () => {
            expect(
                new URLValue(
                    'http://foo.example.com/somedir/somefile.txt?foo=bar&bar=baz',
                ).protocol,
            ).toEqual('http://');
            expect(
                new URLValue(
                    'https://foo.example.com/somedir/somefile.txt?foo=bar&bar=baz',
                ).protocol,
            ).toEqual('https://');
        });
    });

    describe('query', () => {
        it('should return an object for the query parameters', () => {
            expect(
                new URLValue('http://www.example.com/wpstyle/?p=364').query,
            ).toEqual({ p: '364' });
            expect(
                new URLValue(
                    'https://www.example.com/foo/?bar=baz&inga=42&quux',
                ).query,
            ).toEqual({
                bar: 'baz',
                inga: '42',
                quux: '',
            });
        });
        test('that keys and values are url decoded', () => {
            expect(
                new URLValue('http://foo.bar/?encoded%20stuff=Test%20URL')
                    .query,
            ).toEqual({ 'encoded stuff': 'Test URL' });
        });
        test('that it does not parse the fragment part', () => {
            expect(
                new URLValue(
                    'https://example.com/foo#fragment?with=escaped%20query!',
                ).query,
            ).toEqual({});
        });
    });

    describe('path', () => {
        it('should return the path part of the URL', () => {
            expect(
                new URLValue(
                    'http://foo.example.com/somedir/somefile.txt?foo=bar&bar=baz',
                ).path,
            ).toEqual('/somedir/somefile.txt');
            expect(
                new URLValue('http://foo.com/blah_blah_(wikipedia)_(again)')
                    .path,
            ).toEqual('/blah_blah_(wikipedia)_(again)');
        });
        it('should accept an empty path', () => {
            expect(new URLValue('http://foo.example.com').path).toEqual('/');
        });
        it('should not contain hash', () => {
            expect(new URLValue('http://foo.example.com/foo#bar').path).toEqual(
                '/foo',
            );
        });
    });
});

describe('URLValueType', () => {
    it('should accept an URLValue', () => {
        expect(
            URLValueType(new URLValue('http://foo.example.com')),
        ).toBeInstanceOf(URLValue);
    });
    it('should not accept another value', () => {
        expect(() => URLValueType('foo')).toThrow(TypeError);
    });
    it('should not accept an empty value', () => {
        expect(() => URLValueType()).toThrow(TypeError);
    });
});

describe('MaybeURLValueType', () => {
    it('should accept an URLValue', () => {
        expect(
            MaybeURLValueType(new URLValue('http://foo.example.com')),
        ).toBeInstanceOf(URLValue);
    });
    it('should not accept another value', () => {
        expect(() => MaybeURLValueType('foo')).toThrow(TypeError);
    });
    it('should accept an empty value', () => {
        expect(MaybeURLValueType()).toBeUndefined();
    });
});
