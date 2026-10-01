import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/home/Home";

const PageNotFound = lazy(() => import("./pages/404/404"));
const Login = lazy(() => import("./components/login/Login"));

function App() {
  const location = useLocation();
  const isBackoffice = location.pathname.startsWith("/backoffice");

  return (
    <>
      {!isBackoffice && <Navigation />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
