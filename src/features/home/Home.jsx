import clsx from "clsx";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { MyFooter } from "../../pages/layouts/MyFooter";
import { MyHeader } from "../../pages/layouts/MyHeader";
import { MySidebar } from "../../pages/layouts/MySidebar";
import { selectSidebar } from "../common/commonSlide";

function Home() {
  const sidebar = useSelector(selectSidebar);

  useEffect(()=>{
    document.title = "E-Office"
  },[]);

  return (
    <>
      {sidebar && <MySidebar />}
      <div
        className={clsx("d-flex flex-column min-vh-100 bg-light", {
          wrapper: sidebar,
        })}
      >
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
