const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer, usertype } = req.body;

    // validation
    if (!userName || !email || !password || !address || !phone || !answer) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide All Fields'
      });
    }

    // check user exist
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: 'Email already registered, please login'
      });
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await userModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
      usertype
    });


    return res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Register API',
      error
    });
  }
};


module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide All Fields'
      });
    }

    // check user
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found'
      });
    }

    // compare password
    const isMatchPassword = await bcrypt.compare(password, user.password);
    if (!isMatchPassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials"
      });
    }

    // create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "Login successful",
      token,
      user
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Login API',
      error
    });
  }
};