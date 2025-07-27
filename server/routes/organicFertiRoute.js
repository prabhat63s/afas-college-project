import express from "express";
import { allOrganicFertiControlller, createOrganicFerti, deleteOrganicFertiControlller } from "../controllers/organicFertiController.js";

const router = express.Router();

// create organic fertilizer
router.post("/create-organicFerti", createOrganicFerti);

// getALl category
  router.get("/get-organicFerti", allOrganicFertiControlller);

// delete category
  router.delete(
    "/delete-organicFerti/:id",
    deleteOrganicFertiControlller
  );
export default router;
