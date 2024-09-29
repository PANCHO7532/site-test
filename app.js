#!/usr/bin/env node
const fastify = require("fastify")();
fastify.register(require("./routes"));
if(require.main != "module") {
    module.exports = () => { return fastify; };
} else {
    fastify.listen({port: 3000, host: "0.0.0.0"}, async() => { console.log("ready"); });
}