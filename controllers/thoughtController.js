const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
	getThoughts(req, res) {
		Thought.find()
			.select("-__v")
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err));
	},
	getSingleThought(req, res) {
		Thought.findOne({ _id: req.params.thoughtId })
			.select("-__v")
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "Thought Not Found" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	createThought(req, res) {
		User.findOne({ username: req.body.username })
			.then((userId) => {
				if (userId) {
					Thought.create(req.body).then((dbThoughtData) => {
						User.updateOne(
							{ _id: userId._id.toString() },
							{ $push: { thoughts: dbThoughtData._id } }
						).then((err) => err);
						res.json(dbThoughtData);
						console.log(dbThoughtData);
					});
				} else {
					res.status(404).send(`Username ${req.body.username} Not Found`);
				}
			})
			.catch((err) => res.status(500).json(err));
	},
	updateThought(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
			returnOriginal: false,
		})
			.select("-_id -__v")
			.then((dbThoughtData) => {
				res.json(dbThoughtData);
				console.log(dbThoughtData);
			})
			.catch((err) => res.status(500).json(err));
	},
	deleteThought(req, res) {
		Thought.findByIdAndDelete({ _id: req.params.thoughtId })
			.select("-_id -__v")
			.then((dbThoughtData) => {
				res.json(dbThoughtData);
				console.log(dbThoughtData);
			})
			.catch((err) => res.status(500).json(err));
	},
	postReaction(req, res) {
		Thought.updateOne(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } }
		)
			.select("-_id -__v")
			.then((dbThoughtData) => {
				res.json(dbThoughtData);
				console.log(dbThoughtData);
			})
			.catch((err) => res.status(500).json(err));
	},
	deleteReaction(req, res) {
		Thought.updateOne(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { _id: req.body } } }
		)
			.select("-_id -__v")
			.then((dbThoughtData) => {
				res.json(dbThoughtData);
				console.log(dbThoughtData);
			})
			.catch((err) => res.status(500).json(err));
	},
};
