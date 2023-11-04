const { generateToken } = require("../utils/genarateToken.js");
const userModel = require("../reposetory/userModel.js");

const userDB = new userModel();

const userRegister = async (req, res) => {
  try {
    const studentData = req.body;
    const userData = await userDB.getUserByEmail(studentData.email);
    if (userData) {
      return res.status(400).json({ error: true, message: 'User Already Exists' });
    }
    const newUser = await userDB.createUser(studentData);
    return res.json({ error: false, message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

const userLogin = async (req, res) => {
  try {
    const userData = req.body;
    const user = await userDB.getUserByEmail(userData.email);
    console.log(user);
    if (!user) {
      return res.status(401).json({ error: true, message: 'User not found' });
    }
    if (user && (await user.matchPassword(userData.password))) {
      if (user.isAccess) {
        return res.json({
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          token: generateToken(user._id),
          message: "Login successfully",
        });
      } else {
        return res.json({ error: true, message: "Access denied" });
      }
    } else {
      return res.json({ error: true, message: "Invalid password" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
};

module.exports = {
  userRegister,
  userLogin
};
