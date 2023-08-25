import Header from "./components/Header";
import "./index.css";
import Login from "./pages/Login/Login";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(
    (state: Window["RootState"]) => state.auth.isLoggedIn
  );
  console.log(isLoggedIn);

  return <>{!isLoggedIn ? <Header name="" /> : <Login />}</>;
}

export default App;
