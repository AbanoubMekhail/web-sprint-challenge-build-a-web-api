// Write your "actions" router here!
const express = require('express');
const router = express.Router();
const Actions = require('./actions-model'); 
const { validateAction } = require('./actions-middlware');


router.get('/api/actions', (req, res) => {
    Actions.get()
    .then((actions) => {
      res.status(200).json(actions);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error getting actions' });
    });
});

router.get('/api/actions/:id', (req, res) => {
    const { id } = req.params;
  Actions.get(id)
    .then((action) => {
      if (action) {
        res.status(200).json(action);
      } else {
        res.status(404).json({ message: 'Action not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error getting action' });
    });
});

router.post('/api/actions', validateAction, (req, res) => {
    const actionData = req.body;
    Actions.insert(actionData)
      .then((action) => {
        res.status(201).json(action);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error creating action' });
      });
});

router.put('/api/actions/:id', validateAction, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    Actions.update(id, changes)
      .then((action) => {
        if (action) {
          res.status(200).json(action);
        } else {
          res.status(404).json({ message: 'Action not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error updating action' });
      });
});

router.delete('/api/actions/:id', (req, res) => {
    const { id } = req.params;
    Actions.remove(id)
      .then((count) => {
        if (count > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: 'Action not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error deleting action' });
      });
});

module.exports = router;