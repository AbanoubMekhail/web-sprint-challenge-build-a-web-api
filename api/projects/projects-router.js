// Write your "projects" router here!
const express = require('express');
const router = express.Router();
const Projects = require('./projects-model');
const { validateProject } = require('./projects-middleware');


router.get('/api/projects', (req, res) => {
    Projects.get()
    .then((projects) => {
      res.status(200).json(projects);
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error getting projects' });
    });
});


router.get('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    Projects.get(id)
      .then((project) => {
        if (project) {
          res.status(200).json(project);
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error getting project' });
      });
});


router.post('/api/projects', validateProject, (req, res) => {
    const projectData = req.body;
    Projects.insert(projectData)
      .then((project) => {
        res.status(201).json(project);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error creating project' });
      });
});

router.put('/api/projects/:id', validateProject, (req, res) => {
    const { id } = req.params;
  const changes = req.body;
  Projects.update(id, changes)
    .then((project) => {
      if (project) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: 'Project not found' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error updating project' });
    });
});

router.delete('/api/projects/:id', (req, res) => {
    const { id } = req.params;
    Projects.remove(id)
      .then((count) => {
        if (count > 0) {
          res.status(204).end();
        } else {
          res.status(404).json({ message: 'Project not found' });
        }
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error deleting project' });
      });
});

router.get('/api/projects/:id/actions', (req, res) => {
    const { id } = req.params;
    Projects.getProjectActions(id)
      .then((actions) => {
        res.status(200).json(actions);
      })
      .catch((err) => {
        res.status(500).json({ message: 'Error getting project actions' });
      });
});

module.exports = router;