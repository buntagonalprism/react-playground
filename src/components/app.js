/*eslint-disable strict*/ // Disabling check because we can't run in strict mode - need global vars for jQuery
$ = jQuery = require('jquery');

var React = require('react');
var Header = require('./common/header');
var RouteHandler = require('react-router').RouteHandler;

var App = React.createClass({
    render: function() {
        console.log("Look its working")
        var Child;

        return (
            <div>
                <Header/>
                <div className="container-fluid">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

module.exports = App;