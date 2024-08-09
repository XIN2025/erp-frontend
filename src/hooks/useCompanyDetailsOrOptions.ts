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
  const [allBusinessUnits, setAllBusninessUnits] = useState<any[]>([]);
  const [allWareHouses, setallWareHouses] = useState<any[]>([]);
  const [companyGSTNo, setCompanyGSTNo] = useState<any[]>([]);

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
              const companyData = response.data.allCompanyDetails.filter(
                (company: CompanyDetail) => company.Tags.includes("Active")
              );
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
              const benefitCodes = response.data.allBenefitsMaster
                .filter((benefit: any) => benefit.Tags.includes("Active"))
                .map(
                  (benefit: any) =>
                    `${benefit.BenefitCode}-${benefit.BenefitDescription}`
                );
              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                Benefits: benefitCodes,
              }));
            }
            break;
          case "Currency":
            response = await apiClient.get(
              "/commonMaster/currency/allCurrency"
            );

            if (response.data.success) {
              const activeCurrency = response.data.allCurrency
                .filter((currency: any) => currency.Tags.includes("Active"))
                .map((cur: any) => cur.CurrencyName);
              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                Currency: activeCurrency,
              }));
            }
            break;

          case "CustomerName":
            response = await apiClient.get(
              "/commonMaster/customer/allCustomer"
            );
            if (response.data.success) {
              const activeCustomers = response.data.allCustomer
                .filter((customer: any) => customer.Tags.includes("Active"))
                .map((customer: any) => customer.CustomerName);

              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                CustomerName: activeCustomers,
              }));
            }
            break;
          case "WareHouse":
            response = await apiClient.get(
              "/commonMaster/warehouse/allWarehouse"
            );

            if (response.data.success) {
              const activeWarehouse = response.data.allWareHouse.filter(
                (warehouse: any) => warehouse.Tags.includes("Active")
              );

              setallWareHouses(activeWarehouse);
            }
            break;
          case "CostCenterName":
            response = await apiClient.get(
              "/commonMaster/costCenter/allCostCenter"
            );
            if (response.data.success) {
              const activeCostCenters = response.data.allCostCenter.filter(
                (costCenter: any) => costCenter.Tags.includes("Active")
              );
              setAllCostCenters(activeCostCenters);
            }
            break;
          case "BusinessUnit":
            response = await apiClient.get(
              "/commonMaster/businessUnit/allBusinessUnit"
            );
            if (response.data.success) {
              const activeBusinessUnits = response.data.allBusinessUnit.filter(
                (unit: any) => unit.Tags.includes("Active")
              );
              setAllBusninessUnits(activeBusinessUnits);
            }
            break;
          case "UOM":
            response = await apiClient.get(
              "/commonMaster/unitOfMeasurement/allUnitOfMeasurement"
            );
            if (response.data.success) {
              const UOMCode = response.data.allUnitOfMeasurements
                .filter((UOM: any) => UOM.Tags.includes("Active"))
                .map((UOM: any) => UOM.UOMCode);
              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                UOM: UOMCode,
              }));
            }
            break;
          case "EmployeeCode":
            response = await apiClient.get(
              "/commonMaster/employeeMaster/allEmployeeMaster"
            );
            if (response.data.success) {
              const EmployeeCode = response.data.allEmployeeMaster
                .filter((Employee: any) => Employee.Tags.includes("Active"))
                .map(
                  (Employee: any) =>
                    `${Employee.EmployeeCode}-${Employee.EmployeeFirstName}-${Employee.EmployeeLastName}`
                );
              setDynamicOptions((prevOptions) => ({
                ...prevOptions,
                EmployeeCode,
              }));
            }
            break;
          case "MaterialGroupCode":
            response = await apiClient.get(
              "/commonMaster/materialGroup/allMaterialGroup"
            );
            if (response.data.success) {
              const material = response.data.allMaterialGroup
                .filter((material: any) => material.Tags.includes("Active"))
                .map(
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

            const activeMachineGroups = response.data.allMachineGroup.filter(
              (machine: any) => machine.Tags.includes("Active")
            );
            setAllMachineGroups(activeMachineGroups);
            if (response.data.success) {
              const MachineGroupCode = activeMachineGroups.map(
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
            const activeMachineClasses = response.data.allMachineClasses.filter(
              (machine: any) => machine.Tags.includes("Active")
            );
            setAllMachineClasses(activeMachineClasses);
            if (response.data.success) {
              const MachineClassCode = activeMachineClasses.map(
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
            const activeActivities = response.data.allActivities.filter(
              (activity: any) => activity.Tags.includes("Active")
            );
            setAllactivity(activeActivities);
            if (response.data.success) {
              const ActivityCode = activeActivities.map(
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
            const activeAccounts = response.data.allAccounts.filter(
              (account: any) => account.Tags.includes("Active")
            );
            setAllaccounts(activeAccounts);
            if (response.data.success) {
              const AccountCode = activeAccounts.map(
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
            const activeMajorSCItemGroups =
              response.data.allMajorSCItemGroup.filter((item: any) =>
                item.Tags.includes("Active")
              );
            setAllMajorScItemGroups(activeMajorSCItemGroups);
            if (response.data.success) {
              const MajorSCItemGroupCode = activeMajorSCItemGroups.map(
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
  const updateBusinessUnits = useCallback(
    (selectedCompany: string) => {
      const filteredBusinessUnits = allBusinessUnits
        .filter((busniessUnit) => busniessUnit.CompanyName === selectedCompany)
        .map((busniessUnit) => busniessUnit.BusinessUnit);

      setDynamicOptions((prevOptions) => ({
        ...prevOptions,
        BusinessUnit: filteredBusinessUnits,
      }));
    },
    [allBusinessUnits]
  );
  const udpateWarehouses = useCallback(
    (selectedCompany: string) => {
      const filteredWarehouses = allWareHouses
        .filter((warehouse) => warehouse.CompanyName === selectedCompany)
        .map((warehouse) => warehouse.WareHouseName);

      setDynamicOptions((prevOptions) => ({
        ...prevOptions,
        WareHouse: filteredWarehouses,
      }));
    },
    [allWareHouses]
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
    allBusinessUnits,
    updateBusinessUnits,
    allMachineClasses,
    udpateWarehouses,
 
  };
}
