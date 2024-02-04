import "@/styles/globals.css"
import MainMenu from "@/web/components/MainMenu"
import { SessionContextProvider } from "@/web/components/SessionContext"
import Link from "@/web/components/ui/Link"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()
const App = ({ Component: Page, pageProps }) => (
  <div className="bg-[#F0E2D0] min-h-screen">
    <SessionContextProvider>
      <QueryClientProvider client={queryClient}>
        <header className="border-b-2 bg-[#C6EBC9]">
          <div className="max-w-3xl mx-auto flex items-center p-4">
            <h1 className="text-2xl font-semibold">
              <Link href="/" className="text-blue-500 hover:underline"></Link>
            </h1>
            <MainMenu className="ms-auto" />
          </div>
        </header>
        <div className="max-w-3xl mx-auto p-4">
          <Page {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionContextProvider>
  </div>
)

export default App
