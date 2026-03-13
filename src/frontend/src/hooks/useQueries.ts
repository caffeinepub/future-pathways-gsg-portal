import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type {
  CounselorBooking,
  UserProfile,
  Variant_internal_external,
} from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllScholarships() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllScholarships();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllColleges() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["colleges"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllColleges();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllOpportunities() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["opportunities"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllOpportunities();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetOpportunitiesByCategory(
  category: Variant_internal_external,
) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["opportunities", category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getOpportunitiesByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllResources() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["resources"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllResources();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
      toast.success("Profile saved successfully!");
    },
    onError: () => {
      toast.error("Failed to save profile. Please try again.");
    },
  });
}

export function useSubmitBooking() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async (booking: CounselorBooking) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitBooking(booking);
    },
    onSuccess: () => {
      toast.success("Booking submitted! We'll be in touch shortly.");
    },
    onError: () => {
      toast.error("Failed to submit booking. Please try again.");
    },
  });
}
