import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import TokenService from "./token-service.js";
import UserDto from "../dtos/user-dtos.js";

class UserService {
  async registration(email, password) {
    if (!email) throw new Error("email դաշտը դատարկե լրացրեք");
    if (!password) throw new Error("password դաշտը դատարկե լրացրեք");

    const candidate = await User.findOne({ email });
    if (candidate) {
      throw new Error("այս email ով user կայքում գոյություն ունի");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    const userDto = new UserDto(newUser);
    const tokens = TokenService.generateTokens({ ...userDto });
    await TokenService.saveTokens(userDto.id, tokens.refreshToken);
    return {
      ...tokens,
      user: userDto,
    };
  }
  async login(email, password) {
    if (!email) throw new Error("email դաշտը դատարկե լրացրեք");
    if (!password) throw new Error("password դաշտը դատարկե լրացրեք");

    const candidate = await User.findOne({ email });

    if (!candidate) {
      throw new Error("այսպիսի email ով user կայքում գոյություն չունի ");
    }

    const passwordHashVerify = await bcrypt.compare(
      password,
      candidate.password
    );

    if (!passwordHashVerify) {
      throw new Error(
        `այս - ${password} - ը չի համապատասխանում user ի password ին `
      );
    }

    const userDto = new UserDto(candidate);
    const tokens = await TokenService.generateTokens({ ...userDto });
    await TokenService.saveTokens(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
  async logOut(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }

  async refresh(refreshToken) {
    const userData = TokenService.validateRefreshToken(refreshToken);
    const findToken = await TokenService.findToken(refreshToken);

    if (!userData || !findToken) {
      throw new Error("քո token ը վավեր չե");
    }

    const user = await User.findById(userData.payload.id);
    const userDto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...userDto });

    await TokenService.saveTokens(userData.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

export default new UserService();
