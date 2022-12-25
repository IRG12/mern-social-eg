import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";

// Express.js --> It's a layer built on the top of the Node js that helps manage servers and routes.
const router = express.Router();

// Some CRUD functionality
/* Read */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

/* Update */
router.patch("/:id:friendId", verifyToken, addRemoveFriend);

export default router;
