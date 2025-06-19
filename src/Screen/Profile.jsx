import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";
import app from "./../firebase";
import { useState, useEffect } from "react";

const auth = getAuth(app);
const db = getDatabase(app);

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = ref(db, "users/" + user.uid);
          const snapshot = await get(userRef);
          if (snapshot.exists()) {
            const data = snapshot.val();
            setUserInfo({
              name: data.fullName,
              email: data.email,
            });
          } else {
            console.log("No user data found in database");
          }
        } catch (err) {
          console.error("Error fetching user data:", err.message);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-8 box-border">
      <div className="bg-white p-4">
        <p className="text-[18px] font-regular">Account Settings</p>
      </div>
      <div className="flex px-4 ">
        <div className="h-16 w-16 rounded-full overflow-hidden border-2">
          <img
            src="https://avatars.githubusercontent.com/u/583231?v=4"
            alt="Cartoon Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4">
          <p className="text-[15px] font-medium">
            {" "}
            {userInfo ? userInfo.name : "Loading..."}
          </p>
          <p className="text-[14px]">
            {" "}
            {userInfo ? userInfo.email : "Loading..."}
          </p>
        </div>
      </div>
      <div className="px-4 border-double">
        <p className="text-[15px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam ipsum
          repellat et? Labore nisi minima reprehenderit itaque, consequuntur
          enim quae rerum explicabo animi.
        </p>
      </div>
    </div>
  );
};

export default Profile;
