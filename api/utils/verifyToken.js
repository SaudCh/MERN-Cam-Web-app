import jwt from "jsonwebtoken";
import { createError } from "../utils/error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token === "") {
    console.log(req.cookies);
    res.status(403).json({ status: "failed", data: [], error: "unauthorized" });
  }
  // console.log(req.method);
  let userData = jwt.verify(token, process.env.JWT, (err, user) => {
    if (err)
      // return next(createError(403, "Token is not valid!"));
      res
        .status(403)
        .json({ status: "failed", data: [], error: "Token is not valid!" });
    return user;
  });
  // console.log(userData);

  if ((req.method === "DELETE" || req.method === "PUT") && !userData.isAdmin) {
    res.status(403).json({ status: "failed", data: [], error: "not admin" });
  } else {
    next();
  }
};
