const categoryModel = require("../models/categoryModel");

module.exports.createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;

    // validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: 'Please provide category title'
      });
    }

    const newCategory = new categoryModel({ title, imageUrl });
    await newCategory.save();
    return res.status(200).send({
      success: true,
      message: 'New category created successfully',
      newCategory
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Create Cat API',
      error
    });
  }
};


module.exports.getAllCatController = async (req, res) => {
  try {
    const categories = await categoryModel.find({});

    // validation
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: 'No catgories found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched category',
      totalCount: categories.length,
      categories
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Get All Cat API',
      error
    });
  }
};


module.exports.updateCatController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;

    const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true });

    if (!updatedCategory) {
      return res.status(404).send({
        success: false,
        message: 'No category found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Category updated successfully',
      updatedCategory
    });

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Update Cat API',
      error
    });
  }
};


module.exports.deleteCatController = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(404).send({
        success: false,
        message: 'No category id found'
      });
    }
    
    const category = await categoryModel.findByIdAndDelete(id)
    if (!category) {
      return res.status(404).send({
        success: false,
        message: 'No category found'
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Category deleted successfully'
    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Error in Delete Cat API',
      error
    });
  }
}