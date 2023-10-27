// add middlewares here related to actions
function validateAction(req, res, next) {
    const { description, notes } = req.body;
    
    if (!description || !notes) {
      return res.status(400).json({ message: "Description and notes are required" });
    }
    
    next();
  }
  
  module.exports = {
    validateAction, 
  };