import slugify from "slugify";
import News from "../models/newsModel.js";

export const createNews = async (req, res) => {
  try {
    const { name, pic, description } = req.body; // Corrected variable name

    if (!name) {
      return res.status(400).send({ success: false, message: "Name is required" });
    }

    if (!pic) {
      return res.status(400).send({ success: false, message: "Link is required" }); // Corrected message
    }

    if (!description) {
      return res.status(400).send({ success: false, message: "Description is required" });
    }

    const existingNews = await News.findOne({ name });

    if (existingNews) {
      return res.status(409).send({ success: false, message: "News already exists" }); // Corrected message
    }

    const newNews = new News({ // Corrected model name
      name,
      slug: slugify(name),
      description,
      pic
    });

    await newNews.save();

    res.status(201).send({
      success: true,
      message: "New news created",
      news: newNews,
    });
  } catch (error) {
    console.error("Error in creating news", error);
    res.status(500).send({
      success: false,
      message: "Error in creating news",
      error: error.message,
    });
  }
};


export const allNews = async (req, res) => {
  try {
    const newsList = await News.find({});
    res.status(200).send({
      success: true,
      message: "All news list",
      news: newsList, // Corrected variable name
    });
  } catch (error) {
    console.error("Error while getting all news:", error);
    res.status(500).send({
      success: false,
      error: error.message,
      message: "Error while getting all news",
    });
  }
};


export const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedNews = await News.findByIdAndDelete(id);

    if (!deletedNews) {
      return res.status(404).send({ success: false, message: "News not found" });
    }

    res.status(200).send({
      success: true,
      message: "News deleted successfully",
    });
  } catch (error) {
    console.error("Error while deleting news:", error);
    res.status(500).send({
      success: false,
      message: "Error while deleting news",
      error: error.message,
    });
  }
};
