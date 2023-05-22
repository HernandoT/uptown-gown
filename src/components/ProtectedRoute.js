import { useLocation, Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }) => {
  let location = useLocation();

  if (localStorage.getItem("isAdmin") !== "true") {
    return <Navigate to="/admin-login" state={{ from: location}} />;
  }

  return children;
}

export default ProtectedRoute;