import express from "express";

import { allAdvanceEqp, createAdvanceEqp, deleteAdvanceEqp } from "../controllers/advanceEqpController.js";

const router = express.Router();

// create step
router.post("/create-advanceEqp", createAdvanceEqp);

//  getALl step
router.get("/get-advanceEqp", allAdvanceEqp);

//  delete step
router.delete("/delete-advanceEqp/:id", deleteAdvanceEqp);
export default router;
