import { MyContext } from "../types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/user.entity";
import { COOKIE_NAME } from "../constants";
import { UsernamePasswordInput } from "../dtos";
import { UserResponse } from "../dtos";
import {
  createUser,
  getUserById,
  forgotPassword,
  login,
  changePassword,
} from "../services";

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true }) // this is for graphql
  async me(@Ctx() { req }: MyContext) {
    if (!req.session!.userId) {
      return null;
    }
    return getUserById(req.session!.userId);
  }

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg("email") email: string,
    @Ctx() { redis }: MyContext
  ) {
    return forgotPassword(email, redis);
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const serviceResponse = await createUser(options);

    // store user id session
    // this will set a cookie on the user
    // keep them logged in
    if (serviceResponse.errors) {
      return {
        errors: serviceResponse.errors,
      };
    }

    req.session!.userId = serviceResponse?.user?.id;

    return {
      user: serviceResponse.user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("usernameOrEmail") usernameOrEmail: string,
    @Arg("password") password: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const serviceResponse = await login(usernameOrEmail, password);

    if (serviceResponse.errors) {
      return {
        errors: serviceResponse.errors,
      };
    }

    req.session!.userId = serviceResponse?.user?.id;

    return {
      user: serviceResponse.user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session!.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg("token") token: string, // this is for graphql
    @Arg("newPassword") newPassword: string,
    @Ctx() { redis, req }: MyContext
  ): Promise<UserResponse> {
    const serviceResponse = await changePassword(token, newPassword, redis);

    if (serviceResponse.errors) {
      return {
        errors: serviceResponse.errors,
      };
    }

    // log in user after change password
    req.session!.userId = serviceResponse.user.id;

    return { user: serviceResponse.user };
  }
}
