import { DefaultSeo } from 'next-seo'
import { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Router from 'next/router'
import NProgress from 'nprogress'
import { MoralisProvider } from 'react-moralis'
import { env } from 'shared/environment'
import { Layout } from '../components/layout/Layout'
import GlobalStyles from '../styles/GlobalStyles'


// Router Loading Animation with @tanem/react-nprogress
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

// Snow Animation
const Snowfall = dynamic(() => import('react-snowfall'), { ssr: false })


const App = ({ Component, pageProps }: AppProps) => (
  <>
    <DefaultSeo
      dangerouslySetAllPagesToNoFollow={true} // TODO
      dangerouslySetAllPagesToNoIndex={true} // TODO
      defaultTitle='NFTMas on Avalanche'
    />

    <Head>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      {/* Favicon */}
      <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
      <link rel="manifest" href="/favicons/site.webmanifest" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#ba3e49" />
      <link rel="shortcut icon" href="/favicons/favicon.ico" />
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
      <meta name="theme-color" content="#ffffff" />
    </Head>

    <GlobalStyles />

    <MoralisProvider appId={env.moralis.appId!} serverUrl={env.moralis.serverUrl!}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </MoralisProvider>

    <Snowfall
      color="white"
      snowflakeCount={200}
      speed={[0, 2]}
      wind={[-1, 1]}
      radius={[0.5, 2]}
    />
  </>
)

export default App
