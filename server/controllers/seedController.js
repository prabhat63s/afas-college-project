import slugify from "slugify";
import Seed from "../models/seedModel.js";

// Controller function to create a new Seed step
export const createSeedStep = async (req, res) => {
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

    // Check if a Seed with the same name already exists
    const existingSeed = await Seed.findOne({ name });

    if (existingSeed) {
      return res
        .status(409)
        .send({ success: false, message: "Seed step already exists" });
    }

    // Create a new Seed instance
    const newSeed = new Seed({
      name,
      slug: slugify(name), // Generate slug from name
      descriptions,
    });

    // Save the new Seed to the database
    await newSeed.save();

    // Respond with success message and the created Seed object
    res.status(201).send({
      success: true,
      message: "New Seed step created",
      seed: newSeed,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error in creating Seed step:", error);
    res.status(500).send({
      success: false,
      message: "Error in creating Seed step",
      error: error.message,
    });
  }
};

// get all SeedStep
export const allSeedStep = async (req, res) => {
  try {
    const seed = await Seed.find({});
    res.status(200).send({
      success: true,
      message: "All Seed List",
      seed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Seed",
    });
  }
};

//delete SeedStep
export const deleteSeedStep = async (req, res) => {
  try {
    const { id } = req.params;
    await Seed.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Seed Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Seed",
      error,
    });
  }
};
