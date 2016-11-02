"use strict"

var React = require('react');
var Link = require('react-router').Link;
var AuthorStore = require('../../stores/authorStore');
var AuthorList = require('./authorList.js');
var AuthorActions = require('../../actions/authorActions');

var AuthorPage = React.createClass({

    getInitialState: function() {
        return {
            authors: AuthorStore.getAllAuthors()
        }
    },

    // Set state once component is mounted
    // componentDidMount: function() {
    //     if (this.isMounted()) {
    //         this.setState({ authors: AuthorStore.getAllAuthors() });
    //     }
    // },

    // Hook into store change events 
    componentWillMount: function() {
        AuthorStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        AuthorStore.removeChangeListener(this._onChange);
    },
    // When author data changes, get data set again 
    _onChange: function() {
        this.setState({authors: AuthorStore.getAllAuthors() });
    },

    render:function() {
        return (
            <div>
                <h1>Author Page</h1>
                <Link to="addAuthor" className="btn btn-default">Add Author</Link>
                <AuthorList authors={this.state.authors} />
            </div>
        );
    }
});

module.exports = AuthorPage;