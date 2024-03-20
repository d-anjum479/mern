import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashedPass = await bcrypt.hash(password, saltRound);
    return hashedPass;
  } catch (error) {
    console.log(`Error in hashing password - ${error}`);
  }
};

export const comparePassword = async (userPass, dbHashedPass) => {
  return await bcrypt.compare(userPass, dbHashedPass);
};
