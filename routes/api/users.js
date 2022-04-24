const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/pizza-controller');

// /api/pizzas
router
  .route('/')
  .get( getAllUsers)
  .post(createUser);

// /api/pizzas/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete( deleteUser);

  router 
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);


module.exports = router;
