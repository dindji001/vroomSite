import { apiClient } from "./client";
import { apiConfig } from "@/config/api";
import type { ID, PaginationParams, PaginatedResult, ImageAsset } from "@/types";
import type {
  Vehicle,
  VehicleListParams,
  VehicleMake,
  VehicleModel,
  VehicleTrim,
  VehicleColor,
  VehicleOptionGroup,
  VehicleOption,
  VehicleConditionReport,
  VehicleWarranty,
  VehicleHistoryEntry,
  VehicleFilter,
  VehicleComparisonItem,
} from "@/types/vehicle";

type InquirePayload = { vehicleId: ID; name?: string; email?: string; phone?: string; message?: string };
type TestDrivePayload = {
  vehicleId: ID;
  date: string;
  time: string;
  locationId?: ID;
  address?: {
    line1: string;
    postalCode: string;
    city: string;
    country: string;
  };
  name?: string;
  email?: string;
  phone?: string;
  remarks?: string;
};

export const vehiclesApi = {
  list: (params: VehicleListParams = {}) =>
    apiClient.get<PaginatedResult<Vehicle>>(apiConfig.endpoints.vehicles.root, {
      query: params as Record<string, unknown>,
      cache: "no-store",
    }),
  get: (id: ID) =>
    apiClient.get<Vehicle>(apiConfig.endpoints.vehicles.byId.replace(":id", id)),
  getBySlug: (slug: string) =>
    apiClient.get<Vehicle>(apiConfig.endpoints.vehicles.bySlug.replace(":slug", slug)),
  search: (q: string, params?: PaginationParams) =>
    apiClient.get<PaginatedResult<Vehicle>>(apiConfig.endpoints.vehicles.search, {
      query: { q, ...params },
    }),
  listMakes: (query?: { active?: boolean; country?: string; search?: string }) =>
    apiClient.get<VehicleMake[]>(apiConfig.endpoints.vehicles.makes, { query }),
  getMake: (id: ID) =>
    apiClient.get<VehicleMake>(apiConfig.endpoints.vehicles.makeById.replace(":id", id)),
  listModels: (query?: { makeId?: ID; active?: boolean; bodyType?: string }) =>
    apiClient.get<VehicleModel[]>(apiConfig.endpoints.vehicles.models, { query }),
  getModel: (id: ID) =>
    apiClient.get<VehicleModel>(apiConfig.endpoints.vehicles.modelById.replace(":id", id)),
  listTrims: (query?: { modelId?: ID; year?: number; fuelType?: string }) =>
    apiClient.get<VehicleTrim[]>(apiConfig.endpoints.vehicles.trims, { query }),
  getTrim: (id: ID) =>
    apiClient.get<VehicleTrim>(apiConfig.endpoints.vehicles.trimById.replace(":id", id)),
  listColors: () => apiClient.get<VehicleColor[]>(apiConfig.endpoints.vehicles.colors),
  listOptionGroups: () =>
    apiClient.get<VehicleOptionGroup[]>(apiConfig.endpoints.vehicles.optionGroups),
  listOptions: (query?: { groupId?: ID; search?: string }) =>
    apiClient.get<VehicleOption[]>(apiConfig.endpoints.vehicles.options, { query }),
  getFiltersMeta: () =>
    apiClient.get<{
      priceRange: { min: number; max: number };
      mileageRange: { min: number; max: number };
      yearRange: { min: number; max: number };
      powerRange: { min: number; max: number };
      makes: Array<{ id: ID; name: string; slug: string; count: number }>;
      bodyTypes: Array<{ value: string; label: string; count: number }>;
      fuelTypes: Array<{ value: string; label: string; count: number }>;
      transmissions: Array<{ value: string; label: string; count: number }>;
      conditions: Array<{ value: string; label: string; count: number }>;
    }>(apiConfig.endpoints.vehicles.filters),
  featured: (limit = 8) =>
    apiClient.get<Vehicle[]>(apiConfig.endpoints.vehicles.featured, {
      query: { limit },
    }),
  newArrivals: (limit = 12) =>
    apiClient.get<Vehicle[]>(apiConfig.endpoints.vehicles.newArrivals, {
      query: { limit },
    }),
  priceDrops: (limit = 8) =>
    apiClient.get<Vehicle[]>(apiConfig.endpoints.vehicles.priceDrops, {
      query: { limit },
    }),
  similar: (id: ID, limit = 4) =>
    apiClient.get<Vehicle[]>(
      apiConfig.endpoints.vehicles.similar.replace(":id", id),
      { query: { limit } }
    ),
  compare: (vehicleIds: ID[]) =>
    apiClient.get<Vehicle[]>(apiConfig.endpoints.vehicles.compare, {
      query: { vehicleIds },
    }),
  history: (id: ID) =>
    apiClient.get<VehicleHistoryEntry[]>(
      apiConfig.endpoints.vehicles.history.replace(":id", id)
    ),
  conditionReport: (id: ID) =>
    apiClient.get<VehicleConditionReport>(
      apiConfig.endpoints.vehicles.conditionReport.replace(":id", id)
    ),
  warranty: (id: ID) =>
    apiClient.get<VehicleWarranty>(
      apiConfig.endpoints.vehicles.warranty.replace(":id", id)
    ),
  inquire: (id: ID, payload: Omit<InquirePayload, "vehicleId">) =>
    apiClient.post<{ success: boolean; ticketId: string; expiresAt?: string }>(
      apiConfig.endpoints.vehicles.inquire.replace(":id", id),
      payload
    ),
  scheduleTestDrive: (id: ID, payload: Omit<TestDrivePayload, "vehicleId">) =>
    apiClient.post<{ appointmentId: ID; expiresAt?: string }>(
      apiConfig.endpoints.vehicles.scheduleTestDrive.replace(":id", id),
      payload
    ),
  reserve: (id: ID, payload?: { durationMinutes?: number; holdFeeAmount?: number }) =>
    apiClient.post<{
      reservationId: ID;
      expiresAt: string;
      holdFee?: { amount: number; currency: string };
      paymentIntentClientSecret?: string;
    }>(apiConfig.endpoints.vehicles.reserve.replace(":id", id), payload),
  getFinancingPlans: (
    id: ID,
    query?: { downPaymentPercent?: number; durationMonths?: number; annualMileageKm?: number }
  ) =>
    apiClient.get<{
      loan: Array<{
        durationMonths: number;
        monthlyPayment: number;
        apr: number;
        totalRepayable: number;
        interest: number;
      }>;
      lease: Array<{
        durationMonths: number;
        mileageKm: number;
        firstPayment: number;
        monthlyPayment: number;
        residualValue: number;
        totalCost: number;
      }>;
    }>(apiConfig.endpoints.vehicles.financing.replace(":id", id), { query }),
  getTradeInEstimate: (
    id: ID,
    tradeInVehicle: {
      makeId: ID;
      modelId: ID;
      trimId?: ID;
      year: number;
      mileageKm: number;
      registrationCountry?: string;
      vin?: string;
      condition?: string;
    }
  ) =>
    apiClient.post<{
      estimatedValue: { min: number; max: number; avg: number; currency: string };
      instantCashOffer?: number;
      expiresAt: string;
      validationRequired: string[];
    }>(apiConfig.endpoints.vehicles.tradeIn.replace(":id", id), tradeInVehicle),
  uploadImage: (vehicleId: ID, file: File) => {
    const fd = new FormData();
    fd.append("image", file);
    fd.append("vehicleId", vehicleId);
    return apiClient.upload<ImageAsset>(`${apiConfig.endpoints.vehicles.root}/${vehicleId}/images`, fd);
  },
  reorderImages: (vehicleId: ID, orderedIds: ID[]) =>
    apiClient.post(`${apiConfig.endpoints.vehicles.root}/${vehicleId}/images/reorder`, {
      imageIds: orderedIds,
    }),
  deleteImage: (vehicleId: ID, imageId: ID) =>
    apiClient.delete(`${apiConfig.endpoints.vehicles.root}/${vehicleId}/images/${imageId}`),
};

export default vehiclesApi;
