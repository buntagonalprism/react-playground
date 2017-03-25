# react-playground
Testing ground for exercises in the "Building Applications with React and Flux" course from Pluralsight

## Summary
A simple application for managing a set of authors. Functionality includes a home page, a navigation bar, a list of view of authors and a ability to add and edit single author details. Constructed as a single-page application, it uses React-Router for navigation between React components, and Flux for local data storage. Gulp is used to manage node.js packages, transpile React JSX to native javascript, and bundle and minify code. 

## Running
There are two options for running the application. 
1. For a production deployment, deploy the contents of the 'dist' folder to a web server
2. For development and testing deploymnets
	* Install node.js
	* Install dependencies by running `npm install` within the project folder, which will install dependencies listed in the `package.json` file
	* Launch by running `gulp`, which will run the contents of `gulpfile.js` to transpile React JSX, bundle and minify javascript, and launch a simple web server for testing

## Future Work
The application currently persists data to a browser in-memory javascript object store only, rather than writing to a persisted storage location. This means the data resets each time the page is reloaded. Future work would write this data to a server to be persisted. 

