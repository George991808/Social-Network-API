// ObjectId() method for converting thoughtId string into an ObjectId for querying database
const { ObjectId } = require("mongoose").Types;
const User = require("../models/User");
const Thought = require("../models/Thought");

// TODO: Create an aggregate function to get the number of thoughts overall
const headCount = async () =>
  Thought.aggregate()
    // Your code here
    .then((numberOfThoughts) => numberOfThoughts);

// Execute the aggregate method on the Thought model and calculate the overall grade by using the $avg operator
const grade = async (thoughtId) =>
  Thought.aggregate([
    // TODO: Ensure we include only the thought who can match the given ObjectId using the $match operator
    {
      // Your code here
    },
    {
      $unwind: "$reactions",
    },
    // TODO: Group information for the thought with the given ObjectId alongside an overall grade calculated using the $avg operator
    {
      // Your code here
    },
  ]);

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .lean()
      .then(async (thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json({
              thought,
            })
      )
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) =>
        User.findOneAndUpdate(
          { username: req.body.username },
          { $push: { thoughts: thought } }
        ).then((user) => res.json(thought))
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and remove them from the course
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No such thought exists" })
          : res.json({ message: "Thought successfully deleted" })
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add an reaction to a thought
  addReaction(req, res) {
    console.log("You are adding an reaction");
    console.log(req.body);
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },

      { $push: { reactions: req.body } }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought found with that ID :(" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
