'use client';
import Link from 'next/link'
import React from "react";

import { Amplify, Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import awsconfig from '../../../src/aws-exports';
Amplify.configure(awsconfig);

export default function SignUp() {
  const [user, setUser] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  async function signUp() {
    try {
      const auth = await Auth.signUp({
        username: user.email,
        password: user.password,
        attributes: {
          name: user.name,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      console.log(auth);
      router.push(`/confirm-email?email=${user.email}`);
    } catch (error) {
      console.log("error signing up:", error);
    }
  }
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Welcome. We exist to make entrepreneurship easier.</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form 
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                console.log(user);
                signUp();
              }}
            > 
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Full Name <span className="text-red-600">*</span></label>
                  <input 
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val !== "") {
                        setUser({ ...user, name: val });
                      }
                    }} id="name" type="name" className="form-input w-full text-gray-300" placeholder="Enter your name" required 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                  <input 
                    autoComplete="email"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val !== "") {
                        setUser({ ...user, email: val });
                      }
                    }}
                    id="email" type="email" className="form-input w-full text-gray-300" placeholder="Enter your email" required 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                  <input 
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
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              Already have an account? <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
