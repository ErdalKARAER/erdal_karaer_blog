/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import { useEffect, useState } from "react"
import { useSession } from "@/web/components/SessionContext"
import { useRouter } from "next/router"

const YourProfilePage = () => {
  const { session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push("/")
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users?id=${session.user.id}`)
        const data = await response.json()

        if (data && data.result && data.result.length > 0) {
          const userWithMatchingId = data.result.find(
            (user) => user.id === session.user.id,
          )

          if (userWithMatchingId) {
            setUser(userWithMatchingId)
          } else {
            console.error("User not found")
          }
        } else {
          console.error("No user in the database")
        }
      } catch (error) {
        console.error("Error fetching user data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleEmailChange = async () => {
    try {
      const response = await fetch(`/api/users`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          email: newEmail,
        }),
      })
      const data = await response.json()

      if (data.result && data.result[0] === true) {
        setUser({ ...user, email: newEmail })
        setIsEditing(false)
      } else {
        console.error("Error updating user email:", data.error)
      }
    } catch (error) {
      console.error("Error updating user email", error)
    }
  }
  const getCountOfPosts = async () => {
    try {
      const response = await fetch(`/api/products`)

      if (response.ok) {
        const data = await response.json()
        console.log("Product data:", data)
      } else {
        console.error("Error retrieving products:", response.statusText)
      }
    } catch (error) {
      console.error("Error updating user email", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div>
      <h1>Your Profile</h1>
      <p>Email: {user.email}</p>
      <button onClick={getCountOfPosts}>oui</button>

      {isEditing ? (
        <div>
          <label>New Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
          <button onClick={handleEmailChange}>Save</button>
        </div>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit Email</button>
      )}
    </div>
  )
}

export default YourProfilePage
