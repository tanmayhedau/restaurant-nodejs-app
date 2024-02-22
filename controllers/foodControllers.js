const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

module.exports.creatFoodController = async (req, res) => {
  try {
    const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating } = req.body;

    // validation
    if (!title || !price || !description || !restaurant) {
      return res.status(500).send({
        success: false,
        message: 'Please provide all fields',

      });
    }

    const newFood = new foodModel({
      title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating
    });
    await newFood.save();

    return res.status(200).send({
      success: true,
      message: 'New food item created',
      newFood
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Create Food API',
      error
    });
  }
};


module.exports.getAllFoodController = async (req, res) => {
  try {
    const food = await foodModel.find({});
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No food item found',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched food',
      totalCount: food.length,
      food
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get All Food API',
      error
    });
  }
};


module.exports.getSingleFoodController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: 'Please provide food id',
      });
    }

    const food = await foodModel.findById(id);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No food item found',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched food',
      food
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get Single Food API',
      error
    });
  }
};


module.exports.GetFoodByRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: 'Please provide restaurant id',
      });
    }

    const food = await foodModel.find({ restaurant: id });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'No food item found',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched food',
      food
    });


  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get Food by restaurant API',
      error
    });
  }
};


module.exports.updateFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: 'please provide food id'
      });
    }

    const { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating } = req.body;

    const food = await foodModel.findByIdAndUpdate(foodId, { title, description, price, imageUrl, foodTags, category, code, isAvailable, restaurant, rating }, { new: true });

    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food not found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Food item was updated',
      food
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Update Food API',
      error
    });
  }
};

module.exports.deleteFoodController = async (req, res) => {
  try {
    const foodId = req.params.id;
    if (!foodId) {
      return res.status(500).send({
        success: false,
        message: 'Food id not provided'
      });
    }

    const food = await foodModel.findByIdAndDelete(foodId);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: 'Food not found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Food item deleted'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Delete Food API',
      error
    });
  }
};


module.exports.placeOrderController = async (req, res) => {
  try {
    const { cart, payment } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: 'Please add food in cart or payment method'
      });
    }

    let total = 0;
    // calculate order
    cart.map((i) => {
      total += i.price;
    });

    const newOrder = new orderModel({
      foods: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();
    return res.status(201).send({
      success: true,
      message: 'Order placed successfully',
      newOrder
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Place order API',
      error
    });
  }
};


module.exports.orderStatusController = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(500).send({
        success: false,
        message: 'Please provide orderId'
      });
    }

    const { status } = req.body;
    if (!status) {
      return res.status(500).send({
        success: false,
        message: 'Please provide status order'
      });
    }

    const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true }).populate('foods');

    if (!order) {
      return res.status(500).send({
        success: false,
        message: 'Please provide valid order'
      });
    }

    return res.status(200).send({
      success: true,
      message: "Order status changed",
      order
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Order Status API',
      error
    });
  }
};