import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.home.onCreated(function homeOnCreated() {
  let ctrl = this;
  this.movies = new ReactiveVar();

  //On prend les films avec l'api
  HTTP.call('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=4ec050aec0b57f2c30391a6cb27295ee&language=fr-FR', {}, function (error, response) {
    //On parse le json dans la variable
    let leJson = JSON.parse(response.content).results;
    //On prend les like de la base de donnée avec l'api server
    HTTP.call('GET', 'http://localhost:3000/api/find', {}, function (error, response) {
      let likeJSON = JSON.parse(response.content).results;
      //On loop pour le meme id
      for (let lecount = 0; lecount < leJson.length; lecount++) {
        leJson[lecount].like = 0;
        for (let count = 0; count < likeJSON.length; count++) {
          if (leJson[lecount].id == likeJSON[count].id) {
            //Si meme id on ajoute le like
            leJson[lecount].like = likeJSON[count].like;
          }
        }
      }
      //On envoie au html
      ctrl.movies.set(leJson);
    });
  });
});

Template.home.helpers({
  movies() {
    return Template.instance().movies.get();
  },
});

Template.like.events({
  'click button'(event, instance) {
    document.getElementById("span_" + event.target.id).innerHTML++;
    let idmovie = event.target.id;
    HTTP.call('PUT', 'http://localhost:3000/api/like/' + idmovie, {}, function (error, response) { });
  },
});

Template.addComments.events({
  'click button'(event) {
    //On chope l'input text
    comments = document.getElementById("input_" + event.target.id).value;

    //On verifie si il n'est pas vide
    if (comments != "") {
      let idmovie = event.target.id;
      HTTP.call('POST', 'http://localhost:3000/api/comments/', { data: { idMovie: idmovie, comment: comments } }, function (error, response) { });
    } else {
      console.log("Vide");
    }
    //On vide l'input
    document.getElementById("input_" + event.target.id).value = "";
  },
});
