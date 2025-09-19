import jwt from "jsonwebtoken";
import Token from "../models/token-model.js";

class TokenService {
  generateTokens(payload) {
    const accessToken = jwt.sign({ payload }, process.env.JWT_SECRET_ACCESS, {
      expiresIn: "15s",
    });
    const refreshToken = jwt.sign({ payload }, process.env.JWT_SECRET_REFRESH, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveTokens(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;      
      return tokenData.save();
      
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const tokenData = await Token.deleteOne({ refreshToken });
    return tokenData;
  }

  validateAccessToken(token) {
    try {
      const validToken = jwt.verify(token, process.env.JWT_SECRET_ACCESS);
      return validToken;
    } catch (error) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const validToken = jwt.verify(token, process.env.JWT_SECRET_REFRESH);
      return validToken;
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    const token = await Token.findOne({ refreshToken });
    return token;
  }
}

export default new TokenService();
