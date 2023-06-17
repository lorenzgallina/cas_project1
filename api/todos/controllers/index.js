const {
    getTodos,
    getTodoById,
    addTodo,
    updateTodo,
    deleteTodo,
  } = require('../services');
  
  async function getAllTodos(req, res) {
    const filter = req.query;
    const todos = await getTodos(filter);
    res.json(todos);
  }
  
  async function getTodo(req, res) {
    const todo = await getTodoById(req.params.id);
    res.json(todo);
  }
  
  async function createTodo(req, res) {
    console.log(req.body, "create");
    const newTodo = await addTodo(req.body);
    res.json(newTodo);
  }
  
  async function updateTodoController(req, res) {
    const updatedCount = await updateTodo(req.params.id, req.body);
    res.json({ updatedCount });
  }
  
  async function deleteTodoController(req, res) {
    const deletedCount = await deleteTodo(req.params.id);
    res.json({ deletedCount });
  }
  
  module.exports = {
    getAllTodos,
    getTodo,
    createTodo,
    updateTodoController,
    deleteTodoController,
  };