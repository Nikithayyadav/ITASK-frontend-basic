
import dashboardConfig from "./itask-dashboard.json";

export type RoleCode = "OWN" | "REV" | "CON";

export type Transaction = {
  code: string;
  name: string;
  action: string;
};

export type ModuleConfig = {
  code: string;
  name: string;
  transactions: Transaction[];
};

export type RolePath = "owner" | "reviewer" | "contributor";

type DashboardRole = {
  code: RoleCode;
  name: string;
  modules: ModuleConfig[];
};

type DashboardJSON = {
  roles: Record<string, DashboardRole>;
};

const dashboard = dashboardConfig as DashboardJSON;

export const roleCodeByPath: Record<RolePath, RoleCode> = {
  owner: "OWN",
  reviewer: "REV",
  contributor: "CON",
};

export const roleModules: Record<RoleCode, ModuleConfig[]> = {
  OWN: dashboard.roles.owner?.modules ?? [],
  REV: dashboard.roles.reviewer?.modules ?? [],
  CON: dashboard.roles.contributor?.modules ?? [],
};
