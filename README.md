# Full-Stack ProShop eCommerce Platform

I created this app using [Brad Traversy](https://github.com/bradtraversy) and [Bassir Jafarzadeh's](https://github.com/basir)  [MERN eCommerce From Scratch](https://www.udemy.com/course/mern-ecommerce) course. I used **[TypeScript](https://www.typescriptlang.org/)** instead of JavaScript and all components are written using functional components.

> I didn't write **DRY** code, so lots of interfaces, types, reducers and action creators are (kind of) duplicated. I left them there to show the pattern of creating types.
---
> ⚠ Don't use this app as an actual website. Frontend and backend have lots of security flaws.
---
> ⚠ PayPal is not available in my country. So in `OrderScreen`, I changed the code to always pass the payment.

## Technology used

### Frontend

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://reactjs.org/)
- [React Router](https://reacttraining.com/react-router/)
- [react-bootstrap](https://react-bootstrap.github.io/)
- [Redux](https://redux.js.org/)
- [redux-thunk](https://www.npmjs.com/package/redux-thunk)

### Backend

- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [mongoose](https://mongoosejs.com/)

## Quick Start

Download the zip file or Clone this repo, using:

```bash
git clone https://github.com/Mustafa-Hayati/ProShop.git
```

Install the dependencies:

```bash
npm install
```

> ⚠ If you get errors in the client side (react app), then go to the frontend directory and run `npm install`.

### Env Variables

Create a .env file in then root and add the following

```javascript
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = "abc123"
PAYPAL_CLIENT_ID = your paypal client id
```

## Run App

```bash
# to run server in dev mode
npm run server

# to run server in prod mode
npm start

# to run client only
npm run client

# to build the client
npm run build

# to run both frontend and backend in dev mode
npm run dev
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```bash
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```
