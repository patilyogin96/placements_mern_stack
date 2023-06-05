const User = require("../../../models/users");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// regisering/creating a user
exports.registerUser = async (req, res, next) => {
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const confirm_password = req.body.password;
  const user_type = req.body.user_type;

  User.findOne({ email: email, phone: phone })
    .then((user) => {
      if (!user) {
        // let hashed_password = await bcrypt.hash(password, 12)

        return bcrypt
          .hash(password, 12)
          .then((hashedPassword) => {
            User.create({
              first_name: first_name,
              last_name: last_name,
              email: email,
              phone: phone,
              password: hashedPassword,
              confirm_password: hashedPassword,
              user_type: user_type,
            })
              .then((user) => {
                let data = {
                  data: "User Created",
                };
                return res.status(201).json(data);
              })
              .catch((err) => {
                return res.status(500).json("User already exists");
              });
          })
          .catch((err) => {});
      }
    })
    .catch((err) => {
      return res.status(500).json(err);
    });

  //   try {
  //     let user = await User.findOne({ email, phone });
  //     if (!user) {
  //       try {
  //         let newUser = await User.create(req.body);
  //         newUser.save();
  //         return res.json(201, newUser);
  //       } catch (error) {
  //         return res.json(400, error);
  //       }
  //     } else {
  //       res.json(200, { message: "User is already registered" });
  //     }
  //   } catch (error) {
  //     return res.json(500, { message: "Internal Server error" });
  //   }
};

// login functionality of a user
exports.loginUser = async (req, res, next) => {
  console.log("ReqBody", req.body);

  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;

  try {
    let user = await User.findOne({ email: email });

    if (user) {
      let truePassword = await bcrypt.compare(password, user.password);
      console.log("MathcingPassword", truePassword);
      if (truePassword) {
        const user_state = {
          _id: user._id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          phone: user.phone,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        };

        let data = {
          message:
            "Sign in successful, here is your token, please keep it safe!",
          data: {
            user_state,
            token: jwt.sign(user.toJSON(), "loginkeys", {
              expiresIn: "100000",
            }),
          },
        };

        return res.status(200).json(data);
      } else {
        return res.status(200).json("Password is not matching");
      }
    } else {
      return res.status(200).json("User does not exists");
    }
  } catch (error) {
    console.log("********", error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }

  // try {
  //   let user = await User.findOne({ email, phone });
  //   if (!user) {
  //     try {
  //       let newUser = await User.create(req.body);
  //       newUser.save();
  //       return res.json(201, newUser);
  //     } catch (error) {
  //       return res.json(400, error);
  //     }
  //   } else {
  //     res.json(200, { message: "User is already registered" });
  //   }
  // } catch (error) {
  //   return res.json(500, { message: "Internal Server error" });
  // }
};
