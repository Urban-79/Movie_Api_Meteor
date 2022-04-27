import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
//import { localDatas} from "./localDatas.js";

Meteor.startup(() => {
  // code to run on server at startup
  console.log("HELLO FROM SERVER");
});

/*WebApp.connectHandlers.use('/api/discover/movie', (req, res, next) => {
  res.writeHead(200);
  res.end(JSON.stringify(localDatas));
});*/

WebApp.connectHandlers.use('/api/like', (req, res, next) => {
  console.log("api/like")
  
  res.writeHead(200);
  res.end;
});
