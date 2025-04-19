import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DashboardCard from "../components/DashboardCard";
import Expenses from "../components/Expenses";
import Categories from "../components/Categories";
import Summary from "../components/Summary";
import { useHousehold } from "../context/HouseholdContext";
import { CategoriesProvider } from "../context/CategoriesContext";
import { ExpensesProvider } from "../context/ExpensesContent";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOutUser } = useAuth();
  const { householdId, fetchHousehold } = useHousehold();

  const handleLogout = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  useEffect(() => {
    if (user && !householdId) {
      fetchHousehold(user.uid).then(() => {
        console.log("Household cargado");
      });
    }
  }, [user, householdId, fetchHousehold]);

  const [activeSection, setActiveSection] = useState<string>("expenses");

  const renderActiveSection = () => {
    switch (activeSection) {
      case "expenses":
        return <Expenses />;
      case "categories":
        return <Categories />;
      case "summary":
        return <Summary />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between p-4 bg-white shadow">
        <h1 className="text-xl font-bold">SpendTogether</h1>
        <div className="flex items-center space-x-4">
          <p>{user?.email}</p>
          <button
            className="text-gray-600 hover:text-gray-800 transition-colors cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Solo cargamos el provider si householdId está disponible */}
      {householdId ? (
        <CategoriesProvider householdId={householdId}>
          <ExpensesProvider householdId={householdId}>
            <main className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <DashboardCard
                  title="Gestionar Gastos"
                  description="Visualiza, edita y elimina tus gastos."
                  section="expenses"
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
                <DashboardCard
                  title="Gestionar Categorías"
                  description="Añade o modifica las categorías de tus gastos."
                  section="categories"
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
                <DashboardCard
                  title="Ver Resumen"
                  description="Consulta gráficos y estadísticas de tus gastos."
                  section="summary"
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              </div>

              <div className="mt-8 bg-white p-6 rounded-lg shadow">
                {renderActiveSection()}
              </div>
            </main>
          </ExpensesProvider>
        </CategoriesProvider>
      ) : (
        <p className="p-8">Cargando información del grupo...</p>
      )}
    </div>
  );
};

export default HomePage;
