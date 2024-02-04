import { useSession } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"
import { useRouter } from "next/router"

const MainMenu = ({ children: _, ...otherProps }) => {
  const { session, signOut } = useSession()
  const router = useRouter()
  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <nav {...otherProps}>
      <ul className="flex gap-4">
        <li>
          <Link href="/" styless>
            Home
          </Link>
        </li>
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
