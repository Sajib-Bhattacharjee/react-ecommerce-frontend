import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserProfile extends User {
  phone?: string;
  addresses: Address[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<UserProfile>) => Promise<void>;
  addAddress: (address: Omit<Address, "id">) => Promise<void>;
  updateAddress: (address: Address) => Promise<void>;
  removeAddress: (id: number) => Promise<void>;
  setDefaultAddress: (id: number) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  updateProfile: async () => {},
  addAddress: async () => {},
  updateAddress: async () => {},
  removeAddress: async () => {},
  setDefaultAddress: async () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

// Define the mock user type that includes password
interface MockUser extends UserProfile {
  password: string;
}

// Mock data for demonstration (in a real app, this would come from an API)
const mockUsers: MockUser[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    phone: "123-456-7890",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    addresses: [
      {
        id: 1,
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
        isDefault: true,
      },
    ],
  },
];

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const foundUser = mockUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) {
        throw new Error("Invalid credentials");
      }

      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const existingUser = mockUsers.find((u) => u.email === email);

      if (existingUser) {
        throw new Error("User already exists");
      }

      const newUser: MockUser = {
        id: mockUsers.length + 1,
        name,
        email,
        password,
        addresses: [],
        avatar: `https://randomuser.me/api/portraits/men/${Math.floor(
          Math.random() * 100
        )}.jpg`,
      };

      mockUsers.push(newUser);

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = async (userData: Partial<UserProfile>) => {
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        throw new Error("User not authenticated");
      }

      setUser({ ...user, ...userData });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const addAddress = async (address: Omit<Address, "id">) => {
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        throw new Error("User not authenticated");
      }

      const newAddress = {
        ...address,
        id: user.addresses.length
          ? Math.max(...user.addresses.map((a) => a.id)) + 1
          : 1,
      };

      // If it's the first address or marked as default, set it as default
      if (user.addresses.length === 0 || newAddress.isDefault) {
        // Set all other addresses to non-default
        const updatedAddresses = user.addresses.map((a) => ({
          ...a,
          isDefault: false,
        }));

        setUser({
          ...user,
          addresses: [...updatedAddresses, newAddress],
        });
      } else {
        setUser({
          ...user,
          addresses: [...user.addresses, newAddress],
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateAddress = async (address: Address) => {
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        throw new Error("User not authenticated");
      }

      // If the address is being set as default, update all other addresses
      if (address.isDefault) {
        const updatedAddresses = user.addresses.map((a) => ({
          ...a,
          isDefault: a.id === address.id,
        }));

        setUser({
          ...user,
          addresses: updatedAddresses,
        });
      } else {
        // Otherwise, just update the specific address
        const updatedAddresses = user.addresses.map((a) =>
          a.id === address.id ? address : a
        );

        setUser({
          ...user,
          addresses: updatedAddresses,
        });
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const removeAddress = async (id: number) => {
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        throw new Error("User not authenticated");
      }

      const updatedAddresses = user.addresses.filter((a) => a.id !== id);

      // If the removed address was the default and there are other addresses,
      // set the first one as default
      if (
        user.addresses.find((a) => a.id === id)?.isDefault &&
        updatedAddresses.length > 0
      ) {
        updatedAddresses[0].isDefault = true;
      }

      setUser({
        ...user,
        addresses: updatedAddresses,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const setDefaultAddress = async (id: number) => {
    setIsLoading(true);

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (!user) {
        throw new Error("User not authenticated");
      }

      const updatedAddresses = user.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }));

      setUser({
        ...user,
        addresses: updatedAddresses,
      });
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        addAddress,
        updateAddress,
        removeAddress,
        setDefaultAddress,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
