import React, { useEffect, useState } from "react";
import MyRouter from "routers/index";
import { AppContext } from "context/appContext";
import axios from 'axios';


function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [hotels, setHotels] = useState(null);
  // console.log(hotels, user, token);

  const isUserLoggedIn = async () => {
    const tk = localStorage.getItem('token');
    const userToken = localStorage.getItem('user');
    console.log("1 usertoken: ",userToken)
    if (tk && userToken) {
      const parsedUser = await JSON.parse(userToken);
      console.log("2 user: ", parsedUser)
      console.log('3 token: ', tk)
      setUser(parsedUser);
      setToken(tk);

      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    const checkUser = async () => {
      const logged = await isUserLoggedIn()
      if (logged) {
        //code here
        console.log("4 user - ",user);
        console.log("5 token - ",token);
      }
    }
    checkUser();
  }, [])

  return (
    <AppContext.Provider value={[user, setUser, token, setToken, hotels, setHotels]} >
      <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
        <MyRouter />
      </div>
    </AppContext.Provider>

  );
}

export default App;
