/* eslint-disable no-shadow */
/* eslint-disable no-console */
/* eslint-disable max-lines-per-function */
import { useSession } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const MainMenu = ({ children: _ }) => {
  const { session, signOut } = useSession()
  const router = useRouter()
  const [user, setUser] = useState(null)
  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }
  useEffect(() => {
    const fetchUser = async () => {
      if (!session || !session.user) {
        return
      }

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
      }
    }

    fetchUser()
  }, [session])

  console.log("User:", user)
  console.log("Session:", session)

  return (
    <nav className="bg-[#AA8976] p-4 shadow-md rounded-md">
      <ul className="flex gap-4">
        <li>
          <Link href="/" className="text-white">
            Home
          </Link>
        </li>
        {user && user.role === "admin" && (
          <li>
            <Link href="/listUsersAdmin" className="text-white">
              List users
            </Link>
          </li>
        )}
        {session ? (
          <>
            <li>
              <Link href="/products/create" className="text-white">
                Create product
              </Link>
            </li>
            <li>
              <Link href="/your-profile" className="text-white">
                Your profile
              </Link>
            </li>
            <li>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/sign-in" className="text-white">
                Sign in
              </Link>
            </li>
            <li>
              <Link href="/sign-up" className="text-white">
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
