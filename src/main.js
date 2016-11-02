"use strict"
var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var browserHistory = require('react-router').browserHistory;
var Route = require('react-router').Route;
var routes = require('./routes');

var InitialiseActions = require('./actions/InitialiseActions');

InitialiseActions.initApp();

// Use the router to determine what to attach to our app element based upon what is in scope
ReactDOM.render(<Router history={browserHistory} routes={routes}/>, document.getElementById('app') );


/**
// Bootstrap requires jquery to be in the global namespace
$ = jQuery = require('jquery'); // Allows us to use the dollar sign or the word jquery to reference jquery
var React = require('react');
var ReactDOM = require('react-dom');


// Import our components 
var Home = require('./components/homePage');
var Authors = require('./components/authors/authorPage');
var About = require('./components/about/aboutPage');
var Header = require('./components/common/header');



// Container class which does simple routing 
var App = React.createClass({
    render: function() {
        // Stores which child view we are rendering
        var Child; 
        // Get the route from the component properties - must be defined externally
        switch(this.props.route) {
            case 'about': Child = About; break;
            case 'authors' : Child = Authors; break;
            default: Child = Home;
        }
        return (
            <div>
                <Header />
                <Child />
            </div>
        )
    }
});

// Define a function which will select components to display on the page
function render() {
    // Get a piece of the URL as the route (after the hash character)
    var route = window.location.hash.substr(1); 
    
    // Embed the component into the DOM at an existing element - here a div with id="app" in our main html file
    // The ease of composability comes from how we can combine components using JSX - it doesn't have to be just <App/> 
    // we could add others in as well 
    // Note also how we pass in a property for use by the component
    ReactDOM.render(<App route={route} />, document.getElementById('app'));
}

// Add a listener to swap components and re-render when our hash path changes
window.addEventListener('hashchange', render);

// Call 'render' first time to do initial page-load setup
render();

*/
