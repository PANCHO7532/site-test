const awsLambda = require("@fastify/aws-lambda");
const app = require("../app");
exports.handler = awsLambda(app);