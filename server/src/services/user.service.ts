import { Redis } from "ioredis";
import { v4 } from "uuid";
import { FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail, validateRegister } from "../utils";
import argon2 from "argon2";
import { UserResponse, UsernamePasswordInput } from "../dtos";
import { userRepository } from "../repositories";

export async function getUserById(id: number) {
  try {
    return await userRepository.findOne({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    return null; // Return null in case of an error
  }
}

export async function forgotPassword(email: string, redis: Redis) {
  try {
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      // the email is not in the db
      return false;
    }

    const token = v4();

    await redis.set(
      FORGET_PASSWORD_PREFIX + token,
      user.id,
      "EX",
      1000 * 60 * 60 * 24 * 3
    ); // 3 days;
    await sendEmail(
      email,
      `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function getUsers() {
  try {
    return await userRepository.find();
  } catch (error) {
    console.log(error);
    return []; // Return empty array in case of an error}
  }
}

export async function createUser(
  options: UsernamePasswordInput
): Promise<UserResponse> {
  try {
    const errors = validateRegister(options);

    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    const user = userRepository.create({
      username: options.username,
      email: options.email,
      password: hashedPassword,
    });

    await user.save(); // equivalent to await em.persistAndFlush(user) in mikro-orm

    return { user };
  } catch (error) {
    // || error.detail.includes("already exists"))
    // duplicate username error
    //if (error.code === "23505")
    if (error.detail.includes("already exists")) {
      return {
        errors: [
          {
            field: "username",
            message: "username already taken",
          },
        ],
      };
    } else {
      console.log(error);
      return {
        errors: [
          {
            field: "username",
            message: "server error",
          },
        ],
      };
    }
  }
}

export async function login(
  usernameOrEmail: string,
  password: string
): Promise<UserResponse> {
  try {
    const user = await userRepository.findOne({
      where: usernameOrEmail.includes("@")
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    });

    if (!user) {
      return {
        errors: [
          {
            field: "usernameOrEmail",
            message: "username doesn't exist",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }
    return { user };
  } catch (error) {
    console.log(error);
    return {
      errors: [
        {
          field: "username",
          message: "server error",
        },
      ],
    };
  }
}

export async function updateUser(
  id: number,
  username: string,
  email: string,
  password: string
) {
  try {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    if (typeof username !== "undefined") {
      user.username = username;
      await userRepository.update({ id }, { username });
    }
    if (typeof email !== "undefined") {
      user.email = email;
      await userRepository.update({ id }, { email });
    }
    if (typeof password !== "undefined") {
      user.password = password;
      await userRepository.update({ id }, { password });
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteUser(id: number) {
  try {
    const user = await userRepository.findOne({ where: { id } });
    if (!user) {
      return false;
    }
    await userRepository.delete({ id });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function changePassword(
  token: string,
  newPassword: string,
  redis: Redis
) {
  try {
    if (newPassword.length <= 2) {
      return {
        errors: [
          {
            field: "newPassword",
            message: "length must be greater than 2",
          },
        ],
      };
    }

    const redisKey = FORGET_PASSWORD_PREFIX + token;
    const userId = await redis.get(redisKey);

    if (!userId) {
      return {
        errors: [
          {
            field: "token",
            message: "token expired",
          },
        ],
      };
    }

    const userIdNum = parseInt(userId);
    const user = await userRepository.findOne({ where: { id: userIdNum } });

    if (!user) {
      return {
        errors: [
          {
            field: "token",
            message: "user no longer exists",
          },
        ],
      };
    }

    user.password = await argon2.hash(newPassword);
    await userRepository.update({ id: userIdNum }, { password: user.password });

    // remove token from redis
    await redis.del(redisKey);

    return { user };
  } catch (error) {
    console.log(error);
    return {
      errors: [
        {
          field: "token",
          message: "server error",
        },
      ],
    };
  }
}
