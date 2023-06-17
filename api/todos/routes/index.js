const express = require('express');
const {
  getAllTodos,
  getTodo,
  createTodo,
  updateTodoController,
  deleteTodoController,
} = require('../controllers');

const router = express.Router();

router.get('/', getAllTodos);
router.get('/:id', getTodo);
router.post('/', createTodo);
router.put('/:id', updateTodoController);
router.delete('/:id', deleteTodoController);


module.exports = router;