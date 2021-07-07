const jwt = require('jsonwebtoken'); 

module.exports = (req, res, next) => { 
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); 
    
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      console.log('succeeded auth test');
      next();
    }
  } catch(err) {
    res.status(401).json({
      error: err
    });
  }
};