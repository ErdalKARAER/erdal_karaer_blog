import BaseModel from "@/db/models/BaseModel"

class UserModel extends BaseModel {
  static tableName = "users"
}

export default UserModel
