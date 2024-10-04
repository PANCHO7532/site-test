#!/usr/bin/env node
const path = require("path");
const pug = require("pug");
const fastify = require("fastify")(/*{logger: true}*/);
const SERVER_PORT = process.env.PORT || 3000;
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
console.log(process.env);
if(process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.NETLIFY_LOCAL) {
    // serverless
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
    fastify.listen({port: SERVER_PORT, host: "0.0.0.0"}, async() => { console.log("ready"); });
}
module.exports = fastify;
//exports.handler = require("serverless-http")(fastify);

//console.log(require);
//console.log(require.main);