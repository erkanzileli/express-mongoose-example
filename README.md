# express-mongoose-example

## Usage

`POST /records`

Request Body:

```json
{
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
}
```

Response Body:

```json
{
  "code": 0,
  "msg": "Success",
  "records": [
    {
      "key": "TAKwGc6Jr4i8Z487",
      "createdAt": "2017-01-28T01:22:14.398Z",
      "totalCount": 2800
    },
    {
      "key": "NAeQ8eX7e5TEg7oH",
      "createdAt": "2017-01-27T08:19:14.135Z",
      "totalCount": 2900
    }
  ]
}
```

## Validations

You can receive validation errors on some situations. This repository uses Joi for validating fields. You can find more information about error messages on https://hapi.dev/module/joi/api/?v=17.1.1#list-of-errors

Some errors that used on this repo

- number.base: Not a number
- string.pattern.base: Expected pattern doesn't found
- any.required: Specified field is required
