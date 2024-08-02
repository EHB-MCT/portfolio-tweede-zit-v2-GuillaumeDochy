
# Calendar APP Portfolio
This calendar app is for anyone who wants to contribute to a better planned world.

## API Reference

#### Get all events

```http
  GET http://localhost:4000/api/events
```


#### Get event

```http
  GET http://localhost:4000/api/events/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

#### Update event

```http
  PUT http://localhost:4000/api/events/${id}
```

| Parameter     | Type          | Description                           |
| :------------ | :------------ | :------------------------------------ |
| `id`          | `string`      | **Required**. Id of item to update    |
| `start`       | `date + time` | start date and time of each item      |
| `end`         | `Date + time` | end date and time of each item        |
| `description` | `string`      | description of event                  |
| `title`       | `string`      | name of event                         |
| `priority`    | `string`      | priority of event (low, medium, high) |

#### Delete event

```http
  DELETE http://localhost:4000/api/events/${id}
```

| Parameter | Type     | Description                        |
| :-------- | :------- | :--------------------------------- |
| `id`      | `string` | **Required**. Id of item to delete |

## Authors

- [@GuillaumeDochy](https://github.com/GuillaumeDochy)
## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Feedback

If you have any feedback, please reach out to us at guillaume.dochy@student.ehb.be


## Installation

Install my project with npm and docker. Download the repository and open the front-end and build folders in different windows. Make sure to have docker desktop installed.

### Front-end repository bash
```bash
  npm i
```
### build repository bash
```bash
  docker-compose up --build
```
## License

Copyright (c) 2023 Guillaume Dochy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Run Locally

Clone the project

```bash
  git clone https://github.com/EHB-MCT/portfolio-starter-GuillaumeDochy.git
```

Go to the project directory

```bash
  cd portfolio-starter-GuillaumeDochy
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Support

For support, email guillaume.dochy@student.ehb.be .


## Tech Stack

**Client:** React, React-Big-Calendar

**Server:** Node, Express, Docker


## Features

- Adding events by priority
- Preview events
- Update and deletion of events

