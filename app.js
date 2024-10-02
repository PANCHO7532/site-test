#!/usr/bin/env node
const fastify = require("fastify")();
fastify.register(require("./routes"));
/*if(require.main != "module") {
    
} else {
    
}*/
//module.exports = () => { return fastify; };
//
console.log(process.env);
if(process.env.NETLIFY || process.env.NETLIFY_LOCAL) {
    
} else {
    fastify.listen({port: 3000, host: "0.0.0.0"}, async() => { console.log("ready"); });
}
exports.handler = require("serverless-http")(fastify);
//console.log(require);
//console.log(require.main);