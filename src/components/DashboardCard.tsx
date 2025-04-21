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
      className={`cursor-pointer rounded-2xl p-6 shadow-lg transition-all transform hover:scale-[1.02] backdrop-blur-md bg-white/10 border ${
        isActive
          ? "border-white ring-2 ring-white"
          : "border-transparent hover:border-white/30"
      }`}
    >
      <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-white/80 text-sm">{description}</p>
    </div>
  );
};

export default DashboardCard;
