import express from "express";
import {
  allStubble,
  createStubble,
  deleteStubble,
} from "../controllers/stubbleController.js";

const router = express.Router();

// create step
router.post("/create-stubble", createStubble);

//  getALl step
router.get("/get-stubble", allStubble);

//  delete step
router.delete("/delete-stubble/:id", deleteStubble);
export default router;
