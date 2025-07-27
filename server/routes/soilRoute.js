import express from "express";
import { allSoil, createSoil, deleteSoil } from "../controllers/soilController.js";

const router = express.Router();

// create step
router.post("/create-soil", createSoil);

//  getALl step
router.get("/get-soil", allSoil);

//  delete step
router.delete("/delete-soil/:id", deleteSoil);
export default router;
