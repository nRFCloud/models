# Models

[![npm](https://img.shields.io/npm/v/@nrfcloud/models.svg)](https://www.npmjs.com/package/@nrfcloud/models)
[![Build Status](https://travis-ci.org/nRFCloud/models.svg?branch=master)](https://travis-ci.org/nRFCloud/models)
[![Greenkeeper badge](https://badges.greenkeeper.io/nRFCloud/models.svg)](https://greenkeeper.io/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

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
    "__context": "https://github.com/nRFCloud/models#ApiIndex",
    "__contextVersion": 1,
    "links": [
        {
            "__context": "https://github.com/nRFCloud/models#Link",
            "__contextVersion": 1,
            "href": "https://foo.iot.us-east-1.amazonaws.com",
            "subject": "https://aws.amazon.com/iot-platform/",
            "rel": "production" 
        },
        {
            "__context": "https://github.com/nRFCloud/models#Link",
            "__contextVersion": 1,
            "href": "https://bar.execute-api.us-east-1.amazonaws.com/prod",
            "subject": "https://nrfcloud.com/",
            "rel": "production" 
        }
    ]
}
```

JSON Schema: [ApiIndex.schema.json](./src/models/ApiIndex.schema.json)  
Source: [ApiIndex.ts](./src/models/Link.ts)

### Link

Describes a link.

```json
{
    "__context": "https://github.com/nRFCloud/models#Link",
    "__contextVersion": 1,
    "href": "https://api.nrfcloud.com/stage/custom-cards/foo/some-id",
    "subject": "https://github.com/nRFCloud/models#CustomCard",
    "rel": "next" 
}
```

JSON Schema: [Link.schema.json](./src/models/Link.schema.json)  
Source: [Link.ts](./src/models/Link.ts)
