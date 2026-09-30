import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/home/Home";

function App() {
  const location = useLocation();
  const isBackoffice = location.pathname.startsWith("/backoffice");

  return (
    <>
      {!isBackoffice && <Navigation />}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
