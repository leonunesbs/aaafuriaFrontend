import ThemeContainer from '../contexts/Theme/ThemeContainer'
import '../styles/CardSectionStyles.css'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

// const stripePromise = loadStripe(
//   'pk_test_51HLxa6H1WKSbV7ewz55Q0G6SZ4dv1VIEyLTUJ6Jn7G7nrOEYNy6FwN02EeNiXLXqfgqTGVcAhORCywvPLa6No83b00Dvsf1xIT'
// )

function MyApp({ Component, pageProps }) {
  return (
    // <Elements stripe={stripePromise}>
    <ThemeContainer>
      <Component {...pageProps} />
    </ThemeContainer>
    //</Elements>
  )
}

export default MyApp
