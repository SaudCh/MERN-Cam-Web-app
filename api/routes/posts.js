import express from "express";

import {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPost,
} from "../controllers/posts.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

//CREATE POST
router.post("/", verifyToken, verifyToken, createPost);

//UPDATE
router.put("/:id", verifyToken, updatePost);

//DELETE
router.delete("/:id", verifyToken, deletePost);

//GET
router.get("/:id", verifyToken, getPost);

//GET ALL
router.get("/", verifyToken, getAllPost);

export default router;
