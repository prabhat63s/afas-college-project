import express from "express";
import { allGreenhouseStep, createGreenhouseStep, deleteGreenhouseStep } from "../controllers/greenhouseController.js";

const router = express.Router();

// create step
router.post("/create-greenhouse", createGreenhouseStep);

//  getALl step
  router.get("/get-greenhouse", allGreenhouseStep);

//  delete step
  router.delete(
    "/delete-greenhouse/:id",
    deleteGreenhouseStep
  );
export default router;
