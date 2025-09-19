import UserService from "../service/user-service.js";

class UserController {
  async registration(req, res) {
    try {
      const { email, password } = req.body;
      const data = await UserService.registration(email, password);
      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: false,
      });
      return res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const data = await UserService.login(email, password);

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: false,
      });

      return res.status(200).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async logOut(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const token = await UserService.logOut(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async getUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      console.log(allUsers);

      return res.json(allUsers);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  async refresh(req, res) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await UserService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        httpOnly: true,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        sameSite: "lax",
        secure: true,
      });
      return res.status(200).json(userData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
