const restaurantModel = require("../models/restaurantModel");

module.exports.createRestaurantController = async (req, res) => {
  try {
    const { title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords } = req.body;

    // validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: 'Please provide all fields'
      });
    }

    const newRestaurant = new restaurantModel({
      title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords
    });

    await newRestaurant.save();
    return res.status(201).send({
      success: true,
      message: 'New Restaurant is added',
      newRestaurant
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Create Restaurant API',
      error
    });
  }
};


module.exports.getAllRestaurantController = async (req, res) => {
  try {
    const restaurant = await restaurantModel.find({});
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: 'No restaurant available'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched all restaurants',
      totalCount: restaurant.length,
      restaurant
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get All Restaurant API',
      error
    });
  }
};


module.exports.getRestaurantByIdController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // validation
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide restaurant id'
      });
    }

    // find restaurant
    const restaurant = await restaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: 'No restaurant found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched restaurant',
      restaurant
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get Restaurant BY Id API',
      error
    });
  }
};


module.exports.deleteRestaurantController = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    // validation
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: 'Please provide restaurant id'
      });
    }

    // delete restaurant
    await restaurantModel.findByIdAndDelete(restaurantId);
    return res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Delete Restaurant API',
      error
    });

  }
};