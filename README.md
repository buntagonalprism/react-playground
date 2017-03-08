# react-playground
Testing ground for exercises in the Introduction to React course from Pluralsight

A simple application for managing a set of authors. A single-page application, it uses React-Router for navigation and Flux for local data storage (no data pushback to a data store). 

## Known Issues
The flux implementation used for the data store provides data to UI view components by reference, meaning that changes in the UI are immediately present in the data store whether or not the user hits 'save'. Potentially fixed by using another Flux implementation like 'Alt'
