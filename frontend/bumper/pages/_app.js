import '../styles/globals.css'
import '../styles/navbar.css'
import '../styles/mainPage.css'
import '../styles/footer.css'
import '../styles/catalog.css'
import '../styles/cart.css'
import '../styles/404.css'
import car from '../public/Images/car.gif'
import Head from 'next/head'
import { Fragment,useState } from 'react'
import Router from 'next/router';
import favicon from '../public/favicon.ico'


function MyApp({ Component, pageProps }) {

const [loading,setloading] = useState(false)
Router.events.on('routeChangeStart', () => setloading(true)); 
Router.events.on('routeChangeComplete', () => setloading(false)); 


  return (
    
  <Fragment>
      <Head>
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
  <link rel="shortcut icon" href={favicon} type="image/x-icon" />
  </Head>
   {loading ? <div className="loader-bg "><img className="loader" src={car} /></div> : null}
   
    <Component {...pageProps} />
    </Fragment>
    )
}

export default MyApp
