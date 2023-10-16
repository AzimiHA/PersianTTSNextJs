import PageIllustration from '@/components/page-illustration'

import React from "react";
import { Amplify, Auth } from "aws-amplify";
import awsExports from "../../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });
Auth.configure({ ...awsExports, ssr: true });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {  
  return (
    <main className="grow">

      <PageIllustration />

      {children}

    </main>
  )
}
