import { User } from './../models/Users';
import db from "../db";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sendEmail = require("../tools/emailHelper");
const { SECRET_KEY, EXPIRE_IN } = require("../config");

class UsersController {
  table: string;
  db: any;

  constructor() {
    this.db = db;
    this.table = "users";
  }

  async signUp(user: User): Promise<{ token: string } | string> {
    const password = await bcrypt.hash(user.password, 10);
    const [id] = await this.db(this.table).insert({
      ...user,
      password,
    });

    const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: EXPIRE_IN });

    return { token };
  }

  async checkUser(email: string, password: string): Promise<User | null> {
    const user = await this.db(this.table).where({ email }).first();

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      return null;
    }

    return user;
  }

  async verifyToken(header: string): Promise<User | boolean> {
    const token = header.split(" ")[1];
    if (!token) {
      return false;
    }
    try {
      const payload = jwt.verify(token, SECRET_KEY);
      return payload;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async recover(email: string): Promise<boolean | null> {
    const user: User = await this.db(this.table).where({ email }).first();

    if (!user) {
      return null;
    }

    const newPassword = Math.random().toString(36).substring(7);
    const password = await bcrypt.hash(newPassword, 10);

    await this.db(this.table).where({ email }).update({ password });

    try {
      await sendEmail(newPassword, email);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

module.exports = new UsersController();