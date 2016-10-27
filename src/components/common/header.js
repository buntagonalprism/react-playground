// to be put under 'common' folder inside 'components' folder
// Requires an image under 'images' folder inside 'src'

"use strict"

var React = require('react');
var Link = require('react-router').Link;

var Header = React.createClass({
    render: function() {
        return (  
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand">
                        <img src="images/prism.png" style={{width:'48px',height:'48px'}}/>
                    </a>
                    <ul className="nav navbar-nav">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="about">About</Link></li>
                        <li><Link to="authors">Authors</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
});

module.exports = Header;