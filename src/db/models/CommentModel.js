import BaseModel from "@/db/models/BaseModel"
import UserModel from "@/db/models/UserModel"
import ProductModel from "@/db/models/ProductModel"

class CommentModel extends BaseModel {
  static tableName = "comments"
  static get relationMappings() {
    return {
      product: {
        modelClass: ProductModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "comments.postId",
          to: "products.id",
        },
      },
      user: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "comments.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default CommentModel
