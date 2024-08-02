import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = require("../../config");

function verifyToken(req: Request|any, res: Response, next: NextFunction) {
  const header = req.header("Authorization") || "";
  const token = header.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Token not provied" });
  }
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    req.email = payload.email;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Token not valid" });
  }
}

module.exports = { verifyToken };