import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';

//Connexion a la db
const film =  new Mongo.Collection("film");

Meteor.startup(() => {
  // code to run on server at startup
  console.log("HELLO FROM SERVER");
});

//Ajoute un like
WebApp.connectHandlers.use('/api/like', (req, res, next) => {
  const idMovie = req.url.slice(1);
  updateLikeMovie(idMovie);
  res.end;
});

//Renvoie les likes
WebApp.connectHandlers.use('/api/find', (req, res, next) => {
  console.log("api/find" ); 
  let moviedata=findMovie();
  res.end(moviedata);
});

function updateLikeMovie(idMovie) {

  //On prend le row du film
  let dbRessource = film.findOne({ id: idMovie });


  //Si il existe
  if (dbRessource) {
      //On prend l'id du row et on increase son like de 1
      film.update(
          { _id: dbRessource._id },
          { $inc: { like: 1 } }
      );
  } else {
      //Si le row n'existe pas on l'ajoute
      film.insert({ id: idMovie, like: 1 });
  }

  //On retourne un truck
  return film.findOne({ id: idMovie });
  // return {id: film.findOne({ id: idMovie }).id, like: film.findOne({ id: idMovie }).like}
}

function findMovie() {
  return film.find().fetch();
}