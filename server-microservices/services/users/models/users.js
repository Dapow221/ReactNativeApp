const { getDb } = require("../config/mongo");
const { ObjectId } = require("mongodb");

class User {
  static async connectionToDb() {
    try {
      const collection = getDb().collection("users");
      return collection;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async createUser(payload) {
    try {
      const collection = await this.connectionToDb();
      const result = await collection.insertOne(payload);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findAll() {
    try {
      const collection = await this.connectionToDb();
      const result = await collection.find().toArray();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async findByPk(id) {
    try {
      const collection = await this.connectionToDb();
      const result = await collection.findOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteUser(id) {
    try {
      const collection = await this.connectionToDb();
      const result = await collection.deleteOne({ _id: new ObjectId(id) });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = User;
