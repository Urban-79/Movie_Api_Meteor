import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.home.onCreated(function homeOnCreated() {
  // counter starts at 0
  let ctrl = this;
  this.movies = new ReactiveVar();
  HTTP.call('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=4ec050aec0b57f2c30391a6cb27295ee&language=fr-FR', {}, function (error, response) {
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
    document.getElementById("span_" + event.target.id).innerHTML++;
    const idmovie = event.target.id;
    HTTP.call('PUT', 'http://localhost:3000/api/like/' + idmovie, {}, function (error, response) { });
  },
});
