"use strict";




// const Alexa = require("ask-sdk-core");
const Alex = require("alexa-sdk");
const  APP_ID = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXX'









module.exports.Productnm = function(event, context, callback) {
  console.log("Alexa.main handler register") 
  var alexa=Alex.handler(event,context);
  alexa.appId=APP_ID ;
  console.log("Alexa.main:registerHandlers");
  alexa.registerHandlers(
    require('./defaultHandler'),
    require('./mainHandler')
  );
  console.log("Alexa.main: registersHandler completed");
  alexa.execute();
  console.log("Alexa.main:registersJHanlders executed");
 
  };


  
  




