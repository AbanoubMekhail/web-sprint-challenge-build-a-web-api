// add middlewares here related to projects
function validateProject(req, res, next) {
  const { name, description, completed } = req.body;
    
    if (!name || !description || completed === undefined) {
      return res.status(400).json({ message: "Name and description are required" });
    }
    
    next();
  }
  
  module.exports = {
    validateProject, 
  };