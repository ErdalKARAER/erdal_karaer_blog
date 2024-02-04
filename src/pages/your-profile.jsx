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
            (user2) => user2.id === session.user.id,
          )

          if (userWithMatchingId) {
            setUser(userWithMatchingId)
          } else {
            //Console.error("User not found")
          }
        } else {
          //Console.error("No user in the database")
        }
      } catch (error) {
        //Console.error("Error fetching user data", error)
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
        //Console.error("Error updating user email:", data.error)
      }
    } catch (error) {
      //Console.error("Error updating user email", error)
    }
  }
  const getCountOfPosts = async () => {
    try {
      const response = await fetch(`/api/products`)

      if (response.ok) {
        await response.json()
      } else {
        //Console.error("Error retrieving products:", response.statusText)
      }
    } catch (error) {
      //Console.error("Error updating user email", error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="container max-w-2xl mx-auto my-8 p-4 bg-[#AA8976] shadow-md rounded-md text-white">
      <h1 className="text-2xl font-bold mb-4">Your Profile</h1>
      <p className="text-white mb-4">Email: {user?.email}</p>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
        onClick={getCountOfPosts}
      >
        Get Post Count
      </button>

      {isEditing ? (
        <form className="mt-4">
          <label className="block text-white">New Email:</label>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="w-full border rounded-md p-2 mt-1 text-black"
          />
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
            onClick={handleEmailChange}
          >
            Save
          </button>
        </form>
      ) : (
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-blue-600"
          onClick={() => setIsEditing(true)}
        >
          Edit Email
        </button>
      )}
    </div>
  )
}

export default YourProfilePage
