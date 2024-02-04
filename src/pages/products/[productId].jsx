/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
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
            //Console.log(data.result)
          } else {
            //Console.error("Error incrementing views:", data.error)
          }
        }
      } catch (error) {
        //Console.error("Error incrementing views", error)
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

      if (data.result) {
        setPost({ ...post, name: newTitle, description: newDescription })
        setIsEditing(false)
        router.reload()
      } else {
        //Console.error("Error updating title:", data.error)
      }
    } catch (error) {
      //Console.error("Error updating title", error)
    }
  }
  const handleSendComment = async () => {
    try {
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
        // You might want to update the UI or reload the page here
      } else {
        //Console.error("Error submitting comment:", data.error)
      }

      if (data) {
        // Handle successful comment submission
        // You might want to update the UI or reload the page here
      } else {
        //Console.error("Error submitting comment:", data.error)
      }
    } catch (error) {
      //Console.error("Error submitting comment", error)
    }
  }

  if (isLoading) {
    return "Loading..."
  }

  if (product.userId !== "") {
    isOwner = session.user.id === product.result[0].user.id
  }

  return (
    <article className="max-w-2xl mx-auto my-8 p-4 bg-[#AA8976] shadow-md rounded-md text-white">
      {product.id !== "" && (
        <h1 className="text-3xl font-bold mb-4">
          {product.result[0].name} (#{product.result[0].id})
        </h1>
      )}
      {product.description !== "" && (
        <p className="mb-4">{product.result[0].description}</p>
      )}
      {product.views !== "" && (
        <p className="mb-4">Nombre de vues : {product.result[0].views}</p>
      )}
      {product.userId !== "" && (
        <p className="mb-4">Créer par : {product.result[0].user.email}</p>
      )}
      {isOwner && (
        <>
          {isEditing ? (
            <div className="mb-4">
              <label className="block mb-2 text-white">New title:</label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-black"
              />
              <label className="block mb-2 text-white">New description:</label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="w-full border border-gray-300 rounded p-2 text-black"
              />
              <button
                onClick={handlePostChange}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="mb-4">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md"
              >
                Edit post
              </button>
            </div>
          )}
        </>
      )}
      {isCommenting ? (
        <div className="mb-4">
          <label className="block mb-2 text-white">Comment :</label>
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full border border-gray-300 rounded p-2 text-black"
          />
          <button
            onClick={handleSendComment}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsCommenting(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          New comment
        </button>
      )}
    </article>
  )
}

export default ProductPage
