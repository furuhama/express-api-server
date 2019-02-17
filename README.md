## Express API Server

Simple API server.

## Requirement

- start mysql server on localhost
- create database named `sample_db`

## Usage

Start server

```
$ node app.js
```

Send requests

### languages#index

```
$ curl -X GET 'http://localhost:3000/api/languages'
```

```json
[
  {
    "id": "1",
    "name": "Ruby",
    "type": "Dynamic"
  },
  {
    "id": "2",
    "name": "Rust",
    "type": "Static"
  }
]
```

### languages#show

```
$ curl -X GET 'http://localhost:3000/api/languages/1'
```

```json
{
  "id": "1",
  "name": "Ruby",
  "type": "Dynamic"
}
```
