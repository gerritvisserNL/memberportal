// controllers/userController.js
import createUserService from "../services/users/createUserService.js";
import deleteUserByIdService from "../services/users/deleteUserByIdService.js";
import getUserByIdService from "../services/users/getUserByIdService.js";
import getUsersService from "../services/users/getUsersService.js";
import updateUserByIdService from "../services/users/updateUserByIdService.js";

// Controller function to create a new user
export const createUser = async (req, res) => {
  try {
    const newUser = await createUserService(req.body); // Call createUserService
    res.status(201).json(newUser); // Respond with the newly created user
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};

// Controller function to delete a user by their ID
export const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await deleteUserByIdService(req.params.userId); // Call deleteUserService
    res.status(200).json(deletedUser); // Respond with the deleted user
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};

// Controller function to get a user by their ID
export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req.params.userId); // Call getUserByIdService
    res.status(200).json(user); // Respond with the user object
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};

// Controller function to get all users
export const getUsers = async (req, res) => {
  try {
    const users = await getUsersService(); // Call getUsersService
    res.status(200).json(users); // Respond with a list of users
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};

// Controller function to update a user by their ID
export const updateUserById = async (req, res) => {
  try {
    const updatedUser = await updateUserByIdService(
      req.params.userId,
      req.body
    ); // Call updateUserByIdService
    res.status(200).json(updatedUser); // Respond with the updated user
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle errors
  }
};
