const app = require("../../app");
const awsLambda = require("@fastify/aws-lambda");
// TODO: This breaks when decorate request is true, there's a better way?
exports.handler = awsLambda(app, { decorateRequest: false, binaryMimeTypes: [
    "application/octet-stream",
    "image/png",
    "audio/mp3",
    "audio/mpeg",
    "video/mp4",
    "application/pdf",
    "application/json",
    "text/plain"
]});