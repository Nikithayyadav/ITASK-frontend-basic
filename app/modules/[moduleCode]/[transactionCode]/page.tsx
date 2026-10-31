import { notFound } from "next/navigation";

import ModuleLayout from "@/components/layout/ModuleLayout";
import {
  roleModules,
  roleCodeByPath,
} from "@/config/itask-config";
export const instant = false;

type PageProps = {
  params: Promise<{
    moduleCode: string;
    transactionCode: string;
  }>;
  searchParams: Promise<{
    role?: string;
  }>;
};

export default async function TransactionPage({
  params,
  searchParams,
}: PageProps) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  console.log("RESOLVED PARAMS:", resolvedParams);

  const { moduleCode, transactionCode } = resolvedParams;
  const roleParam = resolvedSearchParams.role;

  const role =
    roleParam === "reviewer" || roleParam === "contributor"
      ? roleParam
      : "owner";

  const roleCode = roleCodeByPath[role];
  const modules = roleModules[roleCode];

  const module = modules.find(
    (item) => item.code === moduleCode,
  );

  console.log("ROUTE DEBUG:", {
  moduleCode,
  transactionCode,
  role,
  roleCode,
  availableModules: modules.map((item) => item.code),
  foundModule: module?.code,
  availableTransactions: module?.transactions.map(
    (item) => item.code,
  ),
});

if (!module) {
  console.error("MODULE NOT FOUND:", moduleCode);
  notFound();
}

const transaction = module.transactions.find(
  (item) => item.code === transactionCode,
);

if (!transaction) {
  console.error("TRANSACTION NOT FOUND:", transactionCode);
  notFound();
}

  return (
    <ModuleLayout
      role={role}
      roleCode={roleCode}
      module={module}
      selectedTransactionCode={transactionCode}
    />
  );
}