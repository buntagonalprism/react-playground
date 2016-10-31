"use strict"

var React = require('react');

var IndexRoute = require('react-router').IndexRoute;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect; 

var routes = (
    <Route path="/" component={require('./components/app')}>
        <IndexRoute component={require('./components/homePage')} />
        <Route path="authors"   component={require('./components/authors/authorPage')} />
        <Route path="authors/:id" component={require('./components/authors/manageAuthorPage')} />
        <Route path="addAuthor" component={require('./components/authors/manageAuthorPage')} />
        <Route path="about"     component={require('./components/about/aboutPage')} />
        <Redirect from="about-us" to="about" />
        <Redirect from="awthurs" to="authors" />
        <Redirect from="about/*" to="about" /> 
        <Route path="*"         component={require('./components/notFoundPage')} />
    </Route>
);

module.exports = routes;  