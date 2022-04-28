import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.home.onCreated(function homeOnCreated() {
  // counter starts at 0
  let ctrl = this;
  this.movies = new ReactiveVar();

  HTTP.call('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=4ec050aec0b57f2c30391a6cb27295ee&language=fr-FR', {}, function (error, response) {

    let leJson = JSON.parse(response.content).results;
    HTTP.call('GET', 'http://localhost:3000/api/find', {}, function (error, response) {
      let likeJSON = JSON.parse(response.content).results;

      for (let lecount = 0; lecount < leJson.length; lecount++) {
        for (let count = 0; count < likeJSON.length; count++) {
          console.log("Res : " + (leJson[count].id));
          if (leJson[lecount].id == likeJSON[count].id) {
            leJson[lecount].like = likeJSON[count].like;
          }
        }
      }
      ctrl.movies.set(leJson);

    });

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
