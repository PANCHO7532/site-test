exports.main = async(req, res, next) => {
	await res.render("index");
	return;
}
exports.main2 = async(req, res, next) => {
	await res.code(200).send({msg: "ok"});
	return;
}
