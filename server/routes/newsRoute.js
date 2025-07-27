import express from "express";

import { allNews, createNews, deleteNews } from "../controllers/newsController.js";

const router = express.Router();

// create organic news
router.post("/create-news", createNews);

// getALl category
  router.get("/get-news", allNews);

// delete category
  router.delete(
    "/delete-news/:id",
    deleteNews
  );
export default router;
