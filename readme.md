# Quizz App
## About
Fullstack application that allows to create,
solve and rate quizzes.
### Features
* User Authentication via Bearer Token
* Saving user's stats
* Rating other users quizzes
* Quizz editor
## Tech Stack
* React.js
* React Router
* Typescript
* HTML
* TailwindCSS
* PHP
* MySQL
* Laravel
## Project Setup
1. Install node.js
2. Install php and mysql
3. Clone repo
4. Configure server:
* Install npm and composer dependencies:
```bash
  npm install
  composer install
```
* Create a copy of your .env file:

```bash
    cp .env.example .env
```

* Generate an app encryption key

```bash
    php artisan key:generate
```

* Create an empty database for our application
* In the .env file, add database information to allow Laravel to connect to the database
* Migrate the database

```bash
    php artisan migrate
```

* Run Laravel Project

```bash
    php artisan serve
```
5. Configure client:
* Install dependencies:
```bash
  npm install 
```
* Run local server
```bash
  npm run start
```
