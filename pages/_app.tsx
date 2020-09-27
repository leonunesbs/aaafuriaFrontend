import ThemeContainer from '../contexts/Theme/ThemeContainer'
import * as gtag from '../lib/gtag'

import '../styles/CardSectionStyles.css'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

// const stripePromise = loadStripe(
//   'pk_test_51HLxa6H1WKSbV7ewz55Q0G6SZ4dv1VIEyLTUJ6Jn7G7nrOEYNy6FwN02EeNiXLXqfgqTGVcAhORCywvPLa6No83b00Dvsf1xIT'
// )

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    // <Elements stripe={stripePromise}>
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
    //</Elements>
  )
}

export default MyApp
