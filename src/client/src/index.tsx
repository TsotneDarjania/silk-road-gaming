import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import App from "./App";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TbilisiBatumi } from "./games/tbilisi-batumi-1/TbilisiBatumi";
import { Bagrationi } from "./games/bagrationi/Bagrationi";
import { LoveChaser } from "./games/love-chaser/LoveChaser";
import DonationPage from "./pages/donationPage/DonationPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/donation" element={<DonationPage />} />
      <Route path="/games/love-chaser" element={<LoveChaser />} />
      <Route path="/games/bagrationi" element={<Bagrationi />} />
      <Route path="/games/batumisken" element={<TbilisiBatumi />} />
    </Routes>
  </Router>
);
