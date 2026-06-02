#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TODOS_PATH = path.join(process.cwd(), 'todos.json');

function readTodos() {
  try {
    const raw = fs.readFileSync(TODOS_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

function writeTodos(todos) {
  fs.writeFileSync(TODOS_PATH, JSON.stringify(todos, null, 2));
}

const command = process.argv[2];

if (command === 'add') {
  const text = process.argv[3];
  const todos = readTodos();
  const newId = todos.length === 0 ? 1 : Math.max(...todos.map(i => i.id)) + 1;
  todos.push({ id: newId, text: text });
  writeTodos(todos);
  console.log('Added: ' + text + ' (ID: ' + newId + ')');
} else if (command === 'list') {
  const todos = readTodos();
  if (todos.length === 0) {
    console.log('No todos yet.');
  } else {
    todos.forEach(function(item) {
      console.log(item.id + '. ' + item.text);
    });
  }
} else if (command === 'done') {
  const id = parseInt(process.argv[3], 10);
  const todos = readTodos();
  const index = todos.findIndex(function(item) { return item.id === id; });
  const removed = todos[index];
  todos.splice(index, 1);
  for (let i = 0; i < todos.length; i++) {
    todos[i].id = i + 1;
  }
  writeTodos(todos);
  console.log('Done: removed "' + removed.text + '"');
}
