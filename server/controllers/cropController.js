import slugify from "slugify";
import fs from "fs"; //importing file system
import CropsModel from "../models/CropsModel.js";

export const createCropController = async (req, res) => {
  try {
    //now we will use formid to get the data
    const { name, slug, description, category } = req.body;
    console.log(req.body);
    //validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is required",
        });

      case !description:
        return res.status(500).send({
          error: "Description is required",
        });

      case !category:
        return res.status(500).send({
          error: "Category is required",
        });
    }

    const crops = new CropsModel({
      name,
      slug: slugify(name) || name,
      description,
      category,
    });

    await crops.save();

    res.status(201).send({
      success: true,
      message: "Crops created successfully",
      crops,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating Crops",
    });
  }
};

export const test = (req, res) => {
  res.status(200).send("true");
};
export const updateCropController = async (req, res) => {
  try {
    //now we will use formid to get the data
    const { name, slug, description, category } = req.body;

    //validation
    switch (true) {
      case !name:
        return res.status(500).send({
          error: "Name is required",
        });

      case !description:
        return res.status(500).send({
          error: "Description is required",
        });

      case !category:
        return res.status(500).send({
          error: "Category is required",
        });
    }
    console.log("successfully entered 1");
    const updatedCrop = await CropsModel.findByIdAndUpdate(
      req.params.pid,
      { name, description, slug: slugify(name) || name, category },
      { new: true }
    );
    console.log("successfully entered2");
    await updatedCrop.save();
    res.status(201).send({
      success: true,
      message: "Crop updated successfully",
      updatedCrop,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      error,
      message: "Error in updateing Crops",
    });
  }
};

export const getCropController = async (req, res) => {
  try {
    const getCrops = await CropsModel.find({}).populate("category");
    res.status(200).send({
      success: true,
      message: "All products",
      getCrops,
      countTotal: getCrops.length,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in getting products",
      error: error.message,
    });
  }
};

export const getSingleCrop = async (req, res) => {
  try {
    const product = await CropsModel.findOne({
      slug: req.params.slug,
    }).populate("category");
    res.status(200).send({
      success: true,
      message: "single product fetched",
      product,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: "Error while getting a single product",
      err,
    });
  }
};

//delete controller
export const deleteCropController = async (req, res) => {
  try {
    await CropsModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    console.log(err.message);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const findCropController = async (req, res) => {
  try {
    const filtered = await CropsModel.find({ category: req.params.id });
    res.status(200).send({
      success: true,
      message: "finded the all product with the category given ",
      filtered,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ success: false, message: "some error occured" });
  }
};
