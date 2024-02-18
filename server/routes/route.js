import bcrypt from "bcrypt";
import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/auth.js";

const router = express.Router();
router.get("/", (request, response) => {
  response.send("Welcome to the server");
});
router.get("/play", authenticateToken, (req, res) => {
  // Logic for the play route
  res.send("Welcome to the Play page");
});

// Sign UP
router.post("/signup", async (request, response) => {
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
        username: request.body.username,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e: e,
      });
    });
});

// LOGIN

router.post("/login", async (request, response) => {
  // find the user by email
  User.findOne({ email: request.body.email })
    .then((user) => {
      bcrypt
        .compare(request.body.password, user.password)
        .then((passwordMatch) => {
          if (!passwordMatch) {
            return response.status(401).send({
              message: "Password is incorrect",
              error,
            });
          }

          const token = jwt.sign(
            { email: user.email, _id: user._id },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "24h" }
          );
          response.status(200).send({
            message: "Login Successful",
            email: user.email,
            token: token,
          });
        })
        .catch((error) => {
          response.status(400).send({
            message: "Password is incorrect",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(400).send({
        message: "User not found",
        error,
      });
    });
});

export default router;
