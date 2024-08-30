import { PermissionResponse, useCameraPermissions } from "expo-camera";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface PermissionContextType {
  permission: PermissionResponse | null;
  requestPermission: () => Promise<PermissionResponse> | null;
  isPermissionGranted: boolean;
  setIsPermissionGranted: (value: boolean) => void;
}

const PermissionContext = createContext<PermissionContextType | null>(null);

interface PermissionsProviderProps {
  children: ReactNode;
}

export const PermissionsProvider = ({ children }: PermissionsProviderProps) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [isPermissionGranted, setIsPermissionGranted] =
    useState<boolean>(false);

  useEffect(() => {
    if (permission) {
      setIsPermissionGranted(Boolean(permission.granted));
    }
  }, [permission]);

  return (
    <PermissionContext.Provider
      value={{
        permission,
        requestPermission,
        isPermissionGranted,
        setIsPermissionGranted,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};
