'use client'

import { useEffect } from 'react'
import  { Amplify, withSSRContext } from 'aws-amplify';
// Imported from amplify pull
import awsconfig from '../../src/aws-exports';

Amplify.configure({...awsconfig,ssr: true});

// Auth from SSR and not directly from aws-amplify
const { Auth } = withSSRContext();

Auth.configure({
  region: process.env.AUTH_REGION,
  userPoolId: process.env.AUTH_POOL,
  userPoolWebClientId: process.env.AUTH_POOL_CLIENT,
  mandatorySignIn: false,
  // Set this only if you wish to use cookies to storage otherwise ignore it
  cookieStorage: {
    domain: 'localhost',
    // Set true if is a domain with https. For localhost set it to false
    secure: false,
    path: '/',
    expires: 2,
  },
})

import AOS from 'aos'
import 'aos/dist/aos.css'

import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  

  useEffect(() => {
    AOS.init({
      once: true,
      disable: 'phone',
      duration: 600,
      easing: 'ease-out-sine',
    })
  })

  return (
    <>
      <main className="grow">

        <PageIllustration />

        {children}

      </main>

      <Footer />
    </>
  )
}
