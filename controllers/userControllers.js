const bcrypt = require('bcryptjs');
const userModel = require("../models/userModel");

module.exports.getUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found"
      });
    }

    // hide password
    user.password = undefined;
    return res.status(200).send({
      success: true,
      message: "User fetched successfully",
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get User API',
      error
    });
  }
};


module.exports.updateUserController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });

    // validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found"
      });
    }

    // update
    const { userName, phone, address } = req.body;
    if (userName) user.userName = userName;
    if (phone) user.phone = phone;
    if (address) user.address = address;

    // save user
    await user.save();
    return res.status(200).send({
      success: true,
      message: 'User updated successfully',
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get User API',
      error
    });

  }
};


module.exports.updatePasswordController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User Not Found',
      });
    }

    // get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide All Fields',
      });
    }

    // compare password
    const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isMatchPassword) {
      return res.status(500).send({
        success: false,
        message: "Invalid Old Password"
      });
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).send({
      success: true,
      message: "Password updated successfully",
      user
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Update Password API',
      error
    });
  }
};

module.exports.resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;

    // validation
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide All field',
      });
    }

    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(500).send({
        success: false,
        message: 'User Not Found or invalid answer',

      });
    }

    // hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "Password Reset successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Reset Password API',
      error
    });
  }
};


module.exports.deleteUserController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Reset Password API',
      error
    });
  }
};