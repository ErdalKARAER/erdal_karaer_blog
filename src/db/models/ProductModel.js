// eslint-disable-next-line max-classes-per-file
import BaseModel from "@/db/models/BaseModel"
import CategoryModel from "@/db/models/CategoryModel"
import UserModel from "@/db/models/UserModel"

class ProductModel extends BaseModel {
  static tableName = "products"
  static get relationMappings() {
    return {
      category: {
        modelClass: CategoryModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "products.categoryId",
          to: "categories.id",
        },
      },
      user: {
        modelClass: UserModel,
        relation: BaseModel.BelongsToOneRelation,
        join: {
          from: "products.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default ProductModel
