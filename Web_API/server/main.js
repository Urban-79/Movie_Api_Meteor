import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import { Mongo } from 'meteor/mongo';
import { HTTP } from 'meteor/http';
import { localDatas} from "./localDatas";

Meteor.startup(() => {
  // code to run on server at startup
    console.log("HELLO");
});

WebApp.connectHandlers.use('/api/test/', (req, res, next) => {
    res.writeHead(200);
    res.write(JSON.stringify(localDatas));
    res.end();
});