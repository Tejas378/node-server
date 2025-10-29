import User from "./../models/user.js";
import { compareHash, generateHash, generateJwtToken, verifyJwtToken } from "../utils/helper.js";
import { profileSchema, signupSchema } from "../validastors/profileValidator.js";
import { logErrorToFile } from "../utils/logger.js";



export const creatUser = async (req, res) => {
  try {

    const { firstname, lastname, email, contactno, password } = req.body;
    // Find user
    const user = await User.findOne({ email });
    if (user)
      res.status(403).json({ isSuccess: false, message: "User with this email already exists.Please enter another email." });

    const { error: signupdataErrors } = signupSchema.validateAsync({ firstname, lastname, email, contactno, password }, { abortEarly: false })
    const errors = [];
    if (signupdataErrors) errors.push(...signupdataErrors.details.map(e => e.message));
    if (errors.length > 0) {
      return res.status(400).json({ isSuccess: false, message: errors.join(",") }); // Send all errors at once
    }
    const hashPassword = await generateHash(password);
    const result = await User.create({ firstname, lastname, email, contactno, password: hashPassword });
    const payload = { id: result._id, firstname, lastname, email, contactno };
    const accessToken = await generateJwtToken(payload);
    res.status(201).json({ isSuccess: true, data: payload, token: accessToken });
  } catch (err) {
    logErrorToFile(err,"Test")
    res.status(500).json({ isSuccess: false, error: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json({ isSuccess: true, user: result });
  } catch (err) {
    res.status(500).json({ isSuccess: false, error: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        isSuccess: false,
        message: "User not found."
      });
    }

    // Check password
    const checkIsValidPass = await compareHash(password, user.password);
    if (!checkIsValidPass) {
      return res.status(401).json({
        isSuccess: false,
        message: "Email or password do not match."
      });
    }

    // Prepare payload
    const payload = {
      email: user.email,
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      contactno: user.contactno,
    };

    // Send response
    return res.status(200).json({
      isSuccess: true,
      data: payload,
      token: generateJwtToken(payload)
    });



  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error"
    });
  }
};


export const updateProfile = async (req, res) => {
  try {
    const { email, firstname, lastname, contactno } = req.body;

    // Find existing user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Validate profile with abortEarly: false
    const { error: profileError } = profileSchema.validate(
      { firstname, lastname, email, contactno },
      { abortEarly: false }
    );

    // Validate address with abortEarly: false
    // const { error: addressError } = addressSchema.validate(
    //   { street, city, state, pinCode },
    //   { abortEarly: false }
    // );

    // Collect all errors
    const errors = [];
    if (profileError) errors.push(...profileError.details.map(e => e.message));
    // if (addressError) errors.push(...addressError.details.map(e => e.message));

    if (errors.length > 0) {
      return res.status(400).json({ isSuccess: false, message: errors.join(",") }); // Send all errors at once
    }

    // Update nested objects
    user.firstname = firstname;
    user.lastname = lastname;
    user.contactno = contactno;
    user.email = email;
    // user.street = street || "";
    // user.city = city || "";
    // user.state = state || "";
    // user.pinCode = pinCode || "";

    await user.save();
    return res.status(200).json({
      isSuccess: true,
      data: {
        email: user.email,
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        contactno: user.contactno
      },
      message: "Profile updated successfully."

    });

  } catch (err) {
    console.error("Error occured", err);
    return res.status(500).json({ isSuccess: false, error: "Server error" });
  }
};