const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts
} = require('../../controllers/Thoughts-controller');

// /api/pizzas
router
  .route('/')
  .get(getAllThoughts)
  .post(createThoughts);

// /api/pizzas/:id
router
  .route('/:id')
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

module.exports = router;
