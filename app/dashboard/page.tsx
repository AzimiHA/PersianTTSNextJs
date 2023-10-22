import SignOutButton from "../../components/SignOutButton";
import React from "react";;
import AddTask from "../../components/AddTask";

import { headers } from "next/headers";
import { withSSRContext } from "aws-amplify";
import { redirect } from "next/navigation";


async function Dashboard() {
  const req = {
    headers: {
      cookie: headers().get("cookie"),
    },
  };

  const { Auth } = withSSRContext({ req });
  
  try {
    
    //console.log(Auth)
    //<p className="text-center">This is your dashboard, {user.attributes.name}.</p>
    const user = await Auth.currentAuthenticatedUser();
    const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
    //console.log(idToken)

    return (
      <main className="max-w-4xl mx-auto mt-4">
        <div className='text-center my-5 flex flex-col gap-4'>
          <h1 className='text-2xl font-bold'>Persian Text-to-Speech</h1>
          <AddTask />
        </div>
        <div className = "flex flex-col items-center">
          <SignOutButton />
        </div>
        
      </main>
    );
  } catch (error) {
    console.log(error);
    redirect("/signin");
  }
}

export default Dashboard;
