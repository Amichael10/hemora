/**
 * Stub for the original `@workspace/api-client-react` package.
 *
 * The Kindred app was built against a generated REST client backed by a
 * separate Node API server. In Lovable Cloud we can swap that for direct
 * Supabase queries later — for now this stub returns empty data so the UI
 * renders without crashing. Mutations are no-ops that resolve successfully.
 */
import { useMutation, useQuery, type UseMutationResult, type UseQueryResult } from "@tanstack/react-query";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

// ---- Enums (string-literal style; pages use `Foo.BAR`) ----
export const CrisisLogPainLevel = {
  mild: "mild",
  moderate: "moderate",
  severe: "severe",
  worst: "worst",
} as const;
export type CrisisLogPainLevel = (typeof CrisisLogPainLevel)[keyof typeof CrisisLogPainLevel];

export const CreateCareRecordBodyType = {
  lab: "lab",
  imaging: "imaging",
  visit: "visit",
  other: "other",
} as const;
export type CreateCareRecordBodyType = (typeof CreateCareRecordBodyType)[keyof typeof CreateCareRecordBodyType];

export const CreateCareRecordBodyStatus = {
  pending: "pending",
  completed: "completed",
  saved: "saved",
} as const;
export type CreateCareRecordBodyStatus = (typeof CreateCareRecordBodyStatus)[keyof typeof CreateCareRecordBodyStatus];

export const CreateMedicationBodyStatus = {
  ongoing: "ongoing",
  active: "active",
  paused: "paused",
  archived: "archived",
} as const;
export type CreateMedicationBodyStatus = (typeof CreateMedicationBodyStatus)[keyof typeof CreateMedicationBodyStatus];

export const CreateMedicationLogBodyStatus = {
  taken: "taken",
  skipped: "skipped",
  missed: "missed",
} as const;
export type CreateMedicationLogBodyStatus = (typeof CreateMedicationLogBodyStatus)[keyof typeof CreateMedicationLogBodyStatus];

export const CreateProfileBodySetupFor = {
  myself: "myself",
  my_child: "my_child",
  someone_i_care_for: "someone_i_care_for",
  partner_and_i: "partner_and_i",
} as const;
export type CreateProfileBodySetupFor = (typeof CreateProfileBodySetupFor)[keyof typeof CreateProfileBodySetupFor];

// ---- Body / param types (loose `any` to keep migration fast) ----
export type CreateProviderBody = any;
export type ListProvidersParams = any;

// ---- Query-key helpers ----
const k = (name: string) => (...args: any[]) => [name, ...args];
export const getListCrisisLogsQueryKey = k("crisis-logs");
export const getListMedicationsQueryKey = k("medications");
export const getListMedicationLogsQueryKey = k("medication-logs");
export const getListCareRecordsQueryKey = k("care-records");
export const getListProvidersQueryKey = k("providers");
export const getListEmergencyContactsQueryKey = k("emergency-contacts");
export const getGetProfileQueryKey = k("profile");
export const getGetDashboardSummaryQueryKey = k("dashboard-summary");

// ---- Profile direct fetch ----
export async function getProfileByUser(_userId: string): Promise<{ id: number }> {
  // No backend yet — pretend the user has no linked profile so the app pushes
  // them through the onboarding flow.
  throw new ApiError("Profile not found", 404);
}

// ---- Mock query/mutation helpers ----
function emptyQuery<T = any>(initial: T): UseQueryResult<T, Error> {
  return {
    data: initial,
    isLoading: false,
    isFetching: false,
    isPending: false,
    isError: false,
    isSuccess: true,
    error: null,
    refetch: () => Promise.resolve({ data: initial } as any),
    status: "success",
  } as unknown as UseQueryResult<T, Error>;
}

function noopMutation(): UseMutationResult<any, Error, any> {
  return useMutation({
    mutationFn: async (vars: any) => vars,
  });
}

function listHook<T = any>(emptyValue: T = [] as unknown as T) {
  return (..._args: any[]) =>
    useQuery({
      queryKey: ["stub", Math.random()],
      queryFn: async () => emptyValue,
      enabled: false,
      initialData: emptyValue,
    }) as unknown as UseQueryResult<T, Error>;
}

// Lists / gets — return empty data
export const useListCrisisLogs = listHook<any[]>([]);
export const useListMedications = listHook<any[]>([]);
export const useListMedicationLogs = listHook<any[]>([]);
export const useListCareRecords = listHook<any[]>([]);
export const useListProviders = listHook<any[]>([]);
export const useListEmergencyContacts = listHook<any[]>([]);
export const useGetProfile = (_id?: any, _opts?: any) =>
  emptyQuery<any>({ id: 1, full_name: "", country: "Nigeria", state: null });
export const useGetDashboardSummary = (_id?: any, _opts?: any) =>
  emptyQuery<any>({ next_medication: null, recent_logs: [] });

// Mutations — all no-op
export const useCreateCrisisLog = noopMutation;
export const useCreateMedication = noopMutation;
export const useCreateMedicationLog = noopMutation;
export const useCreateCareRecord = noopMutation;
export const useCreateProfile = noopMutation;
export const useCreateProvider = noopMutation;
export const useUpdateProfile = noopMutation;
export const useUpdateProvider = noopMutation;

// Auth-token / base-url plumbing — no-ops in stub
export type AuthTokenGetter = () => string | Promise<string | null> | null;
export function setBaseUrl(_url: string) {}
export function setAuthTokenGetter(_getter: AuthTokenGetter) {}