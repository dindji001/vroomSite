import type { ID, Timestamp, ImageAsset, Money, PaginationParams } from "@/types";

export type VehicleStatus =
  | "available"
  | "reserved"
  | "pending_delivery"
  | "sold"
  | "unavailable"
  | "archived";

export type VehicleCondition = "new" | "used" | "demonstrator" | "pre_registered";
export type FuelType =
  | "petrol"
  | "diesel"
  | "hybrid"
  | "plug_in_hybrid"
  | "electric"
  | "hydrogen"
  | "lpg"
  | "ethanol";
export type TransmissionType = "manual" | "automatic" | "semi_automatic" | "cvt" | "single_gear";
export type Drivetrain = "fwd" | "rwd" | "awd" | "4wd";
export type BodyType =
  | "sedan"
  | "suv"
  | "hatchback"
  | "coupe"
  | "convertible"
  | "wagon"
  | "van"
  | "pickup"
  | "minivan"
  | "sports";
export type VehicleColorType = "standard" | "metallic" | "pearl" | "matte" | "special";
export type WheelDrive = 2 | 4;

export type VehicleMake = {
  id: ID;
  name: string;
  slug: string;
  logoUrl?: string;
  country?: string;
  active: boolean;
  modelsCount?: number;
} & Timestamp;

export type VehicleModel = {
  id: ID;
  makeId: ID;
  make?: VehicleMake;
  name: string;
  slug: string;
  generation?: string;
  productionStart?: number;
  productionEnd?: number;
  bodyType?: BodyType;
  active: boolean;
  variantsCount?: number;
  imageUrl?: string;
} & Timestamp;

export type VehicleTrim = {
  id: ID;
  modelId: ID;
  name: string;
  slug: string;
  year: number;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  powerHp?: number;
  powerKw?: number;
  torque?: number;
  acceleration?: number;
  topSpeed?: number;
  combinedConsumption?: number;
  co2Emissions?: number;
  rangeKm?: number;
  batteryCapacityKwh?: number;
  doors?: number;
  seats?: number;
  drivetrain?: Drivetrain;
  lengthMm?: number;
  widthMm?: number;
  heightMm?: number;
  bootL?: number;
  weightKg?: number;
} & Timestamp;

export type VehicleColor = {
  id: ID;
  name: string;
  slug: string;
  hex: string;
  rgb?: string;
  type: VehicleColorType;
  priceExtra?: number;
  metallic?: boolean;
  pearl?: boolean;
  imageUrl?: string;
};

export type VehicleOptionGroup = {
  id: ID;
  name: string;
  slug: string;
  category:
    | "exterior"
    | "interior"
    | "comfort"
    | "infotainment"
    | "safety"
    | "performance"
    | "driver_assistance"
    | "aesthetic";
  description?: string;
};

export type VehicleOption = {
  id: ID;
  groupId: ID;
  group?: VehicleOptionGroup;
  name: string;
  slug: string;
  code?: string;
  description?: string;
  priceExtra?: number;
  isStandard?: boolean;
  isPackage?: boolean;
  packageIncludes?: ID[];
  imageUrl?: string;
};

export type VehicleEquipment = {
  id?: ID;
  name: string;
  category: string;
  isStandard: boolean;
};

export type VehicleTechnicalInspection = {
  date: string;
  validUntil: string;
  status: "valid" | "expiring" | "expired";
  nextDueDate?: string;
  comments?: string;
};

export type VehicleHistoryEntry = {
  id: ID;
  vehicleId: ID;
  date: string;
  type: "purchase" | "sale" | "service" | "accident" | "repair" | "inspection" | "registration";
  title: string;
  description?: string;
  mileageKm?: number;
  costMoney?: Money;
  location?: string;
  documentUrls?: string[];
  createdAt: string;
};

export type VehicleConditionReport = {
  id: ID;
  vehicleId: ID;
  overallScore: number;
  exteriorScore: number;
  interiorScore: number;
  mechanicalScore: number;
  documentsScore: number;
  expertName?: string;
  expertSignatureUrl?: string;
  inspectedAt: string;
  items: Array<{
    category: string;
    item: string;
    rating: number;
    comments?: string;
    photos?: string[];
  }>;
  summary?: string;
};

export type VehicleWarranty = {
  id: ID;
  vehicleId: ID;
  provider: string;
  type: "manufacturer" | "dealer" | "extended" | "certified";
  durationMonths: number;
  maxKm?: number;
  startDate: string;
  endDate: string;
  coverage: string[];
  exclusions?: string[];
  deductible?: Money;
  transferable: boolean;
  status: "active" | "expired" | "cancelled";
  contractUrl?: string;
};

export type Vehicle = {
  id: ID;
  slug: string;
  makeId: ID;
  modelId: ID;
  trimId: ID;
  make?: VehicleMake;
  model?: VehicleModel;
  trim?: VehicleTrim;
  status: VehicleStatus;
  condition: VehicleCondition;
  year: number;
  registrationDate?: string;
  firstRegistrationDate?: string;
  registrationCountry?: string;
  vin: string;
  mileageKm: number;
  price: Money;
  previousPrice?: Money;
  discountPercent?: number;
  discountAmount?: Money;
  isNegotiable?: boolean;
  isFeatured: boolean;
  isCertified: boolean;
  isNewArrival: boolean;
  locationCountryCode: string;
  locationCity: string;
  locationPostalCode?: string;
  stockNumber?: string;
  sellerType: "dealer" | "private" | "official";
  sellerId?: ID;
  sellerNotes?: string;
  viewCount: number;
  favoriteCount: number;
  inquiryCount: number;
  availableFrom?: string;
  reservedUntil?: string;
  deliveryKm?: number;
  ownersCount?: number;
  keyCount?: number;
  serviceBookPresent: boolean;
  hasServiceHistory: boolean;
  invoicesPresent?: boolean;
  immatriculationType?: string;
  critAir?: 1 | 2 | 3 | 4 | 5 | null;
  malusEcology?: Money;
  bonusEcology?: Money;
  taxHorsePower?: number;
  fiscalPower?: number;
  co2GramsPerKm?: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  exteriorColorId?: ID;
  exteriorColor?: VehicleColor;
  interiorColorId?: ID;
  interiorColor?: VehicleColor;
  interiorMaterial?: "leather" | "alcantara" | "fabric" | "nappa" | "vegan" | "cloth" | "synthetic";
  exteriorFinish?: VehicleColorType;
  upholsteryColor?: string;
  doors: 2 | 3 | 4 | 5 | 6;
  seats: 2 | 4 | 5 | 6 | 7 | 8 | 9;
  drivetrain?: Drivetrain;
  powerHp: number;
  powerKw?: number;
  torqueNm?: number;
  engineDisplacementCc?: number;
  cylindersCount?: number;
  cylindersArrangement?: "inline" | "v" | "flat" | "w" | "rotary";
  engineCode?: string;
  turbo?: boolean;
  hybrid?: boolean;
  rangeKm?: number;
  batteryCapacityKwh?: number;
  fastChargingAvailable?: boolean;
  fastChargingKw?: number;
  plugType?: string;
  images: ImageAsset[];
  videoUrl?: string;
  threeSixtyUrl?: string;
  selectedOptionIds?: ID[];
  options?: VehicleOption[];
  standardEquipment?: VehicleEquipment[];
  optionalEquipment?: VehicleEquipment[];
  features?: string[];
  tags?: string[];
  technicalInspection?: VehicleTechnicalInspection;
  historyReportAvailable: boolean;
  carfaxReportAvailable?: boolean;
  autoCheckReportAvailable?: boolean;
  hasAccident?: boolean;
  accidentsCount?: number;
  lastServiceDate?: string;
  nextServiceDate?: string;
  nextServiceKm?: number;
  warranty?: VehicleWarranty;
  conditionReport?: VehicleConditionReport;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string | null;
  expiresAt?: string | null;
} & Timestamp;

export type VehicleFilter = {
  q?: string;
  makeIds?: ID[];
  modelIds?: ID[];
  trimIds?: ID[];
  conditions?: VehicleCondition[];
  statuses?: VehicleStatus[];
  fuelTypes?: FuelType[];
  transmissions?: TransmissionType[];
  bodyTypes?: BodyType[];
  drivetrains?: Drivetrain[];
  bodyColors?: ID[];
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  minMileage?: number;
  maxMileage?: number;
  minPower?: number;
  maxPower?: number;
  doorsCounts?: number[];
  seatsCounts?: number[];
  countries?: string[];
  cities?: string[];
  isFeatured?: boolean;
  isCertified?: boolean;
  isNewArrival?: boolean;
  isNegotiable?: boolean;
  critAirs?: number[];
  optionIds?: ID[];
  tags?: string[];
};

export type VehicleListParams = VehicleFilter & PaginationParams;

export type VehicleComparisonItem = {
  vehicleId: ID;
  addedAt: string;
};
