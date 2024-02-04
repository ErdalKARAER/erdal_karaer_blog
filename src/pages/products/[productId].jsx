/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-console */
import { useQuery } from "@tanstack/react-query"
import { useState, useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import { useSession } from "@/web/components/SessionContext"

const ProductPage = () => {
  let isOwner = false
  const router = useRouter()
  const { session } = useSession()
  const [isEditing, setIsEditing] = useState(false)
  const [isCommenting, setIsCommenting] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newComment, setNewComment] = useState("")
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
    initialData: {
      data: { name: "", id: "", description: "", userId: "", views: "" },
    },
  })
  useEffect(() => {
    const incrementProductViews = async () => {
      try {
        if (productId && !isEditing && product.views !== "") {
          const response = await fetch(`/api/products/${productId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              views: product.result[0].views + 1,
            }),
          })
          const data = await response.json()

          if (data.result) {
            console.log(data.result)
          } else {
            console.error("Error incrementing views:", data.error)
          }
        }
      } catch (error) {
        console.error("Error incrementing views", error)
      }
    }

    incrementProductViews()
  }, [productId, isEditing])
  const handlePostChange = async () => {
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
  const handleSendComment = async () => {
    try {
      console.log(newComment)
      console.log(productId)
      console.log(session.user.id)
      const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: newComment,
          postId: productId,
          userId: session.user.id,
        }),
      })
      const data = await response.json()

      if (response.status === 200) {
        // Handle successful comment submission
        console.log("Comment submitted successfully!")
        // You might want to update the UI or reload the page here
      } else {
        console.error("Error submitting comment:", data.error)
      }

      if (response.ok) {
        console.log("Comment submitted successfully!")
      } else {
        console.error("Error submitting comment:", data.error)
      }
    } catch (error) {
      console.error("Error submitting comment:", error)
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
      {product.views !== "" && (
        <p>Nombre de vues : {product.result[0].views}</p>
      )}
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
            <button onClick={handlePostChange}>Save</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setIsEditing(true)}>Edit post</button>
          </div>
        ))}
      {isCommenting ? (
        <div>
          <label>Comment :</label>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleSendComment}>Save</button>
        </div>
      ) : (
        <button onClick={() => setIsCommenting(true)}>New comment</button>
      )}
    </article>
  )
}

export default ProductPage
