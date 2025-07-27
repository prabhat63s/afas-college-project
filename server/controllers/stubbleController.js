import slugify from "slugify";
import Stubble from "../models/stubbleModel.js";

// Controller function to create a new Stubble step
export const createStubble = async (req, res) => {
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

    // Check if a Stubble with the same name already exists
    const existingStubble = await Stubble.findOne({ name });

    if (existingStubble) {
      return res
        .status(409)
        .send({ success: false, message: "Stubble step already exists" });
    }

    // Create a new Stubble instance
    const newStubble = new Stubble({
      name,
      slug: slugify(name), // Generate slug from name
      descriptions,
    });

    // Save the new Stubble to the database
    await newStubble.save();

    // Respond with success message and the created Stubble object
    res.status(201).send({
      success: true,
      message: "New Stubble step created",
      Stubble: newStubble,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error in creating Stubble step:", error);
    res.status(500).send({
      success: false,
      message: "Error in creating Stubble step",
      error: error.message,
    });
  }
};

// get all the stubble
export const allStubble = async (req, res) => {
  try {
    const stubbleList = await Stubble.find({});
    res.status(200).send({
      success: true,
      message: "All Stubble List",
      stubble: stubbleList, // Ensure to use the correct variable name
    });
  } catch (error) {
    console.error("Error while getting all Stubble:", error);
    res.status(500).send({
      success: false,
      error: error.message, // Send specific error message
      message: "Error while getting all Stubble",
    });
  }
};


//delete Stubble
export const deleteStubble = async (req, res) => {
  try {
    const { id } = req.params;
    await Stubble.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Stubble Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Stubble",
      error,
    });
  }
};
