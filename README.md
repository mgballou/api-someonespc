# Someone's PC - Express Back End


## Project Description

> Someone's PC is a team-building tool for competitive Pokemon players. The application provides a reference and resource that streamlines planning teams & strategies outside of in-game play. The end user has the ability to create instances of Pokemon, organize them into game-legal teams, and adjust the stats, abilities*, and held items* of each Pokemon. 

> This project is a full stack MERN application. The Vite + React front end code can be found [here](https://github.com/mgballou/react-someonespc).

> I personally rebuilt & expanded this project from the original. The original Someone's PC was a group project developed with Anthony Blalock & Ciaran Kearney. Special thanks to them for all of their collaboration and contributions! The original Someone's PC can be found [here](https://github.com/mgballou/someones-pc).


## Table of Contents

- [Project Description](#project-description)
- [Usage](#usage)
- [Installation](#installation)
- [Features](#features)
- [Technologies](#technologies)


## Usage

> Live demo is available at https://someones-pc.netlify.app/
>
> Create an account and log in, or use our guest account to explore features.
> 
> All the Pokémon you Create can be found in your Box. From there, click on a sprite to adjust that Pokémon’s stats. Once you’ve got a squad ready, Create a new Team and drop in who you’d like to carry in your party. Keep making changes, and make new Teams to plan out different strategies and combinations. Save your plans and refer back between in-game sessions.


## Installation

> After cloning this repo and the [front end repo](https://github.com/mgballou/react-someonespc) to your local machine, you'll need to install dependencies with `npm i`. You'll need to set up the following in a .env file to cconfigure the environment.


```
MONGODB_URI=<your_mongoDB_uri>

PORT=<your_port>

JWT_SECRET=<your_JWT_secret>

```

> Then, run the server with `npm run dev`. The front end repo will need to be running as well, and instructions can be found in that README.

## Features

### Current

> * Create accounts and log in (JWT auth)
> * Create any Pokemon up to #1008 and add it to your box
> * Adjust the stats of each Pokemon
> * Create Teams, and drag-and-drop your Pokemon into them
> * View the details of your created Pokemon and Teams
> * Random chance to receive a shiny Pokemon sprite upon creation

### Future
> * Adjust the abilities and held items of each Pokemon
> * Error display for misspelled Pokemon names
> * Animated sprites where available

## Technologies

> * JavaScript
> * ExpressJS
> * Passport
> * Bcrypt
> * Mongoose / MongoDB
> * [PokeAPI](https://pokeapi.co/)
