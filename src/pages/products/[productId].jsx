import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRouter } from "next/router"

const ProductPage = () => {
  const {
    query: { productId },
  } = useRouter()
  const {
    isLoading,
    data: { data: product },
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => axios(`/api/products/${productId}`),
    enabled: Boolean(productId),
    initialData: { data: { name: "", id: "", description: "", userId: "" } },
  })

  if (isLoading) {
    return "Loading..."
  }

  return (
    <article>
      {product.id !== "" && (
        <h1 className="text-2xl">
          {product.result[0].name} (#{product.result[0].id})
        </h1>
      )}
      {product.description !== "" && <p>{product.result[0].description}</p>}
      {product.userId !== "" && <p>Créer par : {product.result[0].user.email}</p>}
    </article>
  )
}

export default ProductPage
