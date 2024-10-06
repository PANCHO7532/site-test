#!/usr/bin/env node
const path = require("path");
const pug = require("pug");
const fastify = require("fastify")(/*{logger: true}*/);
const awsLambda = require("@fastify/aws-lambda");
const SERVER_PORT = process.env.PORT || 3000;
fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, 'public'),
    prefix: "/public/",
    decorateReply: false
});
//const awsLambda = require("@fastify/aws-lambda");
fastify.register(require("@fastify/view"), {
    engine: { pug },
    root: path.join(process.cwd(), "views"),
    propertyName: "render",
    options: {
        pretty: true
    }
});
fastify.register(require(path.join(process.cwd(), "routes/asd")));
if(process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.NETLIFY_LOCAL || process.env.__VERCEL_DEV_RUNNING) {
    fastify.server.serverlessProxy = awsLambda(fastify);
    module.exports = fastify;
} else {
    fastify.listen({port: SERVER_PORT, host: "0.0.0.0"}, async() => { console.log("ready"); });
}
/*if((process.env.AWS_LAMBDA_FUNCTION_VERSION || process.env.NETLIFY_LOCAL) && (!process.env.VERCEL && !process.env.__VERCEL_DEV_RUNNING)) {
    // lambda style serverless
    console.log("lambda serverless");
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
} else if(process.env.VERCEL || process.env.__VERCEL_DEV_RUNNING) {
    console.log("vercel serverless");
    module.exports = fastify;
} else {
    console.log("beginning to listen for connections");
    fastify.listen({port: SERVER_PORT, host: "0.0.0.0"}, async() => { console.log("ready"); });
}*/