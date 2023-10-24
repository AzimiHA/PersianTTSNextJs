"use client";
import { Auth } from "aws-amplify";
import React, { useState } from 'react';


import { Amplify} from "aws-amplify";
import awsExports from "../src/aws-exports";
Amplify.configure({ ...awsExports, ssr: true });
Auth.configure({ ...awsExports, ssr: true });

function AddTask() {
  
  const [url, seturl] = useState('');

  const defMessage = "سلام حال شما خوبه"

  const [message, setMessage] = React.useState({
    message: defMessage,
  });

  
  async function testaudio() {

    try {
      const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
      const headers = {
        'Authorization': `Bearer ${idToken}`,
      };
      var fetch_url = "https://o6uj2pzz27.execute-api.us-east-2.amazonaws.com/prod/audio2?question=\""
      fetch_url = fetch_url + message.message + "\""
      console.log(fetch_url)
      const response = await fetch(fetch_url,
      {
          method: "GET",
          headers:headers,
      });
        const res = await response.json()
        const url = res.url
        seturl(url)

      } catch (error) {
        console.log("error fetching request", error);
    }
    
  }

  
  return (
    <div>
      <div>
        <label>
            <textarea id="textarea" 
            defaultValue = {defMessage}
            rows={4} cols={40} 
            onChange={(e) => {
              const val = e.target.value;
              if (val !== "") {
                setMessage({message:val});
              }
            }}
            />
        </label>
      </div>
      <div>
        <button
          type="button"
          className="rounded-md bg-indigo-600 w-full py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={async (e) => {
            testaudio();
          }}
        >
          Convert Text
        </button>
      </div>
      <div>
        <figure>
            <figcaption>Listen to the Audio:</figcaption>
            <audio controls src={url} className="w-full">
              <a href='https://easyupload.io/c9aqhq'> Download audio </a>
            </audio>
        </figure>
      </div>
      
      
    </div>
  );
}
export default AddTask;