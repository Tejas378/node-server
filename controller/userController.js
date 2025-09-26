import { User } from "./../models/user.js";
import { compareHash, generateHash } from "../utils/helper.js";
export const creatUser = async (req, res) => {
  try {
    console.log("iN CREATE ");
    
    const { firstName, lastName, email, contactNumber, password } = req.body;
    console.log(firstName, lastName, email, contactNumber, password);

    let user =false ;// await User.findOne({ email: email })

    console.log(req.body);
    

    if(user)
    res.status(403).json({ isSuccess: false, message:"User with this email already exists.Please enter another email." });

    const hashPassword = await generateHash(password);
    const result = await User.create({ firstName, lastName, email, contactNumber, password: hashPassword });
    res.status(201).json({ isSuccess: true, result });
  } catch (err) {
    res.status(500).json({ isSuccess: false, error: err.message });
  }
};
export const getUsers = async (req, res) => {
  try {
    // const result = await User.find();
    res.status(200).json({ isSuccess: true, user: {"SS":"ss"} });
  } catch (err) {
    res.status(500).json({ isSuccess: false, error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  console.log(email, password);

  let user = await User.findOne({ email: email })
  console.log(user);

  if (user) {
    const checkIsValidPass = await compareHash(password, user?.password);

    if (checkIsValidPass)
      res.status(200).json({ isSuccess: true, data: user })
    else
      res.status(401).json({ isSuccess: false, message: "Email or password do not match" });
  }
  else {
    res.status(404).json({ isSuccess: false, message: "User not found." });
  }
}
