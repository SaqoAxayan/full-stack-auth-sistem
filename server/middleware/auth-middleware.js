import TokenService from "../service/token-service.js";

const authMiddleware = function (req, res, next) {
  try {
    const headersData = req.headers.authorization;

    if (!headersData) {
      return res.status(401).json("դզեր access տոկեն ը բացակայում է");
    }

    const accessToken = headersData.split(" ")[1];

    if (!accessToken) {
      return res.status(401).json("դզեր access տոկեն ը բացակայում է");
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if (!userData) {
      return res.status(401).json("դզեր access տոկեն ը բացակայում է");
    }

    req.user = userData;    
    next();
  } catch (error) {
    return res
      .status(500)
      .json(`տեղի ունեցավ սեռվեռի խնդիր - ${error.message}`);
  }
};

export default authMiddleware;
