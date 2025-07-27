
import slugify from "slugify";
import OrganicFerti from "../models/organicFertiModel.js";

export const createOrganicFerti = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    if (!description) {
      return res.status(401).send({ message: "description is required" });
    }
    const existingOrganicFerti = await OrganicFerti.findOne({ name });

    if (existingOrganicFerti) {
      return res.status(200).send({
        success: false,
        message: "organic step Already Exisits",
      });
    }
    const organicFerti = await new OrganicFerti({
      name,
      slug: slugify(name),
      description,
    }).save();
    res.status(201).send({
      success: true,
      message: "new organic step created",
      organicFerti,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      errro,
      message: "Errro in organic step",
    });
  }
};

// get all organic fertilizer
export const allOrganicFertiControlller = async (req, res) => {
  try {
    const ferti = await OrganicFerti.find({});
    res.status(200).send({
      success: true,
      message: "All ferti List",
      ferti,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all ferti",
    });
  }
};

//delete category
export const deleteOrganicFertiControlller = async (req, res) => {
  try {
    const { id } = req.params;
    await OrganicFerti.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "OrganicFerti Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting OrganicFerti",
      error,
    });
  }
};
