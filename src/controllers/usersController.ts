const db = require("../db");

class UsersController {
  table: string;
  db: any;

  constructor() {
    this.db = db;
    this.table = "users";
  }

  async signUp(user: any) {
    const [id] = await this.db(this.table).insert(user);
    return id;
  }
}

module.exports = new UsersController();