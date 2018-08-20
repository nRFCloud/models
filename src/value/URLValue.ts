const t = require('tcomb');

const uriRegex = /^https?:\/\/(((?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9])|((?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)))(:(6553[0-5]|655[0-2]\d|65[0-4]\d\d|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3}|0))?(\/[-a-zA-Z0-9@:%_+.,~?&/=()]*)*(#(?:[^#^[\]{}\\"<>%\s]|%[0-9a-f]{2})*)*$/i;
const URLValueString = t.refinement(
    t.String,
    (s: string) => uriRegex.test(s),
    'URLValueString',
);

/**
 * A second level URI
 */
export class URLValue {
    readonly uri: string;
    readonly hostname: string;
    readonly protocol: string;
    readonly path: string;
    readonly query: { [name: string]: string };

    static fromString = (str: string, path?: Array<string>): URLValue =>
        new URLValue(URLValueString(str, path));

    /**
     * @throws TypeError if the provided URI fromString invalid
     */
    constructor(url: string | URLValue) {
        if (URLValue.is(url)) {
            url = url.toString();
        }
        if (!uriRegex.test(<string>url)) {
            throw new TypeError(`URLValue: Not an URI: "${url}!`);
        }
        this.uri = <string>url;
        this.protocol = (this.uri.match(/^(https?:\/\/)/) || [])[1];
        this.hostname = (this.uri.match(/^https?:\/\/([^\/]+)/) || [])[1];
        this.query = /^[^#]+\?/.test(this.uri)
            ? this.uri
                  .split('?', 2)[1]
                  .split('&')
                  .reduce((query, param) => {
                      const [k, v] = param.split('=', 2);
                      return {
                          ...query,
                          [decodeURIComponent(k)]: v
                              ? decodeURIComponent(v)
                              : '',
                      };
                  }, {})
            : {};
        this.path = ((
            this.uri.replace(/^https?:\/\/([^\/]+)/, '') || '/'
        ).match(/^([^?#]+)/) || [])[1];
    }

    /**
     * @returns {String}
     */
    toString(): string {
        return this.uri;
    }

    /**
     * @param {URLValue} uri
     * @returns {boolean}
     */
    equals(uri: URLValue): boolean {
        return this.uri === uri.toString();
    }

    /**
     * Returns a copy of the instance that has no trailing slash
     * @returns {URLValue}
     */
    slashless(): URLValue {
        return new URLValue(this.uri.replace(/\/+$/, ''));
    }

    /**
     * Returns a copy of the instance with the given string appended
     * @returns {URLValue}
     */
    append(str: string): URLValue {
        return new URLValue(`${this}${str}`);
    }

    static is(x?: any): boolean {
        return (
            x &&
            x.constructor &&
            x.constructor.name === URLValue.name &&
            'uri' in x &&
            typeof x.uri === 'string' &&
            'hostname' in x &&
            typeof x.hostname === 'string' &&
            'protocol' in x &&
            typeof x.protocol === 'string' &&
            'path' in x &&
            typeof x.path === 'string' &&
            'query' in x &&
            typeof x.query === 'object'
        );
    }
}

export const URLValueType = t.irreducible('URLValueType', URLValue.is);
export const MaybeURLValueType = t.maybe(URLValueType);
