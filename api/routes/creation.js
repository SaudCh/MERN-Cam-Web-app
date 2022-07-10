import express from "express";
import {
  newCreation,
  getCreation,
  getCreations,
  deleteCreation,
  updateCreation,
  getCreationByAuthor
} from "../controllers/creations.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", newCreation);

// PUT
router.put("/:id", updateCreation);

// GET ALL
router.get("/", getCreations, verifyToken);

// GET by auhtor
router.get("/author/:id", getCreationByAuthor);

// GET
router.get("/:id", getCreation);

// DELETE
router.delete("/:id", deleteCreation, verifyToken);

export default router;
