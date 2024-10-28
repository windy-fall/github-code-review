import '@/styles/globals.css'
import { isMobile } from '@/utils/client'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { use, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

export default function App({ Component, pageProps }: AppProps) {
  const [source, setSource] = useState('pc')

  useEffect(() => {
    if(isMobile()) {
      setSource('mobile')
    } else {
      setSource('pc')
    }
  }, [])

  return <DndProvider backend={source === 'pc' ? HTML5Backend : TouchBackend}>
    <Head>
      <title>少糖，生日快乐！</title>
      
    </Head>
    <Component {...pageProps} />
  </DndProvider>
}
