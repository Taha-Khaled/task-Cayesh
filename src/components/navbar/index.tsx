import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAppSelector } from "../../app/hooks";
import { setUser, selectAuth } from "../../features/auth/authSlice";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const dispatch = useDispatch();

  const handelLogout = () => {
    dispatch(setUser({}));
    toast.success("successfully logout");
  };
  const { username } = useAppSelector(selectAuth);
  return (
    <nav className={styles.navbar}>
      <h2>Hi, {username}</h2>
      <Button variant="contained" onClick={handelLogout}>
        Logout
      </Button>
    </nav>
  );
};
export default Navbar;
