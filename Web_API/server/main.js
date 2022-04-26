import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
//import { localDatas} from "./localDatas.js";

Meteor.startup(() => {
  // code to run on server at startup
  console.log("HELLO");
});

/*WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {
  res.writeHead(200);
  res.end(JSON.stringify(localDatas));
});*/

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