const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

server.use(express.json());

const projectRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(projectRouter)
server.use(actionsRouter)

module.exports = server;
