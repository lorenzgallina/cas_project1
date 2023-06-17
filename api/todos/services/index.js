const Datastore = require('nedb');
const db = new Datastore({ filename: './todos.db', autoload: true });

function getTodos(filter = {}) {
  return new Promise((resolve, reject) => {
    db.find(filter, (err, docs) => {
      if (err) reject(err);
      resolve(docs);
    });
  });
}

function getTodoById(id) {
  return new Promise((resolve, reject) => {
    db.findOne({ _id: id }, (err, doc) => {
      if (err) reject(err);
      resolve(doc);
    });
  });
}

function addTodo(todo) {
  return new Promise((resolve, reject) => {
    db.insert(todo, (err, newDoc) => {
      if (err) reject(err);
      console.log(newDoc);
      resolve(newDoc);
    });
  });
}

function updateTodo(id, todo) {
  return new Promise((resolve, reject) => {
    db.update({ _id: id }, todo, {}, (err, numReplaced) => {
      if (err) reject(err);
      resolve(numReplaced);
    });
  });
}

function deleteTodo(id) {
  return new Promise((resolve, reject) => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) reject(err);
      resolve(numRemoved);
    });
  });
}

module.exports = {
  getTodos,
  getTodoById,
  addTodo,
  updateTodo,
  deleteTodo,
};