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



  let dbRessource = LikesCollection.findOne({ id: idMovie });



  if (dbRessource) {
    LikesCollection.update(
      { _id: dbRessource._id },
      { $inc: { like: 1 } }
    );
  } else {
    LikesCollection.insert({ id: idMovie, like: 1 }); //Mettre le insert mongoDB ici
  }



  return LikesCollection.findOne({ id: idMovie });
  // return {id: LikesCollection.findOne({ id: idMovie }).id, like: LikesCollection.findOne({ id: idMovie }).like}
}