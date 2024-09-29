#!/usr/bin/env node
const fastify = require("fastify")();
fastify.register(require("./routes"));
fastify.listen({port: 3000, host: "0.0.0.0"}, async() => { console.log("ready"); });
