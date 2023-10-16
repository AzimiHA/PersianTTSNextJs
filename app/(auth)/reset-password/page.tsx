"use client";
import React from "react";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";

import Link from 'next/link'

export default function ResetPassword() {
  const [email, setEmail] = React.useState("");

  const router = useRouter();
  async function sendCode() {
    try {
      await Auth.forgotPassword(email);
      router.push(`/change-password?email=${email}`);
    } catch (error) {
      console.log("error sending code", error);
    }
  }

  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 mb-4">Forgot your password?</h1>
            <p className="text-xl text-gray-400">We'll email you instructions on how to reset it.</p>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              sendCode();
            }}
            >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input 
                  id="email" 
                  type="email" 
                  name="email"
                  autoComplete="email"
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val !== "") {
                      setEmail(val);
                    }
                  }}
                  className="form-input w-full text-gray-300" placeholder="you@yourcompany.com" required 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type = "submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Reset Password</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              <Link href="/signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Cancel</Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
