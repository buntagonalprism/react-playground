"use strict"

var Dispatcher = require('../dispatcher/appDispatcher');
var ActionTypes = require('../constants/actionTypes');
var EventEmitter = require('events').EventEmitter; 
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

var _authors = [];

// Start with an empty object. Add in event emitter prototype, then add in the rest of our store logic. 
var AuthorStore = assign({}, EventEmitter.prototype, {
    // Boilerplate functions to allow components to register to listen to data changes
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    }, 
    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    }, 

    // Getter functions to allow components to retrieve data during component initialisation
    getAllAuthors: function() {
        return _authors;
    },
    getAuthorById: function(id) {
        return JSON.parse(JSON.stringify(_.find(_authors,{id: id})));
    }

});

// Every store receives every action - we need to handle the type of action to determine whether we process it
// Private implementation detail - not part of public API
Dispatcher.register(function(action) {
    switch(action.actionType) {
        case ActionTypes.INITIALISE: 
            _authors = action.initialData.authors;
            AuthorStore.emitChange();
            break;
        case ActionTypes.CREATE_AUTHOR:
            _authors.push(action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.UPDATE_AUTHOR: 
            var existingAuthor = _.find(_authors,{id: action.author.id});
            var existingAuthorIdx = _.indexOf(_authors, existingAuthor);
            _authors.splice(existingAuthorIdx, 1, action.author);
            AuthorStore.emitChange();
            break;
        case ActionTypes.DELETE_AUTHOR: 
            _.remove(_authors, function(author) {
                return action.id === author.id;
            });
            AuthorStore.emitChange();
        default:
            // no-op, nothing to do with action types we don't handle
    }
});

module.exports = AuthorStore;