#!/usr/bin/env node
const path = require("path");
const pug = require("pug");
const fastify = require("fastify")(/*{logger: true}*/);
fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, 'public'),
    prefix: "/public/",
    decorateReply: false
});
//console.log(path.join(__dirname, 'public'));
const awsLambda = require("@fastify/aws-lambda");
fastify.register(require("@fastify/view"), {
    engine: { pug },
    root: path.join(__dirname, "views"),
    propertyName: "render",
    options: {
        pretty: true
    }
});
fastify.register(require("./routes/asd"));
/*if(require.main != "module") {
    
} else {
    
}*/
//
//
//console.log(process.env);
if(process.env.SERVERLESS || process.env.NETLIFY_LOCAL) {
    exports.handler = awsLambda(fastify, {binaryMimeTypes: [
        "application/octet-stream",
        "image/png",
        "audio/mp3",
        "audio/mpeg",
        "video/mp4",
        "application/pdf",
        "application/json",
        "text/plain"
    ]});
    //exports.handler = require("serverless-http")(fastify);
    //module.exports = () => { return fastify; };
} else {
    fastify.listen({port: 3000, host: "0.0.0.0"}, async() => { console.log("ready"); });
}
//exports.handler = require("serverless-http")(fastify);

//console.log(require);
//console.log(require.main);