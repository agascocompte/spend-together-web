interface DashboardCardProps {
  title: string;
  description: string;
  section: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  section,
  activeSection,
  setActiveSection,
}) => {
  const isActive = activeSection === section;
  return (
    <div
      onClick={() => setActiveSection(section)}
      className={`cursor-pointer bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow ${
        isActive ? "border-2 border-blue-500" : "border border-transparent"
      }`}
    >
      <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default DashboardCard;
