import BaseModel from "@/db/models/BaseModel"
import ProductModel from "@/db/models/ProductModel"

class CategoryModel extends BaseModel {
  static tableName = "categories"
  static get relationMappings() {
    return {
      products: {
        modelClass: ProductModel,
        relation: BaseModel.HasManyRelation,
        join: {
          from: "categories.id",
          to: "products.categoryId",
        },
      },
    }
  }
}

export default CategoryModel
