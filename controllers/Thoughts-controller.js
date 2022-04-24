const { User, Thoughts} = require('../models');

//enter code to get ALL thoughts
const thoughtsController = {
    // get all pizzas
    getAllthoughts(req, res) {
      Thoughts.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtsData => res.json(dbThoughtsData))
        .catch(err => {
          console.log(err);
          res.sendStatus(400);
        });
    },

//enter code to get thoughts by ID
getThoughtsById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thoughts found with that id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },


//enter code to  create a thought 
createThoughts({ body }, res) {
    Thoughts.create(body)
    .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  },
//enter code to update thought by ID

updateThoughts({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbPizzaData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No pizza found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },

//enter code to  delete thought by ID 
  deleteThoughts({ params }, res) {
    Thoughts.findOneAndDelete({ _id: params.id })
      .then(dbThoughtsData => res.json(dbThoughtsData))
      .catch(err => res.json(err));
  }
};

//enter code to create a reaction 


createReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.getThoughtsById },
      { $push: { replies: body } },
      { new: true, runValidators: true }
      .populate({
        path: 'reactions',
        select: '-__v'
      })
    )
      .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtsData);
      })
      .catch(err => res.json(err));
  },


  // delete reaction 
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.commentId },
      { $pull: { reactions: { getThoughtsById: params.reactionID } } },
      { new: true }
    )
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
          res.status(404).json({ message: 'No reaction found with this id!' });
          return;
        }
        res.json(dbPizzaData);
      })
      .catch(err => res.json(err));
  },



