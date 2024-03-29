/* eslint-disable max-lines-per-function */
import { useEffect, useState } from "react"

const YourProfilePage = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [isDisable, setIsDisable] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users`)
        const data = await response.json()

        if (data && data.result && data.result.length > 0) {
          setUsers(data.result)
        }
      } catch (error) {
        //Console.error("Error fetching user data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      })

      if (response.ok) {
        // If the deletion is successful, update the users state
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId))
      } else {
        //Console.error(`Error deleting user with ID ${userId}:`, response.statusText)
      }
    } catch (error) {
      //Console.error(`Error deleting user with ID ${userId}:`, error)
    }
  }
  const handleBlockUser = async (userId) => {
    try {
      // Find the user with the matching ID in the local state
      const userWithMatchingId = users.find((user) => user.id === userId)

      userWithMatchingId.disable = !userWithMatchingId.disable

      const updateResponse = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userWithMatchingId.id,
          email: userWithMatchingId.email,
          disable: Boolean(userWithMatchingId.disable),
        }),
      })

      if (updateResponse.ok) {
        setIsDisable(true)
      } else {
        //Console.error(`Error updating user with ID ${userId}:`, updateResponse.statusText)
      }
    } catch (error) {
      //Console.error(`Error updating user with ID ${userId}:`, error)
    }
  }
  const handleEditUser = () => {
    //SUUUUUUUUUUUUUUUU
    //Console.log("Editing user with ID:", userId)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container max-w-2xl mx-auto my-8 p-4 bg-[#AA8976] shadow-md rounded-md text-white">
      {isDisable && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          User blocked/unblocked successfully.
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4">All Users:</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="border-b border-gray-200 flex items-center justify-between p-2"
          >
            <span className="mr-2">{user.email}</span>
            <div>
              <button
                className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleEditUser()}
              >
                ✏️
              </button>
              <button
                className={`${
                  user.disable ? "bg-green-500" : "bg-red-500"
                } hover:bg-red-700 text-white font-bold py-2 px-4 rounded`}
                onClick={() => handleBlockUser(user.id)}
              >
                {user.disable ? "✅" : "🚫"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleDeleteUser(user.id)}
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default YourProfilePage
