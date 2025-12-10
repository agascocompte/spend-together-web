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
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-purple-500 text-white">
      <header className="p-6 bg-transparent flex flex-col md:flex-row md:items-center md:justify-between">
        {/* Título */}
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">SpendTogether</h1>
          <p className="text-sm text-gray-200 break-all">{user?.email}</p>
        </div>

        {/* Botón Logout */}
        <button
          className="
      bg-purple-500 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
      mt-4
      md:mt-0 md:ml-4 md:order-none
      order-last
    "
          onClick={handleLogout}
        >
          Logout
        </button>
      </header>

      {householdId ? (
        <CategoriesProvider householdId={householdId}>
          <ExpensesProvider householdId={householdId}>
            <main className="p-6 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

              <div className="mt-10 bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg">
                {renderActiveSection()}
              </div>
            </main>
          </ExpensesProvider>
        </CategoriesProvider>
      ) : (
        <p className="p-8 text-center text-white">
          Cargando información del grupo...
        </p>
      )}
    </div>
  );
};

export default HomePage;
