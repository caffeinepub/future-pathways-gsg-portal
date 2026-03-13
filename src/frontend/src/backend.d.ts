import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface College {
    country: string;
    name: string;
    description: string;
    hasResearchOpportunities: boolean;
    areasOfInterest: Array<string>;
    ranking: bigint;
}
export interface Scholarship {
    country: string;
    name: string;
    description: string;
    deadline: string;
    scholarshipType: Variant_merit_subject_need;
    fieldOfStudy: string;
}
export interface Resource {
    title: string;
    description: string;
    resourceType: Variant_example_guide_template;
    fileUrl: string;
}
export interface LearningOpportunity {
    title: string;
    description: string;
    deadline: string;
    category: Variant_internal_external;
    organization: string;
}
export interface CounselorBooking {
    name: string;
    email: string;
    message: string;
    preferredDate: string;
}
export interface UserProfile {
    academicAchievements: Array<string>;
    extracurricularActivities: Array<string>;
    awards: Array<string>;
    leadershipRoles: Array<string>;
    internships: Array<string>;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Variant_example_guide_template {
    example = "example",
    guide = "guide",
    template = "template"
}
export enum Variant_internal_external {
    internal = "internal",
    external = "external"
}
export enum Variant_merit_subject_need {
    merit = "merit",
    subject = "subject",
    need = "need"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllBookings(): Promise<Array<CounselorBooking>>;
    getAllColleges(): Promise<Array<College>>;
    getAllOpportunities(): Promise<Array<LearningOpportunity>>;
    getAllResources(): Promise<Array<Resource>>;
    getAllScholarships(): Promise<Array<Scholarship>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getOpportunitiesByCategory(category: Variant_internal_external): Promise<Array<LearningOpportunity>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitBooking(booking: CounselorBooking): Promise<void>;
}
