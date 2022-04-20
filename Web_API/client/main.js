import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.home.onCreated(function homeOnCreated() {
  // counter starts at 0
  let ctrl = this;
  this.movies = new ReactiveVar();
  this.counter = new ReactiveVar(0);
  HTTP.call('GET', 'http://localhost:3000/api/discover/movie', {},
    function(error, response) {
      ctrl.movies.set(JSON.parse(response.content).results)
    });
  });

Template.home.helpers({
  counter() {
    return Template.instance().movies.get();
  },
});
