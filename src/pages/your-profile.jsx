import { useEffect, useState } from "react"

const YourProfilePage = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
    </div>
  )
}

export default YourProfilePage
