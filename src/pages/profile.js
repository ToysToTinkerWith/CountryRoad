import React, { useState, useEffect, useContext } from "react"

import Head from "next/head"


import { AuthContext } from "../../Firebase/FirebaseAuth"
import { db } from "../../Firebase/FirebaseInit"
import { doc, onSnapshot } from "firebase/firestore";


import Employee from "../components/Profile/Employee"
import Admin from "../components/Profile/Admin"




export default function Profile({products}) {

    const { currentUser } = useContext(AuthContext)

    const [profile, setProfile] = useState(null)
    const [profileId, setProfileId] = useState(null)

    useEffect(() => {

        console.log(currentUser)

        try {

        const docRef = doc(db, "profiles", currentUser.uid);

            const unsub = onSnapshot(docRef, (docSnap) => {
                if (docSnap.exists()) {
                    setProfileId(docSnap.id)
                    setProfile(docSnap.data())
                    
                } else {
                // doc.data() will be undefined in this case
                console.log("Cannot get user");
                
                }
                });

              return unsub
        }

        catch {

        }
        
      }, [currentUser]);


      if (profile) {
          if (profile.access == "admin") {
              return (
                  <>
                  <Head>
                    <title>Admin</title>
                </Head>
                  <Admin profile={profile} profileId={profileId}/>
                  </>

                  
              )
          }
          else if (profile.access == "user") {
              return (
                  <>
                  <Head>
                    <title>Profile</title>
                </Head>
                  <Employee profile={profile} profileId={profileId} />
                  </>
                
              )
          }
          else if (profile.access == "consultant") {
            return (
                <>
                <Head>
                  <title>Consultant</title>
              </Head>
                <Employee user={currentUser} profile={profile} products={products} checkout={checkout} />
                </>
              
            )
        }
      }
      else {
        return (
                <div >
                </div>
            
        )
      }
       
            
}
        

    