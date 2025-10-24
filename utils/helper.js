import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
const saltRounds = 10;
dotenv.config({ path: "../config/config.env" });

export const generateHash = async (plainPassword) => {

    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(plainPassword, salt);
    console.log(hash);
    return hash;
}
export const compareHash = async (plainPassword, hashedPass) => {
    const hash = bcrypt.compareSync(plainPassword, hashedPass);
    return hash;
}

export const generateJwtToken = (userData) => {
    dotenv.config({ path: "../config/config.env" });
    const jwtToken = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: 60 * 60 })
    return jwtToken

}
export const verifyJwtToken = (token) => {
    dotenv.config({ path: "../config/config.env" });
    const jwtToken = jwt.verify(token, process.env.JWT_SECRET)
    console.log(jwtToken);

}