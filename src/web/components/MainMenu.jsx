/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import { useSession } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const MainMenu = ({ children: _, ...otherProps }) => {
  const { session, signOut } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }
  useEffect(() => {
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
        //
      }
    }

    fetchUser()
  }, [])

  console.log("User:", user)
  console.log("Session:", session)

  return (
    <nav {...otherProps}>
      <ul className="flex gap-4">
        <li>
          <Link href="/" styless>
            Home
          </Link>
        </li>
        {user && user.role === "admin" && (
          <li>
            <Link href="/listUsersAdmin" styless>
              List users
            </Link>
          </li>
        )}
        {session ? (
          <>
            <li>
              <Link href="/products/create" styless>
                Create product
              </Link>
            </li>
            <li>
              <Link href="/your-profile" styless>
                Your profile
              </Link>
            </li>
            <li>
              <button onClick={handleSignOut}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/sign-in" styless>
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/sign-up" styless>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default MainMenu
