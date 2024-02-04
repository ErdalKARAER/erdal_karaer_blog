/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { useSession } from "@/web/components/SessionContext"

const ProductPage = () => {
  let isOwner = false
  const router = useRouter()
  const { session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [post, setPost] = useState(null)
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
  const handleEmailChange = async () => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newTitle,
          description: newDescription,
        }),
      })
      const data = await response.json()

      console.log(data)
      console.log(productId)

      if (data.result) {
        setPost({ ...post, name: newTitle, description: newDescription })
        setIsEditing(false)
        router.reload()
      } else {
        console.error("Error updating title:", data.error)
      }
    } catch (error) {
      console.error("Error updating title", error)
    }
  }

  if (isLoading) {
    return "Loading..."
  }

  if (product.userId !== "") {
    isOwner = session.user.id === product.result[0].user.id
  }

  return (
    <article>
      {product.id !== "" && (
        <h1 className="text-2xl">
          {product.result[0].name} (#{product.result[0].id})
        </h1>
      )}
      {product.description !== "" && <p>{product.result[0].description}</p>}
      {product.userId !== "" && (
        <p>Créer par : {product.result[0].user.email}</p>
      )}
      {isOwner &&
        (isEditing ? (
          <div>
            <label>New title:</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <label>New description:</label>
            <input
              type="text"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
            <button onClick={handleEmailChange}>Save</button>
          </div>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit post</button>
        ))}
    </article>
  )
}

export default ProductPage
