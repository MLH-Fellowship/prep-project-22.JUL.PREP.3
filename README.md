# MLH Prep Project

Over the next 2 weeks, you'll be building a React App that works with various APIs (Application Programming Interfaces) that talk to different data sources to do cool stuff.

We're using the [OpenWeather API](https://openweathermap.org/current) to get weather data on different cities. Your challenge over the next 2 weeks is to build out this website and add even more functionality to it. At the moment, it displays basic information about a location when you type it in. Check out [Issues](/issues) for some more ideas!

You'll need to get your own API Key from their website (for free) and add it as an environment variable in a `.env` file. We have a template available as `example.env`.

You'll be using React initially to build this. If you're new to React, check out the [website](https://reactjs.org) for some information on getting started! 

## Installation

You can start the appilcation manually by runing `npm install` to install all the dependencies and then `npm start` to start the development server.

You can also use docker to build docker images that you can run and publish. Use `docker build .` in the root folder. Once the build is complete you will get a unique id, that will act as your docker image ID and then `docker run -p 3000:3000 IMAGE_ID`. This will expose the 3000 port to external Application. 