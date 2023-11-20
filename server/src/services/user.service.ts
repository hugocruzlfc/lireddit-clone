import AppDataSource from "../typeorm-datasource";
import { User } from "../entities";
import { Redis } from "ioredis";
import { v4 } from "uuid";
import { FORGET_PASSWORD_PREFIX } from "../constants";
import { sendEmail, validateRegister } from "../utils";
import argon2 from "argon2";
import { UserResponse, UsernamePasswordInput } from "../dtos";

export class UserService {
  private appDataSource;

  constructor() {
    this.appDataSource = AppDataSource.getRepository(User);
  }

  async getUserById(id: number) {
    try {
      return await this.appDataSource.findOne({
        where: { id },
      });
    } catch (error) {
      console.log(error);
      return null; // Return null in case of an error
    }
  }

  async forgotPassword(email: string, redis: Redis) {
    try {
      const user = await this.appDataSource.findOne({ where: { email } });

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

  async getUsers() {
    try {
      return await this.appDataSource.find();
    } catch (error) {
      console.log(error);
      return []; // Return empty array in case of an error}
    }
  }

  async createUser(options: UsernamePasswordInput): Promise<UserResponse> {
    try {
      const errors = validateRegister(options);

      if (errors) {
        return { errors };
      }

      const hashedPassword = await argon2.hash(options.password);
      const user = User.create({
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

  //   async login(usernameOrEmail: string, password: string) {
  //     const user = await this.appDataSource.findOne({
  //       where: usernameOrEmail.includes("@")
  //         ? { email: usernameOrEmail }
  //         : { username: usernameOrEmail },
  //     });

  //     if (!user) {
  //       return {
  //         errors: [
  //           {
  //             field: "usernameOrEmail",
  //             message: "username doesn't exist",
  //           },
  //         ],
  //       };
  //     }

  //     const valid = await argon2.verify(user.password, password);
  //   }

  async updateUser(
    id: number,
    username: string,
    email: string,
    password: string
  ) {
    try {
      const user = await this.appDataSource.findOne({ where: { id } });
      if (!user) {
        return null;
      }
      if (typeof username !== "undefined") {
        user.username = username;
        await this.appDataSource.update({ id }, { username });
      }
      if (typeof email !== "undefined") {
        user.email = email;
        await this.appDataSource.update({ id }, { email });
      }
      if (typeof password !== "undefined") {
        user.password = password;
        await this.appDataSource.update({ id }, { password });
      }
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async deleteUser(id: number) {
    try {
      const user = await this.appDataSource.findOne({ where: { id } });
      if (!user) {
        return false;
      }
      await this.appDataSource.delete({ id });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}