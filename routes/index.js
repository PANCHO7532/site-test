const mainController = require("../controllers/main.controller");
module.exports = (app, opts, done) => {
	app.get("/", mainController.main);
	done();
}
