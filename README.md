<h1 align="center">Fycode</h1>

<p align="center">A place to test your programming skills on real problems</p>
<p align="center"><img src="./public/main.png" alt="main-page" /></p>

## Overview

Fycode is a web application that allows users to practice and improve their programming skills by solving problems.

Which are created by users themselvs.

## Pages

Currently we have these pages:

- home
- dashboard
- problem
- create problem
- authentication
- user
  - settings

### Home

The home page is the landing page of the application.

### Dashboard

The dashboard page is the main page of the application.

It displays a list of all the problems that have been created by users.

### Problem

The problem page is the page where users can view and solve problems.

### Create problem

The create problem page is the page where users can create new problems.

### Authentication

The authentication page is the page where users can sign up and log in to the application.

### User

The user page is the page where users can view their profiles.

#### Settings

The user settings page is the page where users can edit their profiles.

## How to run project

make sure you have installed:

- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/)

add necessary enviroment variables

```env
NEXT_PUBLIC_SERVER_URL=""
NEXT_PUBLIC_CLIENT_URL=""

NODE_ENV="development" # change to "production" in production mode
```

then install all dependencies

```bash
pnpm install
```

run project in development mode

```bash
pnpm dev
```

or build

```bash
pnpm build
```
