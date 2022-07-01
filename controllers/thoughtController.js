const Thought = require("../models/Thought");
const User = require("../models/User");
const { serverError } = require("../utils/errors");

module.exports = {
	getThoughts(req, res) {
		Thought.find()
			.select("-__v")
			.then((thoughts) => res.json(thoughts))
			.catch(() => res.status(500).json(serverError()));
	},
	getSingleThought(req, res) {
		const thoughtId = req.params.thoughtId;
		Thought.findOne({ _id: thoughtId })
			.select("-__v")
			.then((thought) =>
				!thought
					? res.status(404).json({
							"Error Message": `Requested Thought ID: ${thoughtId} Not Found`,
					  })
					: res.json(thought)
			)
			.catch(() => res.status(500).json(serverError()));
	},
	createThought(req, res) {
		User.findOne({ username: req.body.username })
			.then((userId) => {
				if (userId) {
					Thought.create(req.body)
						.then((dbThoughtData) => {
							User.updateOne(
								{ _id: userId._id.toString() },
								{ $push: { thoughts: dbThoughtData._id } }
							).then((err) => err);
							res.json(dbThoughtData);
							console.log(dbThoughtData);
						})
						.catch(() => res.status(500).json(serverError()));
				} else {
					res.status(404).send(`Username ${req.body.username} Not Found`);
				}
			})
			.catch(() => res.status(500).json(serverError()));
	},
	updateThought(req, res) {
		Thought.findOneAndUpdate({ _id: req.params.thoughtId }, req.body, {
			returnOriginal: false,
		})
			.select("-_id -__v")
			.then((thoughtData) => {
				res.json(thoughtData);
				console.log(thoughtData);
			})
			.catch(() => res.status(500).json(serverError()));
	},
	deleteThought(req, res) {
		Thought.findByIdAndDelete({ _id: req.params.thoughtId })
			.select("-_id -__v")
			.then((thoughtData) => {
				res.json(thoughtData);
				console.log(thoughtData);
			})
			.catch((err) => res.status(500).json(err));
	},
	postReaction(req, res) {
		Thought.updateOne(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } }
		)
			.select("-_id -__v")
			.then((thoughtData) => {
				res.json(thoughtData);
				console.log(thoughtData);
			})
			.catch((err) => res.status(500).json(err));
	},
	deleteReaction(req, res) {
		Thought.updateOne(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { _id: req.body } } }
		)
			.select("-_id -__v")
			.then((thoughtData) => {
				res.json(thoughtData);
				console.log(thoughtData);
			})
			.catch((err) => res.status(500).json(err));
	},
};
