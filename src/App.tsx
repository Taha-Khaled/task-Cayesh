import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LoginForm from "./components/loginForm";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectAuth, setUser } from "./features/auth/authSlice";
import { useEffect } from "react";
import AwardsList from "./components/awardsList";
import Navbar from "./components/navbar";

function App() {
  const dispatch = useAppDispatch();
  const { username } = useAppSelector(selectAuth);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    dispatch(setUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      {username ? (
        <>
          <Navbar />
          <AwardsList />
        </>
      ) : (
        <LoginForm />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;
