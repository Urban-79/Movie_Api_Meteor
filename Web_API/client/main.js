import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.home.onCreated(function homeOnCreated() {
  let ctrl = this;
  this.movies = new ReactiveVar();

  //On prend les films avec l'api
  HTTP.call('GET','/api/movies' , {}, function (error, response) {

    //On parse le json dans la variable
    let moviesData = JSON.parse(response.content).results;

    //On prend les like de la base de donnée avec l'api server
    HTTP.call('GET', 'http://localhost:3000/api/findLike', {}, function (error, response) {
      let likeJSON = JSON.parse(response.content).results;
      let count1 = 0;
      //On loop pour le meme id
      for (count1; count1 < moviesData.length; count1++) {
        moviesData[count1].like = 0;
        let count2=0;
        for (count2; count2 < likeJSON.length; count2++) {
          if (moviesData[count1].id == likeJSON[count2].id) {
            //Si meme id on ajoute le like
            moviesData[count1].like = likeJSON[count2].like;
          }
        }
      }
      //On envoie au html
      ctrl.movies.set(moviesData);
      showComment();
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
    let idMovie = event.target.id;
    HTTP.call('PUT', 'http://localhost:3000/api/like/' + idMovie, {}, function (error, response) {
    //recuperation des likes en BDD depuis le template
      let likeBdd = JSON.parse(response.content);
      document.getElementById("span_" + event.target.id).innerHTML = likeBdd.like;
    });
  },
});

Template.addComments.events({
  'click button'(event) {
    //On chope l'input text
    let idMovie = event.target.id;
    let comments = document.getElementById("input_" + idMovie).value;

    //On verifie si il n'est pas vide
    if (comments != "") {

      document.getElementById("Comments_" + idMovie).innerHTML = document.getElementById("Comments_" + idMovie).innerHTML + "<p>" + comments + "</p>";
      HTTP.call('POST', 'http://localhost:3000/api/comments/', { data: { idMovie: idMovie, comment: comments } }, function (error, response) { });
    } else {
      console.log("Vide");
    }
    //On vide l'input
    document.getElementById("input_" + event.target.id).value = "";
  },
});
Template.action.events({
  'click button'(event) {

  }
})
function showComment() {
  HTTP.call('GET', 'http://localhost:3000/api/findComments', {}, function (error, response) {
    let json = JSON.parse(response.content).results;
    for (let acount = 0; acount < json.length; acount++) {
      document.getElementById("Comments_" + json[acount].id).innerHTML = document.getElementById("Comments_" + json[acount].id).innerHTML + "<p>" + json[acount].comment + "</p>";
    }
  });
  
}
