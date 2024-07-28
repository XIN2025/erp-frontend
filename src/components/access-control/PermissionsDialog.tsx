import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";

const modules = [
  { label: "Common Master", icon: "UserRoundCog" },
  { label: "Project HR Management", icon: "UsersRound" },
  { label: "Accounting System", icon: "Landmark" },
  { label: "Material Management", icon: "HardHat" },
  { label: "Machine Management", icon: "Cog" },
  { label: "Sales Accounting System", icon: "HandCoins" },
  { label: "Execution System", icon: "Repeat" },
  { label: "Workforce Management", icon: "Wrench" },
];

const actions = ["ADD", "MODIFY", "VIEW", "CANCEL", "APPROVE"];

interface Module {
  ModuleName: string;
  Permissions: string[];
}

interface PermissionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (modules: Module[]) => void;
  initialModules: Module[];
}

const PermissionsDialog: React.FC<PermissionsDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialModules,
}) => {
  const [activeModule, setActiveModule] = useState(modules[0].label);
  const [modulePermissions, setModulePermissions] = useState<Module[]>([]);

  useEffect(() => {
    setModulePermissions(
      modules.map((m) => {
        const existingModule = initialModules.find(
          (im) => im.ModuleName === m.label
        );
        return existingModule || { ModuleName: m.label, Permissions: [] };
      })
    );
  }, [initialModules]);

  const handlePermissionChange = (
    moduleName: string,
    action: string,
    checked: boolean
  ) => {
    setModulePermissions((prevModules) =>
      prevModules.map((module) => {
        if (module.ModuleName === moduleName) {
          let newPermissions = [...module.Permissions];

          if (checked) {
            // If adding a permission
            if (action === "APPROVE") {
              // Remove ADD and MODIFY if APPROVE is being added
              newPermissions = newPermissions.filter(
                (p) => p !== "ADD" && p !== "MODIFY"
              );
            } else if (action === "ADD" || action === "MODIFY") {
              // Remove APPROVE if ADD or MODIFY is being added
              newPermissions = newPermissions.filter((p) => p !== "APPROVE");
            }
            newPermissions.push(action);
          } else {
            // If removing a permission
            newPermissions = newPermissions.filter((p) => p !== action);
          }

          return { ...module, Permissions: newPermissions };
        }
        return module;
      })
    );
  };

  const handleModuleToggle = (moduleName: string, enabled: boolean) => {
    setModulePermissions((prevModules) =>
      prevModules.map((module) =>
        module.ModuleName === moduleName
          ? {
              ...module,
              Permissions: enabled ? ["VIEW", "CANCEL"] : [],
            }
          : module
      )
    );
  };

  const handleConfirm = () => {
    onConfirm(modulePermissions.filter((m) => m.Permissions.length > 0));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Manage Permissions
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow flex overflow-hidden">
          <div className="w-1/3 border-r pr-4">
            <ScrollArea className="h-full">
              {modules.map((module) => (
                <Button
                  key={module.label}
                  variant={activeModule === module.label ? "default" : "ghost"}
                  className="w-full justify-start mb-2"
                  onClick={() => setActiveModule(module.label)}
                >
                  {module.label}
                </Button>
              ))}
            </ScrollArea>
          </div>
          <div className="w-2/3 pl-4">
            <ScrollArea className="h-full">
              <div className="space-y-6">
                {modules.map((module) => {
                  const currentModule = modulePermissions.find(
                    (m) => m.ModuleName === module.label
                  );
                  const isEnabled =
                    currentModule && currentModule.Permissions.length > 0;

                  return (
                    <div
                      key={module.label}
                      className={activeModule === module.label ? "" : "hidden"}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <Label
                          htmlFor={`enable-${module.label}`}
                          className="text-lg font-semibold"
                        >
                          {module.label}
                        </Label>
                        <Switch
                          id={`enable-${module.label}`}
                          checked={isEnabled}
                          onCheckedChange={(checked) =>
                            handleModuleToggle(module.label, checked)
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        {actions.map((action) => (
                          <div
                            key={action}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`${module.label}-${action}`}
                              checked={currentModule?.Permissions.includes(
                                action
                              )}
                              onCheckedChange={(checked) =>
                                handlePermissionChange(
                                  module.label,
                                  action,
                                  checked as boolean
                                )
                              }
                              disabled={
                                !isEnabled ||
                                (action === "APPROVE" &&
                                  (currentModule?.Permissions.includes("ADD") ||
                                    currentModule?.Permissions.includes(
                                      "MODIFY"
                                    )))
                              }
                            />
                            <Label
                              htmlFor={`${module.label}-${action}`}
                              className={isEnabled ? "" : "opacity-50"}
                            >
                              {action}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionsDialog;
