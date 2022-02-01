// import { Outlet, Link } from "react-router-dom";
import React from 'react';
import Navbar from './components/organisms/Navbar';

export default function App() {
  return (
    <div>
      <Navbar />
    </div>

  // <div>
  //   <h1>Bookkeeper</h1>
  //   <nav
  //     style={{
  //       borderBottom: "solid 1px",
  //       paddingBottom: "1rem"
  //     }}
  //   >
  //     <Link to="/invoices">Invoices</Link> |{" "}
  //     <Link to="/expenses">Expenses</Link>
  //   </nav>
  //   <Outlet />
  // </div>
  );
}
