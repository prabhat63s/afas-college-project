import slugify from "slugify";
import Greenhouse from "../models/greenhouseModel.js";

// Controller function to create a new Greenhouse step
export const createGreenhouseStep = async (req, res) => {
  try {
    // Destructure name and description from request body
    const { name, descriptions } = req.body;

    // Check if name is provided
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }

    // Check if description is provided
    if (!descriptions) {
      return res
        .status(400)
        .send({ success: false, message: "Description is required" });
    }

    // Check if a Greenhouse with the same name already exists
    const existingGreenhouse = await Greenhouse.findOne({ name });

    if (existingGreenhouse) {
      return res
        .status(409)
        .send({ success: false, message: "Greenhouse step already exists" });
    }

    // Create a new Greenhouse instance
    const newGreenhouse = new Greenhouse({
      name,
      slug: slugify(name), // Generate slug from name
      descriptions,
    });

    // Save the new Greenhouse to the database
    await newGreenhouse.save();

    // Respond with success message and the created Greenhouse object
    res.status(201).send({
      success: true,
      message: "New Greenhouse step created",
      greenhouse: newGreenhouse,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error in creating Greenhouse step:", error);
    res.status(500).send({
      success: false,
      message: "Error in creating Greenhouse step",
      error: error.message,
    });
  }
};

// get all GreenhouseStep
export const allGreenhouseStep = async (req, res) => {
  try {
    const greenhouse = await Greenhouse.find({});
    res.status(200).send({
      success: true,
      message: "All Greenhouse List",
      greenhouse,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Greenhouse",
    });
  }
};

//delete GreenhouseStep
export const deleteGreenhouseStep = async (req, res) => {
  try {
    const { id } = req.params;
    await Greenhouse.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Greenhouse Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Greenhouse",
      error,
    });
  }
};
