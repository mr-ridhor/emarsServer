const { User, sequelize } = require("../models");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const registerUser = async (req, res) => {
  try {
    const { name, username, email, password, dob } = req.body;

    // Parse the incoming date string in the format "DD-MM-YYYY"
    const dobParts = dob.split("-");
    const dobDate = new Date(`${dobParts[2]}-${dobParts[1]}-${dobParts[0]}`);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      dob: dobDate.toISOString().split("T")[0],
    });

    // console.log(newUser);
    res.status(201).json({ message: "created", newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error });
  }
};
const loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    console.log("Request Body:", req.body);
    if (!login) {
      return res
        .status(400)
        .json({ message: "Identifier (email or username) is missing" });
    }
    // Find the user by their email
    const user = await User.findOne({
      where: { [Op.or]: [{ email: login }, { username: login }] },
    });

    if (!user) {
      // User not found
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    const data = { email: user.email, id: user.id, username: user.username };
    if (passwordMatch) {
      // Passwords match; user is authenticated
      res.status(200).json({ message: "Login successful", data });
    } else {
      // Passwords don't match; authentication failed
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
module.exports = { registerUser, loginUser };
