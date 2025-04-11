const bcrypt = require("bcryptjs");

class Userhash {
  static async hashPassword(passwordOrUser) {
    let password;
    if (typeof passwordOrUser === "object") {
      if (passwordOrUser.changed("password")) {
        password = passwordOrUser.password;
      } else {
        throw new Error("User password is not set or unchanged.");
      }
    } else if (typeof passwordOrUser === "string") {
      password = passwordOrUser;
    } else {
      throw new Error("Invalid password input.");
    }

    if (typeof password === "string" && password.trim() !== "") {
      return await bcrypt.hash(password, 10);
    } else {
      throw new Error("Invalid password: Password must be a non-empty string.");
    }
  }

  static async comparePassword(plainPassword, hashedPassword) {
    if (!hashedPassword) {
      throw new Error("Hashed password is not set.");
    }
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = Userhash;
