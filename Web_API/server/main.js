import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';
import bodyParser from 'body-parser';

WebApp.connectHandlers.use(bodyParser.json());

//Connexion a la db
const film = new Mongo.Collection("film");
const commentsDB = new Mongo.Collection("comments");

Meteor.startup(() => {
  // code to run on server at startup
  console.log("Server Start");
});

//appel de l'API
WebApp.connectHandlers.use('/api/movies', (req, res, next) => {
  HTTP.call('GET', 'https://api.themoviedb.org/3/discover/movie?api_key=4ec050aec0b57f2c30391a6cb27295ee&language=fr-FR', {},
      function (error, response) {
       let moviesData = response.data;
        res.writeHead(200);
        res.end(JSON.stringify(moviesData));
      });
});

//Ajoute un like
WebApp.connectHandlers.use('/api/like', (req, res, next) => {
  const idMovie = req.url.slice(1);
  var toReturn = updateLikeMovie(idMovie);
  console.log("Ajout d'un like à " + idMovie);
  res.writeHead(200);
  toReturn = JSON.stringify(toReturn);
  //toReturn = '{"results":' + toReturn + "}";

  console.log(toReturn);
  res.write(toReturn);

  res.end();
});

WebApp.connectHandlers.use('/api/comments', (req, res, next) => {
  data = req.body;
  if(data.comment && data.idMovie){
    commentsDB.insert({ id: data.idMovie, comment: data.comment });
    console.log("Nouveau Commentaire: " + data.comment + " id: " + data.idMovie);
  }
  res.writeHead(200);
  res.end();
});

//Renvoie les likes
WebApp.connectHandlers.use('/api/findLike', (req, res, next) => {
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

//Renvoie les commentaires
WebApp.connectHandlers.use('/api/findComments', (req, res, next) => {
  var comments = commentsDB.find().fetch();
  //On le string
  comments = JSON.stringify(comments);
  //Ajout du results pour avoir un id a chaque data
  comments = '{"results":' + comments + "}";
  //On repond au get
  res.writeHead(200);
  console.log("Recupération des commentaires");
  res.end(comments);
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

  //On retourne un l'id du film
  return film.findOne({ id: idMovie });

}
