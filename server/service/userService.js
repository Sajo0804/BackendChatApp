import bcrypt from "bcrypt"
import User from "../models/userModel.js";

export async function fetchAllUsers () {
    const allUsers = await User.find({}, {"username": 1})
    return allUsers;
}

export async function loginUser (username, password) {
    // Check if username already exist in database
    const user = await User.findOne({ username });

    if (!user) {
        return ({ msg: "Username doesnt exist", status: false })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        return ({ msg: "Password doesnt exist", status: false })
    }

      // Delete user password
    delete user.password;
    return ({ status: true, user });
}

export async function createUser (username, password) {
    // Check if username already exist in database
    const usernameExist = await User.findOne({ username });

    if (usernameExist) {
        return ({ msg: "Username already used", status: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database with req values
    const user = await User.create({
        username,
        password: hashedPassword,
    });

    // Delete user password
    delete user.password;
    return ({ status: true, user });
}