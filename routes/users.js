const express = require("express");
const router = express.Router();
const { checkBody } = require("../modules/checkBody");

const Users = require("../models/users");

// const emailPattern = new RegExp(/\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,6}/);
// const namePattern = new RegExp(/^[a-zA-Z]+$/);

// SignUp Router

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  const signupInfo = new Users({
    name: name,
    email: email,
    password: password,
  });

  if (!checkBody(signupInfo, ["name", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
  } else {
    /***** Handling of invalid inputs *****
    while (
      emailPattern.test(email) == false ||
      namePattern.test(name) == false
    ) {
      switch (false) {
        case emailPattern.test(email):
          res.json({ result: false, error: "Invalid email address!" });
          break;

        case namePattern.test(name):
          res.json({ result: false, error: "Invalid name!" });
          break;
      }
    }
     ***** End of Handling of invalid inputs *****/

    Users.findOne({ email: email })
      .then((foundUser) => {
        if (foundUser) {
          res.json({ result: false, error: "User already exists" });
        } else {
          signupInfo.save().then(() => {
            res.json({ result: true });
          });
        }
      })
      .catch((error) => console.error(error)); //console logs the error without crashing my server
  }
});
// End of SignUp Router

// SignIn Router
router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  const signupInfo = {
    email: email,
    password: password,
  };

  if (!checkBody(signupInfo, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
  } else {
    Users.findOne({ email: email, password: password })
      .then((foundUser) => {
        if (!foundUser) {
          res.json({ result: false, error: "User not found" });
        } else {
          res.json({ result: true, user: foundUser });
        }
      })
      .catch((error) => console.error(error)); //console logs the error without crashing my server
  }
});
// End of SignIn Router

/***** Delete all Users in Database*****
router.delete("/delete", (req, res) => {
  Users.deleteMany().then((usersList) => {
    if (usersList.deletedCount > 0) {
      res.json({ result: true, user: usersList });
    } else {
      res.json({ result: false, error: "Database already empty" });
    }
  });
});
*****End of Delete*****/

module.exports = router;
