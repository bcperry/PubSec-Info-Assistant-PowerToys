import React, { createContext, useContext, useState, useEffect } from "react";

const UserRoleContext = createContext<{ userRole: "user" | "admin" }>({ userRole: "user" });

export const UserRoleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [userRole, setUserRole] = useState<"user" | "admin">("user");

    useEffect(() => {
        // Fetch user role from authentication context or API
        const fetchUserRole = async () => {
            // Example: Replace with actual authentication logic
            const role = await getUserRoleFromAuth();
            setUserRole(role);
        };

        fetchUserRole();
    }, []);

    return (
        <UserRoleContext.Provider value={{ userRole }}>
            {children}
        </UserRoleContext.Provider>
    );
};

export const useUserRole = () => useContext(UserRoleContext);

// Example function to simulate fetching user role
const getUserRoleFromAuth = async (): Promise<"user" | "admin"> => {
    // Replace with actual authentication logic
    // TODO
    return "admin"; // or "admin"
};
