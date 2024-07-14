import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/utils";
import { optionsForSelection } from "@/config/OptionsForSelection";

interface GSTData {
  SerialNo: number;
  GSTRegNo: string;
  GSTState: string;
  GSTAddress: string;
  [key: string]: string | number;
}

export interface CompanyDetail {
  COIDate: string;
  CertificateOfIncorporationNo: string;
  CompanyName: string;
  ESIRegistrationNo: string;
  ESIState: string;
  ESISubRegistrationNo: string;
  ESISubState: string;
  Gsts: GSTData[];
  MSME: string;
  MSMEUdyam: string;
  PFRegistrationNo: string;
  PFState: string;
  PFSubRegistrationNo: string;
  PFSubState: string;
  PermanentAccountNumber: string;
  RegisteredOfficeAddress: string;
  ServiceTaxRegistrationNo: string;
  Status: string;
  Tags: string;
  VATRegistrationNo: string;
  created_at: string;
  created_by: string;
  id: string;
  updated_at: string;
}

export function useCompanyDetailsOrOptions() {
  const [dynamicOptions, setDynamicOptions] = useState<
    Record<string, string[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<CompanyDetail[]>([]);
  const [allCostCenters, setAllCostCenters] = useState<any[]>([]);
  const [allActivity, setAllactivity] = useState<any[]>([]);
  const [AllMajorScItemGroups, setAllMajorScItemGroups] = useState<any[]>([]);
  const [allMachineGroups, setAllMachineGroups] = useState<any[]>([]);
  const [allMachineClasses, setAllMachineClasses] = useState<any[]>([]);
  const [allAccounts, setAllaccounts] = useState<any[]>([]);

  const fetchRequiredData = useCallback(async (requiredFields: string[]) => {
    setLoading(true);
    try {
      for (const field of requiredFields) {
        let response;

        switch (field) {
          case "CompanyName":
            response = await apiClient.get(
              "/commonMaster/companyDetails/allCompanyDetails"
            );
            if (
              response.data.success &&
              Array.isArray(response.data.allCompanyDetails)
            ) {
              const companyData = response.data.allCompanyDetails;
              setCompanyDetails(companyData);
              const companyNames = companyData.map(
                (company: CompanyDetail) => company.CompanyName
              );
              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                CompanyName: companyNames,
              }));
            }
            break;
          case "Benefits":
            response = await apiClient.get(
              "/commonMaster/benefitsMaster/allBenefitsMaster"
            );
            if (response.data.success) {
              const benefitCodes = response.data.allBenefitsMaster.map(
                (benefit: any) =>
                  `${benefit.BenefitCode}-${benefit.BenefitDescription}`
              );
              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                Benefits: benefitCodes,
              }));
            }
            break;
          case "CostCenterName":
            response = await apiClient.get(
              "/commonMaster/costCenter/allCostCenter"
            );
            if (response.data.success) {
              setAllCostCenters(response.data.allCostCenter);
            }
            break;
          case "UOM":
            response = await apiClient.get(
              "/commonMaster/unitOfMeasurement/allUnitOfMeasurement"
            );
            if (response.data.success) {
              const UOMCode = response.data.allUnitOfMeasurements.map(
                (UOM: any) => UOM.UOMCode
              );
              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                UOM: UOMCode,
              }));
            }
            break;
          case "MaterialGroupCode":
            response = await apiClient.get(
              "/commonMaster/materialGroup/allMaterialGroup"
            );
            if (response.data.success) {
              const material = response.data.allMaterialGroup.map(
                (material: any) =>
                  `${material.MaterialGroupCode}-${material.MaterialMajorGroupDescription}-${material.MaterialMinorGroupDescription}-${material.MaterialSubGroupDescription}`
              );

              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                MaterialGroupCode: material,
              }));
            }
            break;
          case "MachineGroupCode":
            response = await apiClient.get(
              "/commonMaster/machineGroup/allMachineGroup"
            );

            setAllMachineGroups(response.data.allMachineGroup);
            if (response.data.success) {
              const MachineGroupCode = response.data.allMachineGroup.map(
                (machine: any) =>
                  `${machine.MachineGroupCode}-${machine.MachineGroupDescription}`
              );

              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                MachineGroupCode,
              }));
            }
            break;
          case "MachineClassCode":
            response = await apiClient.get(
              "/commonMaster/machineClass/allMachineClass"
            );
            setAllMachineClasses(response.data.allMachineClasses);
            if (response.data.success) {
              const MachineClassCode = response.data.allMachineClasses.map(
                (machine: any) => `${machine.MachineClassCode}`
              );

              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                MachineClassCode,
              }));
            }
            break;
          case "ActivityCode":
            response = await apiClient.get(
              "/commonMaster/activity/allActivity"
            );
            setAllactivity(response.data.allActivities);
            if (response.data.success) {
              const ActivityCode = response.data.allActivities.map(
                (activity: any) => `${activity.ActivityCode}`
              );

              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                ActivityCode,
              }));
            }
            break;
          case "AccountCode":
            response = await apiClient.get("/commonMaster/account/allAccount");
            setAllaccounts(response.data.allAccounts);
            if (response.data.success) {
              const AccountCode = response.data.allAccounts.map(
                (account: any) =>
                  `${account.AccountCode}-${account.AccountDescription}`
              );

              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                AccountCode,
              }));
            }
            break;
          case "MajorSCItemGroupCode":
            response = await apiClient.get(
              "/commonMaster/majorSCItemGroup/allMajorSCItemGroup"
            );
            setAllMajorScItemGroups(response.data.allMajorSCItemGroup);
            if (response.data.success) {
              const MajorSCItemGroupCode =
                response.data.allMajorSCItemGroup.map(
                  (MajorSCItemGroup: any) =>
                    `${MajorSCItemGroup.MajorSCItemGroupCode}`
                );

              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                MajorSCItemGroupCode,
              }));
            }
            break;
        }
      }
    } catch (error) {
      console.log(`error fetching data`, error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateCostCenters = useCallback(
    (selectedCompany: string) => {
      const filteredCostCenters = allCostCenters
        .filter((costCenter) => costCenter.CompanyName === selectedCompany)
        .map((costCenter) => costCenter.CostCenterName);

      setDynamicOptions((prevOptions) => ({
        ...prevOptions,
        CostCenterName: filteredCostCenters,
      }));
    },
    [allCostCenters]
  );

  return {
    loading,
    dynamicOptions,
    fetchRequiredData,
    companyDetails,
    updateCostCenters,
    allActivity,
    AllMajorScItemGroups,
    allMachineGroups,
    allAccounts,
    allMachineClasses,
  };
}
