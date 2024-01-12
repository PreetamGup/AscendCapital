import Navbar from "./component/Navbar";
import Container from "./component/Container";
import { useState } from "react";
import Login from "./pages/Login";

function App() {

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});


  if(!isLogin) {

    return (
      <div className=" w-full h-[100vh]">
        <Login setIsLogin={setIsLogin} setUser={setUser}/>
      </div>
    )
  }

  return (
    <div className="App w-full h-full ">
     <Navbar user={user} setIsLogin={setIsLogin}/>
     <Container user={user}/>
    </div>
  );
}

export default App;
