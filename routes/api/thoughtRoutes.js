const router = require("express").Router();
const {
	getThoughts,
	getSingleThought,
	createThought,
	updateThought,
	deleteThought,
	postReaction,
	deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router.route("/:thoughtId").get(getSingleThought);
router.route("/:thoughtId").put(updateThought);
router.route("/:thoughtId").delete(deleteThought);
router.route("/:thoughtId/reactions").post(postReaction);
router.route("/:thoughtId/reactions").delete(deleteReaction);

module.exports = router;
