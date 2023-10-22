"use client";
import { Auth } from "aws-amplify";
import { useRouter } from "next/navigation";
import React from "react";
import { Amplify} from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });
Auth.configure({ ...awsExports, ssr: true });

function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={async (e) => {
        try {
          await Auth.signOut().then(() => {router.refresh()});
          console.log("Signout Complete")
          router.push("/");
        } catch (error) {
          console.log("error signing out: ", error);
        }
      }}
    >
      Sign out
    </button>
  );
}
export default SignOutButton;
