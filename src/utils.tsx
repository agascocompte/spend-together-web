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

// Existing function in the same file
export function darkenColor(hex: string, percent: number): string {
  hex = hex.replace(/^#/, "");
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent / 100))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent / 100))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent / 100))));

  const darkenedHex = `#${r.toString(16).padStart(2, "0")}${g
    .toString(16)
    .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  return darkenedHex;
}
