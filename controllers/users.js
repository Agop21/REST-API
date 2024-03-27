import { v4 as uuidv4 } from 'uuid'; // Import the uuid package to generate a unique id for each user
import jwt from "jsonwebtoken"; // Add JWT dependency for authentication
import dotenv from 'dotenv';
dotenv.config();

let users = []; // Create an empty array to store the users

export const getUsers = (req, res) => {
    res.send(users);
}

export const createUser = (req, res) => {
    const user = req.body;
    users.push({ ...user, id: uuidv4() }); // Add the user to the users array with a unique id generated by uuidv4
    // res.send(`User with the name ${user.firstName} added to the database!`);

    // Access secretKey from environment variable
    const secretKey = process.env.JWT_SECRET;

    // Generate JWT token
  const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: "1h" }); // Expires in 1 hour
  res.json({ user, token }); // Send back the user and token
}

export const getUser = (req, res) => { //Get a specific user by id
    const { id } = req.params;

    const foundUser = users.find((user) => user.id === id);

    res.send(foundUser);
}

export const deleteUser = (req, res) => { //Delete a specific user by id
    const { id } = req.params;
    users = users.filter((user) => user.id !== id); // Update the users array by removing the user with the specified id
    res.send(`User with the id ${id} deleted from the database.`);
}

export const updateUser = (req, res) => { //Update a specific user by id
    const { id } = req.params;
    const { firstName, lastName, age } = req.body;
    const user = users.find((user) => user.id === id); // Find the user with the specified id

    if(firstName) {
        user.firstName = firstName;
    }
    if(lastName) {
        user.lastName = lastName;
    }
    if(age) {
        user.age = age;
    }

    res.send(`User with the id ${id} has been updated`);

}