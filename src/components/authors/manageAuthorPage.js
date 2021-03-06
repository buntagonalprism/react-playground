 "use strict"

 var React = require('react');
 var AuthorForm = require('./authorForm');
 var AuthorStore = require('../../stores/authorStore');
 var AuthorActions = require('../../actions/authorActions');
 var browserHistory = require('react-router').browserHistory;
 var toastr = require('toastr');
 var withRouter = require('react-router').withRouter;

 var ManageAuthorPage = withRouter( React.createClass({


     getInitialState : function() {
         return {
             author: { id: '', firstName: '', lastName: ''},
             errors: {},
             dirty: false
         }
     },

    componentWillMount: function() {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        );
        var authorId = this.props.params.id;
        if (authorId) {
            this.setState({author: AuthorStore.getAuthorById(authorId)} ); 
        }
    },
    routerWillLeave: function() {
        if (this.state.dirty)
            return 'You have unsaved information, are you sure you want to leave this page?'
    },

     // Change handler to save user input back to this controller view state. 
     setAuthorState: function(event) {
         var field = event.target.name;     // Get field name
         var value = event.target.value;    // Get field value
         this.state.author[field] = value;
         return this.setState({author: this.state.author, dirty: true});
     },

     // Validation function tests user input
     authorFormIsValid: function() {
         var formIsValid = true;
         this.state.errors = {};  // Clear any current errors 

         if (this.state.author.firstName.length < 3) {
             this.state.errors.firstName = "First name must be at least three characters";
             formIsValid = false;
         }
         if (this.state.author.lastName.length < 3) {
             this.state.errors.lastName = "Last name must be at least three characters";
             formIsValid = false;
         }
         this.setState({errors: this.state.errors}); // Only updates 'errors' part of state, not entire state
         return formIsValid;

     },

     // Handler for the form onSave event (on-click on submit button)
     saveAuthor: function(event) {
         event.preventDefault(); // Stops submit button from actually calling submit and reloading page
         
         if (!this.authorFormIsValid()) {
             return;
         }

         // If we have an ID we are updating an author - call appropriate action
         if (this.state.author.id) {
             AuthorActions.updateAuthor(this.state.author);
         } else {
             AuthorActions.createAuthor(this.state.author);
         }

         // Callback function ensures state has been changed before navigating (state changes are asynchronous)
         // Otherwise 'dirty' flag might not be updated in time and the routerWillLeave hook will see the wrong value for dirty
         this.setState({dirty:false}, function() {
            
            toastr.success('Author saved');
            browserHistory.push('authors');
         });

     },

     render: function() {
         return (
            <AuthorForm 
                author={this.state.author} 
                onChange={this.setAuthorState}
                onSave={this.saveAuthor} 
                errors={this.state.errors} />
         );
     }
 })
 )

 module.exports = ManageAuthorPage;  