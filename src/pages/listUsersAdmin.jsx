/* eslint-disable no-shadow */
/* eslint-disable no-console */
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
        console.log("User data:", data)

        if (data && data.result && data.result.length > 0) {
          setUsers(data.result)
        }
      } catch (error) {
        console.error("Error fetching user data", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  const handleDeleteUser = async (userId) => {
    try {
      console.log("Deleting user with ID:", userId)
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
        console.log(`User with ID ${userId} deleted successfully.`)
      } else {
        console.error(
          `Error deleting user with ID ${userId}:`,
          response.statusText,
        )
      }
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error)
    }
  }
  const handleBlockUser = async (userId) => {
    try {
      console.log("Blocking user with ID:", userId)

      // Fetch user data
      const response = await fetch(`/api/users/`)
      const data = await response.json()

      if (data && data.result && data.result.length > 0) {
        // Find the user with the matching ID
        const userWithMatchingId = data.result.find(
          (user) => user.id === userId,
        )

        console.log("User with matching ID:", userWithMatchingId.disable)

        userWithMatchingId.disable = !userWithMatchingId.disable

        console.log("User:", userWithMatchingId)

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
          console.log(`User with ID ${userId} blocked/unblocked successfully.`)
          setIsDisable(true)
        } else {
          console.error(
            `Error updating user with ID ${userId}:`,
            updateResponse.statusText,
          )
        }
      }
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error)
    }
  }
  const handleEditUser = (userId) => {
    //SUUUUUUUUUUUUUUUU
    console.log("Editing user with ID:", userId)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isDisable && <div>User blocked/unblocked successfully.</div>}
      <h2>All Users:</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.email}
            <button onClick={() => handleEditUser(user.id)}>✏️</button>
            <button onClick={() => handleBlockUser(user.id)}>🚫</button>
            <button onClick={() => handleDeleteUser(user.id)}>🗑️</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default YourProfilePage
