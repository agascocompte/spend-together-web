import { JSX } from "react";
import LocalCafeIcon from "@mui/icons-material/LocalCafe";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from "@mui/icons-material/Pets";
import LocalPharmacyIcon from "@mui/icons-material/LocalPharmacy";
import SchoolIcon from "@mui/icons-material/School";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import Co2Icon from "@mui/icons-material/Co2";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import WorkIcon from "@mui/icons-material/Work";
import RedeemIcon from "@mui/icons-material/Redeem";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import SecurityIcon from "@mui/icons-material/Security";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CampaignIcon from "@mui/icons-material/Campaign";
import StorefrontIcon from "@mui/icons-material/Storefront";
import ContentCutIcon from "@mui/icons-material/ContentCut";
import CelebrationIcon from "@mui/icons-material/Celebration";
import NightlifeIcon from "@mui/icons-material/Nightlife";
import BuildIcon from "@mui/icons-material/Build";
import BoltIcon from "@mui/icons-material/Bolt";
import MedicationIcon from "@mui/icons-material/Medication";
import SavingsIcon from "@mui/icons-material/Savings";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import FlightIcon from "@mui/icons-material/Flight";
import MovieIcon from "@mui/icons-material/Movie";
import PaymentsIcon from "@mui/icons-material/Payments";
import BrushIcon from "@mui/icons-material/Brush";
import SpaIcon from "@mui/icons-material/Spa";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupsIcon from "@mui/icons-material/Groups";
import ApartmentIcon from "@mui/icons-material/Apartment";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LabelIcon from "@mui/icons-material/Label";

export const CATEGORY_ICON_OPTIONS = [
  { name: "local_cafe", icon: <LocalCafeIcon /> },
  { name: "shopping_cart", icon: <ShoppingCartIcon /> },
  { name: "directions_car", icon: <DirectionsCarIcon /> },
  { name: "emoji_objects", icon: <EmojiObjectsIcon /> },
  { name: "home", icon: <HomeIcon /> },
  { name: "pet", icon: <PetsIcon /> },
  { name: "pharmacy", icon: <LocalPharmacyIcon /> },
  { name: "school", icon: <SchoolIcon /> },
  { name: "gas_station", icon: <LocalGasStationIcon /> },
  { name: "hospital", icon: <LocalHospitalIcon /> },
  { name: "utilities", icon: <ElectricalServicesIcon /> },
  { name: "depreciation", icon: <TrendingDownIcon /> },
  { name: "health_care", icon: <LocalHospitalIcon /> },
  { name: "dues_and_subscriptions", icon: <CardMembershipIcon /> },
  { name: "co2", icon: <Co2Icon /> },
  { name: "water_drop", icon: <WaterDropIcon /> },
  { name: "charitable_contributions", icon: <VolunteerActivismIcon /> },
  { name: "self_improvements", icon: <SelfImprovementIcon /> },
  { name: "vaccines", icon: <VaccinesIcon /> },
  { name: "office_supplies", icon: <WorkIcon /> },
  { name: "gift", icon: <RedeemIcon /> },
  { name: "fitness", icon: <FitnessCenterIcon /> },
  { name: "sports", icon: <SportsSoccerIcon /> },
  { name: "food", icon: <RestaurantIcon /> },
  { name: "insurance", icon: <SecurityIcon /> },
  { name: "transportation", icon: <DirectionsCarIcon /> },
  { name: "shopping_bag", icon: <ShoppingBagOutlinedIcon /> },
  { name: "advertising", icon: <CampaignIcon /> },
  { name: "store_front", icon: <StorefrontIcon /> },
  { name: "content_cut", icon: <ContentCutIcon /> },
  { name: "celebration", icon: <CelebrationIcon /> },
  { name: "night_life", icon: <NightlifeIcon /> },
  { name: "maintenance_repairs", icon: <BuildIcon /> },
  { name: "bolt", icon: <BoltIcon /> },
  { name: "medication", icon: <MedicationIcon /> },
  { name: "savings", icon: <SavingsIcon /> },
  { name: "bank_fees", icon: <AccountBalanceWalletIcon /> },
  { name: "rocket_launch", icon: <RocketLaunchIcon /> },
  { name: "travel_expenses", icon: <FlightIcon /> },
  { name: "entertainment", icon: <MovieIcon /> },
  { name: "debt_payments", icon: <PaymentsIcon /> },
  { name: "personal_care", icon: <BrushIcon /> },
  { name: "spa", icon: <SpaIcon /> },
  { name: "menu_book", icon: <MenuBookIcon /> },
  { name: "employee_training", icon: <GroupsIcon /> },
  { name: "apartment", icon: <ApartmentIcon /> },
  { name: "consulting_services", icon: <BusinessCenterIcon /> },
  { name: "default", icon: <LabelIcon /> },
];

export function getIconForCategory(iconName: string): JSX.Element {
  switch (iconName.toLowerCase()) {
    case "local_cafe":
      return <LocalCafeIcon />;
    case "shopping_cart":
      return <ShoppingCartIcon />;
    case "directions_car":
      return <DirectionsCarIcon />;
    case "emoji_objects":
      return <EmojiObjectsIcon />;
    case "home":
      return <HomeIcon />;
    case "pet":
      return <PetsIcon />;
    case "pharmacy":
      return <LocalPharmacyIcon />;
    case "school":
      return <SchoolIcon />;
    case "gas_station":
      return <LocalGasStationIcon />;
    case "hospital":
      return <LocalHospitalIcon />;
    case "utilities":
      return <ElectricalServicesIcon />;
    case "depreciation":
      return <TrendingDownIcon />;
    case "health_care":
      return <LocalHospitalIcon />;
    case "dues_and_subscriptions":
      return <CardMembershipIcon />;
    case "co2":
      return <Co2Icon />;
    case "water_drop":
      return <WaterDropIcon />;
    case "charitable_contributions":
      return <VolunteerActivismIcon />;
    case "self_improvements":
      return <SelfImprovementIcon />;
    case "vaccines":
      return <VaccinesIcon />;
    case "office_supplies":
      return <WorkIcon />;
    case "gift":
      return <RedeemIcon />;
    case "fitness":
      return <FitnessCenterIcon />;
    case "sports":
      return <SportsSoccerIcon />;
    case "food":
      return <RestaurantIcon />;
    case "insurance":
      return <SecurityIcon />;
    case "transportation":
      return <DirectionsCarIcon />;
    case "shopping_bag":
      return <ShoppingBagOutlinedIcon />;
    case "advertising":
      return <CampaignIcon />;
    case "store_front":
      return <StorefrontIcon />;
    case "content_cut":
      return <ContentCutIcon />;
    case "celebration":
      return <CelebrationIcon />;
    case "night_life":
      return <NightlifeIcon />;
    case "maintenance_repairs":
      return <BuildIcon />;
    case "bolt":
      return <BoltIcon />;
    case "medication":
      return <MedicationIcon />;
    case "savings":
      return <SavingsIcon />;
    case "bank_fees":
      return <AccountBalanceWalletIcon />;
    case "rocket_launch":
      return <RocketLaunchIcon />;
    case "travel_expenses":
      return <FlightIcon />;
    case "housing":
      return <HomeIcon />;
    case "entertainment":
      return <MovieIcon />;
    case "debt_payments":
      return <PaymentsIcon />;
    case "personal_care":
      return <BrushIcon />;
    case "spa":
      return <SpaIcon />;
    case "menu_book":
      return <MenuBookIcon />;
    case "employee_training":
      return <GroupsIcon />;
    case "apartment":
      return <ApartmentIcon />;
    case "consulting_services":
      return <BusinessCenterIcon />;
    default:
      return <LabelIcon />;
  }
}
