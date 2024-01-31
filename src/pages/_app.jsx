import "@/styles/globals.css"
import MainMenu from "@/web/components/MainMenu"
import { SessionContextProvider } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
const App = ({ Component: Page, pageProps }) => (
  <div>
    <SessionContextProvider>
      <QueryClientProvider client={queryClient}>
        <header className="border-b-2">
          <div className="max-w-3xl mx-auto flex items-center p-4">
            <h1 className="text-2xl">
              <Link href="/" styless>
                BEST WEBSITE E.V.E.R
              </Link>
            </h1>
            <MainMenu className="ms-auto" />
          </div>
        </header>
        <div className="max-w-3xl mx-auto">
          <Page {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionContextProvider>
  </div>
)

export default App
