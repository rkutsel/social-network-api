### MIT License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A boilerplate for a social network API. It provides basic [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) functionality to manage `Users`, `Thoughts`, `Reactions`. I used MongoDB as a backend datastore and [Mongoose](https://mongoosejs.com/) for ODM. The structure of the codebase loosely follows [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller#:~:text=Model%E2%80%93view%E2%80%93controller%20and%20accepted%20from%20the%20user.) design pattern.

## Installation Instructions

> NOTE: Make sure you have `Node.JS ~v16.14.2` and `NPM ~8.11.0` installed. You can quickly check this by running `node -v` for Node.JS and `npm -v` for NPM in your terminal.

### Install local dependencies

Once the above is confirmed, go ahead and clone the repo `git clone git@github.com:rkutsel/social-network-api.git` and install local dependencies by running `npm install` in your terminal. A successful installation should look somewhat similar to the one bellow:

```bash
added 202 packages, and audited 203 packages in 1s

27 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

## Usage

To start the API server, form the `root` directory run `node index` or `npm start` which should fire up all of the components. Optionally you can run `npm run dev` for better dev experience. At this point you should be able to consume the API. You can use any API client. For the purpose of this example, I used [Insomnia Client](https://insomnia.rest/pricing) that has a free version.
