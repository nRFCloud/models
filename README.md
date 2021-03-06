# Models

[![npm latest version](https://img.shields.io/npm/v/@nrfcloud/models/latest.svg)](https://www.npmjs.com/package/@nrfcloud/models)
[![npm next version](https://img.shields.io/npm/v/@nrfcloud/models/next.svg)](https://www.npmjs.com/package/@nrfcloud/models)
[![Build Status](https://travis-ci.org/nRFCloud/models.svg?branch=master)](https://travis-ci.org/nRFCloud/models)
[![Test Coverage](https://api.codeclimate.com/v1/badges/77460b33109bf68022e7/test_coverage)](https://codeclimate.com/github/nRFCloud/models/test_coverage)  
[![Greenkeeper badge](https://badges.greenkeeper.io/nRFCloud/models.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)  
[![DeepScan Grade](https://deepscan.io/api/projects/834/branches/1773/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=834&bid=1773)
[![Known Vulnerabilities](https://snyk.io/test/github/nrfcloud/models/badge.svg)](https://snyk.io/test/github/nrfcloud/models)
[![Maintainability](https://api.codeclimate.com/v1/badges/77460b33109bf68022e7/maintainability)](https://codeclimate.com/github/nRFCloud/models/maintainability)

Contains model definitions for the REST API.

## Testing

**Install dependencies**

    npm i

**Run the tests**

    npm test
    
## JSON-LD Entity Definitions

All entities require a 'context' which explicitly types their JSON 
representation. The version is used to express schema changes per entity.
This is inspired by [JSON-LD](https://json-ld.org/primer/latest/).

### ApiIndex

Describes entry points of an API.

```json
{
    "$context": "https://github.com/nRFCloud/models#ApiIndex",
    "$contextVersion": 1,
    "links": [
        {
            "$context": "https://github.com/nRFCloud/models#Link",
            "$contextVersion": 1,
            "href": "https://foo.iot.us-east-1.amazonaws.com",
            "subject": "https://aws.amazon.com/iot-platform/",
            "rel": "production" 
        },
        {
            "$context": "https://github.com/nRFCloud/models#Link",
            "$contextVersion": 1,
            "href": "https://bar.execute-api.us-east-1.amazonaws.com/prod",
            "subject": "https://nrfcloud.com/",
            "rel": "production" 
        }
    ]
}
```

JSON Schema: [ApiIndex.json](./src/model/schema/ApiIndex.json)  
Source: [ApiIndex.ts](./src/model/Link.ts)

### Link

Describes a link.

```json
{
    "$context": "https://github.com/nRFCloud/models#Link",
    "$contextVersion": 1,
    "href": "https://api.nrfcloud.com/stage/custom-cards/foo/some-id",
    "subject": "https://github.com/nRFCloud/models#CustomCard",
    "rel": "next" 
}
```

JSON Schema: [Link.json](./src/model/schema/Link.json)  
Source: [Link.ts](./src/model/Link.ts)

### Status

Describes the status of the system.

```json
{
    "$context": "https://github.com/nRFCloud/models#Status",
    "$contextVersion": 1,
    "maintenance": false,
    "version": "1.0.0-beta.1",
    "time: "2017-10-02T11:05:46.793Z"
}
```

JSON Schema: [Status.json](./src/model/schema/Status.json)  
Source: [Status.ts](./src/model/Status.ts)

### List

Describes a list.

```json
{
    "$context": "https://github.com/NordicPlayground/nrfcloud-custom-cards-client#List",
    "$contextVersion": 1,
    items: [
        {
            "$context": "...",
            "$contextVersion": ...,
            ...
        }
    ],
    total: 1,
    links: [
        {
            "$context": "https://github.com/NordicPlayground/nrfcloud-custom-cards-client#Link",
            "$contextVersion": 1,
            "href": "...",
            "subject": "...",
            "rel": "next" 
        }
    ]
}
```

JSON Schema: [Link.json](./src/List.json)  
Source: [Link.ts](./src/List.ts)

### Errors

#### HttpProblem

All error responses are expressed using this message format. See <https://datatracker.ietf.org/doc/draft-ietf-appsawg-http-problem/>.

```json
{
	"$context" : "https://www.ietf.org/id/draft-ietf-appsawg-http-problem-01.txt",
	"$contextVersion" : 1,
	"type" : "https://github.com/nRFCloud/models#EntityNotFoundError",
	"title" : "Entity not found",
	"status" : 404,
	"detail" : "EntityNotFoundError: Custom card \"foo\" does not exist!"
}
```

JSON Schema: [HttpProblem.json](./src/HttpProblem.json)  
Source: [HttpProblem.ts](./src/HttpProblem.ts)

#### AccessDeniedError

Thrown if the access to a resource was denied.

#### BadRequestError

Thrown if the request was malformed.

#### EntityNotFoundError

Thrown if a requested resource could not be found.

#### InternalError

Thrown if an unexpected internal error happened.
