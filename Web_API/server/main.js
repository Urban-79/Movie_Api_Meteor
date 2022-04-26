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



  let dbRessource = film.findOne({ id: idMovie });



  if (dbRessource) {
    film.update(
      { _id: dbRessource._id },
      { $inc: { like: 1 } }
    );
  } else {
    film.insert({ id: idMovie, like: 1 }); //Mettre le insert mongoDB ici
  }



  return film.findOne({ id: idMovie });
  // return {id: film.findOne({ id: idMovie }).id, like: film.findOne({ id: idMovie }).like}
}