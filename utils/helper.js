import bcrypt from "bcrypt"
const saltRounds = 10;
export const generateHash = async (plainPassword) => {

    const salt = await bcrypt.genSaltSync(saltRounds);
    const hash = await bcrypt.hashSync(plainPassword, salt);
    console.log(hash);
    return hash;
}
export const compareHash = async (plainPassword,hashedPass) => {
    const hash =  bcrypt.compareSync(plainPassword, hashedPass);
    return hash;
}