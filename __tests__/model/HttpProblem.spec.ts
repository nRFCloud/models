import {HttpProblem} from '../../src/model/HttpProblem';
import {URLValue} from '../../src/value/URLValue';

function validateProblem(problem: HttpProblem) {
    expect(problem.type.equals(new URLValue('http://example.com'))).toEqual(true);
    expect(problem.title).toEqual('title');
    expect(problem.status).toEqual(123);
    expect(problem.detail).toEqual('detail');
}

describe('HttpProblem', function () {
    describe('constructor()', () => {
        it('should accept problem information', () => {
            const problem = new HttpProblem(new URLValue('http://example.com'), 'title', 123, 'detail');
            validateProblem(problem);
        });
        it('should parse it\'s own values', () => {
            const problem = new HttpProblem(new URLValue('http://example.com'), 'title', 123, 'detail');
            const problem2 = new HttpProblem(
                problem.type,
                problem.title,
                problem.status,
                problem.detail
            );
            validateProblem(problem2);
        });
    });

    describe('$context', () => {
        it('should exist', () => {
            expect(HttpProblem.$context.toString()).toEqual('https://www.ietf.org/id/draft-ietf-appsawg-http-problem-01.txt');
        });
    });

    describe('JSON', () => {
        it('should parse it\'s JSON representation', () => {
            const problem = HttpProblem.fromJSON(JSON.parse(JSON.stringify(new HttpProblem(new URLValue('http://example.com'), 'title', 123, 'detail'))));
            validateProblem(problem);
        });
    });
});
