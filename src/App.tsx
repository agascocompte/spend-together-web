import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import { HouseholdProvider } from "./context/HouseholdContext";

function App() {
  return (
    <AuthProvider>
      <HouseholdProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </HouseholdProvider>
    </AuthProvider>
  );
}

export default App;
