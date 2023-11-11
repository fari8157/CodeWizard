const jwt= require( "jsonwebtoken");

const generateToken = (id,role) => {
  return jwt.sign({ id,role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const verify= (req, res, next) => {
  try {
    
    const token = req.header('Authorization');
    const role = req.header('userRole');
    console.log(token);
    console.log(role);
    

    if (!token) {
      return res.status(401).json({ error: true, message: 'Unauthorized' });
    }

    const secretKey = process.env.JWT_SECRET;
    const verified = jwt.verify(token, secretKey);

    if (verified.role !== role) {
      return res.status(403).json({ error: true, message: 'Forbidden' });
    }
     console.log("hi");
    req.user = verified;
    next();
  } catch (error) {
    console.error('Error in authentication and authorization middleware:', error);
    res.status(500).json({ success: true, message: 'Internal Server Error' });
  }
};



 
module.exports={ generateToken,verify};