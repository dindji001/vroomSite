import { vehiclesApi } from "@/services/api/vehicles";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Vehicle, VehicleListParams } from "@/types/vehicle";

export function useVehicles(params?: VehicleListParams) {
  return useQuery({
    queryKey: ["vehicles", params],
    queryFn: () => vehiclesApi.list(params || {}),
  });
}

export function useVehicle(id: string) {
  return useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => vehiclesApi.get(id),
    enabled: !!id,
  });
}

export function useVehicleBySlug(slug: string) {
  return useQuery({
    queryKey: ["vehicle", slug],
    queryFn: () => vehiclesApi.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useSimilarVehicles(vehicleId: string, limit = 4) {
  return useQuery({
    queryKey: ["vehicles", "similar", vehicleId],
    queryFn: () => vehiclesApi.similar(vehicleId, limit),
    enabled: !!vehicleId,
  });
}

export function useVehicleMakes() {
  return useQuery({
    queryKey: ["vehicle-makes"],
    queryFn: () => vehiclesApi.listMakes(),
  });
}

export function useVehicleModels(makeId?: string) {
  return useQuery({
    queryKey: ["vehicle-models", makeId],
    queryFn: () => vehiclesApi.listModels({ makeId }),
    enabled: !!makeId,
  });
}

export function useVehicleInquire() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { vehicleId: string; message: string; contactInfo: any }) =>
      vehiclesApi.inquire(data.vehicleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useScheduleTestDrive() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { vehicleId: string; date: string; time: string; contactInfo: any }) =>
      vehiclesApi.scheduleTestDrive(data.vehicleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}

export function useReserveVehicle() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: { vehicleId: string; durationMinutes?: number; holdFeeAmount?: number }) =>
      vehiclesApi.reserve(data.vehicleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });
}
