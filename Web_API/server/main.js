import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';

//Connexion a la db
const film = new Mongo.Collection("film");

Meteor.startup(() => {
  // code to run on server at startup
  console.log("Server Start");
});

//Ajoute un like
WebApp.connectHandlers.use('/api/like', (req, res, next) => {
  const idMovie = req.url.slice(1);
  updateLikeMovie(idMovie);
  console.log("Ajout d'un like à " + idMovie);
  res.end;
});

//Renvoie les likes
WebApp.connectHandlers.use('/api/find', (req, res, next) => {
  var moviedata = film.find().fetch();
  //On le string
  moviedata = JSON.stringify(moviedata);
  //Ajout du results pour avoir un id a chaque data
  moviedata = '{"results":' + moviedata + "}";
  //On repond au get
  res.writeHead(200);
  console.log("Recupération des likes");
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
  
}

function addComments(idMovie,comments) {

  filmCom.insert({ id: idMovie, com: comments });

  //On retourne un truck
  return filmCom.findOne({ id: idMovie });

}