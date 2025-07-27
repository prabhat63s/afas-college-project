import express from "express";

import { allSeedStep, createSeedStep, deleteSeedStep } from "../controllers/seedController.js";

const router = express.Router();

// create step
router.post("/create-seed", createSeedStep);

//  getALl step
router.get("/get-seed", allSeedStep);

//  delete step
router.delete("/delete-seed/:id", deleteSeedStep);
export default router;
