import { Outlet } from "react-router-dom";
import { MyFooter } from "../../pages/layouts/MyFooter";
import { MyHeader } from "../../pages/layouts/MyHeader";
import { MySidebar } from "../../pages/layouts/MySidebar";

function Home() {
  return (
    <>
      <MySidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <MyHeader />
        <div className="content">
          <Outlet />
        </div>
        <MyFooter />
      </div>
    </>
  );
}

export default Home;
