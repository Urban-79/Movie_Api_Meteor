import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.home.onCreated(function homeOnCreated() {
  // counter starts at 0
  let ctrl = this;
  this.movies = new ReactiveVar();
  HTTP.call('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=4ec050aec0b57f2c30391a6cb27295ee&language=fr-FR', {}, function(error, response) {
    ctrl.movies.set(JSON.parse(response.content).results)
  });
});

Template.home.helpers({
  movies() {
    return Template.instance().movies.get();
  },
});

Template.home.events({
  'click button'(event, instance) {
    console.log(event.target.id);
    find('#'+event.target.id).innerHTML++;
    //instance.counter.set(instance.counter.get() + 1);
  },
});
