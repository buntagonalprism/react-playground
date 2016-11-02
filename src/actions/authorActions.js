"use strict"

var Dispatcher = require('../dispatcher/appDispatcher');
var AuthorApi = require('../api/authorApi');
var ActionTypes = require('../constants/actionTypes');

// A list of helper functions to create actions and send them to the dispatcher 
var AuthorActions = {
    // This is an action creator 
    createAuthor: function(author) {
        var newAuthor = AuthorApi.saveAuthor(author);

        // The object inside this function is the actual action
        Dispatcher.dispatch({
            actionType: ActionTypes.CREATE_AUTHOR,
            author: newAuthor
        })
    },

    updateAuthor: function(author) {
        var updatedAuthor = AuthorApi.saveAuthor(author);

        // The object inside this function is the actual action
        Dispatcher.dispatch({
            actionType: ActionTypes.UPDATE_AUTHOR,
            author: updatedAuthor
        })
    },

    deleteAuthor: function(id) {
        AuthorApi.deleteAuthor(id);

        // The object inside this function is the actual action
        Dispatcher.dispatch({
            actionType: ActionTypes.DELETE_AUTHOR,
            id: id
        })
    }

}

module.exports = AuthorActions;