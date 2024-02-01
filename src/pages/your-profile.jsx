/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import { useEffect, useState } from "react"

const YourProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [newEmail, setNewEmail] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Fetch user data from the GET API
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users?page=1`)
        const data = await response.json()

        if (data && data.result && data.result[0]) {
          setUser(data.result[0])
        }
      } catch (error) {
        //eslint-disable-next-line
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
