import { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navigation from "./components/navigation/Navigation";
import Home from "./pages/home/Home";
import ProtectedRoutes from "./components/protectedroute/ProtectedRoute";

const PageNotFound = lazy(() => import("./pages/404/404"));
const Login = lazy(() => import("./components/login/Login"));
const Menu = lazy(() => import("./pages/menu/MenuPage"));
const Booking = lazy(() => import("./pages/booking/Booking"));
const Backoffice = lazy(() => import("./pages/backoffice/Backoffice"));

function App() {
  const location = useLocation();
  const isBackoffice = location.pathname.startsWith("/backoffice");

  return (
    <>
      {!isBackoffice && <Navigation />}
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/backoffice" element={<Backoffice />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
