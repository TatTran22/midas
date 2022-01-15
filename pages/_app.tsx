import '~/styles/main.css'
import type { AppProps } from 'next/app'
import { UserContextProvider } from '~/components/UserContext'
import { ThemeContextProvider } from '~/components/ThemeContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </UserContextProvider>
  )
}

export default MyApp
