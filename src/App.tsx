import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { HouseholdProvider } from "./context/HouseholdContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <AuthProvider>
      <HouseholdProvider>
        <Toaster
          toastOptions={{
            style: {
              background: "#333",
              color: "#fff",
            },
          }}
          position="bottom-center"
        />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HouseholdProvider>
    </AuthProvider>
  );
}

export default App;
