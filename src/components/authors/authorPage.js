"use strict"

var React = require('react');
var Link = require('react-router').Link;
var AuthorApi = require('../../api/authorApi');
var AuthorList = require('./authorList.js');

var AuthorPage = React.createClass({

    getInitialState: function() {
        return {
            authors: []
        }
    },

    // Set state once component is mounted
    componentDidMount: function() {
        if (this.isMounted()) {
            this.setState({ authors: AuthorApi.getAllAuthors() });
        }
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