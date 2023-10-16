"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";

import { Amplify} from "aws-amplify";
import awsExports from "../../../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });
Auth.configure({ ...awsExports, ssr: true });

function ChangePassword() {
  const [pass, setPass] = React.useState({
    code: "",
    password: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();


  async function changePassword() {
    const email = searchParams.get("email");
    try {
      await Auth.forgotPasswordSubmit(email, pass.code, pass.password);
      router.push("/signin");
    } catch (error) {
      console.log("error changing password", error);
    }
  }
  
  return (
    <section className="relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1">Change Password</h1>
          </div>

          {/* Form */}
          <div className="max-w-sm mx-auto">
            
            <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              changePassword();
            }}
            >
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Verification code</label>
                  <input 
                    id="code"
                    name="code"
                    type="text"
                    autoComplete="code"
                    required
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val !== "") {
                        setPass({ ...pass, code: val });
                      }
                    }}
                    className="form-input w-full text-gray-300"
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password"> New Password</label>
                  <input 
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val !== "") {
                      setPass({ ...pass, password: val });
                    }
                  }}
                  className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" 
                  />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button type="submit" className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Change Password</button>
                </div>
              </div>
            </form>
            <div className="text-gray-400 text-center mt-6">
              No Luck? <a href="/reset-password" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Try again.</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
