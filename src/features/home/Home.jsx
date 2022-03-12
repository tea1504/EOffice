import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { selectLoginToken } from "../login/loginSlice";

function Home() {
  const token = useSelector(selectLoginToken);
  return (
    <>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link> |
        {token === null ? (
          <Link to="/login">Login</Link>
        ) : (
          <Link to="/logout">Logout</Link>
        )}{" "}
        |<Link to="/admin">Admin</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Home;
