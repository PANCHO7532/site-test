const awsLambda = require("@fastify/aws-lambda");
const serverlessHTTP = require("serverless-http");
const app = require("../app");
//exports.handler = serverlessHTTP(app());
exports.handler = awsLambda(app());