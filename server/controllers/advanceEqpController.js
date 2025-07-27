import slugify from "slugify";
import AdvanceEqp from "../models/advanceEqpModel.js";

// Controller function to create a new AdvanceEqp
export const createAdvanceEqp = async (req, res) => {
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

    // Check if a AdvanceEqp with the same name already exists
    const existingAdvanceEqp = await AdvanceEqp.findOne({ name });

    if (existingAdvanceEqp) {
      return res
        .status(409)
        .send({ success: false, message: "AdvanceEqp step already exists" });
    }

    // Create a new AdvanceEqp instance
    const newAdvanceEqp = new AdvanceEqp({
      name,
      slug: slugify(name), // Generate slug from name
      descriptions,
    });

    // Save the new AdvanceEqp to the database
    await newAdvanceEqp.save();

    // Respond with success message and the created AdvanceEqp object
    res.status(201).send({
      success: true,
      message: "New AdvanceEqp created",
      AdvanceEqp: newAdvanceEqp,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error in creating AdvanceEqp", error);
    res.status(500).send({
      success: false,
      message: "Error in creating AdvanceEqp step",
      error: error.message,
    });
  }
};

// get all the AdvanceEqp
export const allAdvanceEqp = async (req, res) => {
  try {
    const AdvanceEqpList = await AdvanceEqp.find({});
    res.status(200).send({
      success: true,
      message: "All AdvanceEqp List",
      AdvanceEqp: AdvanceEqpList, // Ensure to use the correct variable name
    });
  } catch (error) {
    console.error("Error while getting all AdvanceEqp:", error);
    res.status(500).send({
      success: false,
      error: error.message, // Send specific error message
      message: "Error while getting all AdvanceEqp",
    });
  }
};


//delete AdvanceEqp
export const deleteAdvanceEqp = async (req, res) => {
  try {
    const { id } = req.params;
    await AdvanceEqp.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "AdvanceEqp Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting AdvanceEqp",
      error,
    });
  }
};
