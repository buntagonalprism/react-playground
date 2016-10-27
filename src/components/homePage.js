"use strict"


var React = require('react');

// React.createClass method is used to declare a react compoment
// 'render' function defines the view layout for this component
// JSX is wrapped in parantheses if there are multiple lines
// class is reserverd in JavaScript so we have to use 'className' in JSX - one of the differences between it and HTML
var Home = React.createClass({
    render: function() {
        return (
            <div className="jumboTron">
                <h1>My first react page</h1>
                <p>React, React router and flux</p>
            </div>
        )
    }
});

// Export this react component 
module.exports = Home;