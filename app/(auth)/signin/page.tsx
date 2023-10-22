"use client";
import React from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";

import { Amplify} from "aws-amplify";
import awsExports from "../../../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });
Auth.configure({ ...awsExports, ssr: true });

import Link from 'next/link'


export default function SignIn() {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();

  async function signIn() {
    setIsLoading(true);
    try {
      const auth = await Auth.signIn({
         username: user.email,
        password: user.password,
      });
      router.refresh();
      router.push(`/dashboard`);
    } catch (error) {
      setIsLoading(false);
      console.log("error signing in:", error);
    }
  }

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome back. We exist to make entrepreneurship easier.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            
            <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              //console.log(user);
              signIn();
            }}
            >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input 
                    id="email" 
                    name="email"
                    autoComplete="email"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val !== "") {
                        setUser({ ...user, email: val });
                      }
                    }}
                    type="email" className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password</label>
                  <input 
                  name="password"
                  autoComplete="current-password"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val !== "") {
                      setUser({ ...user, password: val });
                    }
                  }}
                  id="password" type="password" className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="flex items-center">
                      <input type="checkbox" className="form-checkbox" />
                      <span className="text-gray-400 ml-2">Keep me signed in</span>
                    </label>
                    <Link href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Forgot Password?</Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                  {isLoading ? (
                    <div role="status">
                      <svg aria-hidden="true" className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                    ) : (
                      "Sign In"
                    )}
                  </button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Don’t you have an account? <Link href="/auth/signup" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign up</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
