import express from "express";
import { createUser, getUsers, getUser, deleteUser, updateUser } from "../controllers/users.js"; // Import the createUser function from the users controller
import jwt from "jsonwebtoken"; // Add JWT dependency for authentication
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router(); // Create a new router object to handle requests 
const secretKey = process.env.JWT_SECRET;


// Authentication middleware
const authenticate = (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // Add user information to the request object
        next();
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (error) {
      res.status(401).send("Invalid token");
    }
  };

// All route in this file are starting with /users
router.get("/", authenticate, getUsers);

router.post("/", createUser);

router.get("/:id", authenticate, getUser);

router.delete("/:id", authenticate, deleteUser);

router.patch("/:id", authenticate, updateUser);

export default router; // Export the router object to be used in other files