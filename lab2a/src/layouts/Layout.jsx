import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <Header />

      <main className="container">
        <div className="app-shell">
          <Outlet />
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Layout;
