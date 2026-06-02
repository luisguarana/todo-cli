#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const TODOS_PATH = path.join(process.cwd(), 'todos.json');

function printUsage() {
  console.log('Usage:');
  console.log('  todo add <text>    Add a new to-do item');
  console.log('  todo list          List all to-do items');
  console.log('  todo done <id>     Mark item done (removes it)');
}

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
  try {
    fs.writeFileSync(TODOS_PATH, JSON.stringify(todos, null, 2));
  } catch (err) {
    console.error('Error: could not save todos.json — ' + err.message);
    process.exit(1);
  }
}

const command = process.argv[2];

if (command === 'add') {
  const text = process.argv[3];
  if (!text || text.trim() === '') {
    console.error('Error: please provide a task description.');
    console.error('  Usage: todo add <text>');
    process.exit(1);
  }
  const todos = readTodos();
  const newId = todos.length === 0 ? 1 : Math.max(...todos.map(i => i.id)) + 1;
  todos.push({ id: newId, text: text.trim() });
  writeTodos(todos);
  console.log('Added: ' + text.trim() + ' (ID: ' + newId + ')');
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
  const rawId = process.argv[3];
  if (!rawId) {
    console.error('Error: please provide a todo ID.');
    console.error('  Usage: todo done <id>');
    process.exit(1);
  }
  const id = parseInt(rawId, 10);
  if (isNaN(id)) {
    console.error('Error: ID must be a number, got: ' + rawId);
    process.exit(1);
  }
  const todos = readTodos();
  const index = todos.findIndex(function(item) { return item.id === id; });
  if (index === -1) {
    console.log('No todo with ID ' + id + '.');
    process.exit(1);
  }
  const removed = todos[index];
  todos.splice(index, 1);
  writeTodos(todos);
  console.log('Done: removed "' + removed.text + '"');
} else {
  printUsage();
  process.exit(1);
}
