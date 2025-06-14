import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface CompareProduct {
  id: string | number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  rating?: number;
}

interface CompareContextType {
  compareItems: CompareProduct[];
  addToCompare: (product: CompareProduct) => void;
  removeFromCompare: (productId: string | number) => void;
  isInCompare: (productId: string | number) => boolean;
  clearCompare: () => void;
}

export const CompareContext = createContext<CompareContextType>({
  compareItems: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  isInCompare: () => false,
  clearCompare: () => {},
});

interface CompareProviderProps {
  children: ReactNode;
}

export const CompareProvider: React.FC<CompareProviderProps> = ({
  children,
}) => {
  const [compareItems, setCompareItems] = useState<CompareProduct[]>(() => {
    const savedItems = localStorage.getItem("compareItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save compareItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compareItems));
  }, [compareItems]);

  const addToCompare = (product: CompareProduct) => {
    // Limit to 4 products for comparison
    if (compareItems.length >= 4) {
      alert(
        "You can compare up to 4 products at a time. Please remove an item before adding a new one."
      );
      return;
    }

    // Check if product is already in the compare list
    if (!isInCompare(product.id)) {
      setCompareItems([...compareItems, product]);
    }
  };

  const removeFromCompare = (productId: string | number) => {
    setCompareItems(compareItems.filter((item) => item.id !== productId));
  };

  const isInCompare = (productId: string | number) => {
    return compareItems.some((item) => item.id === productId);
  };

  const clearCompare = () => {
    setCompareItems([]);
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

// Custom hook to use the compare context
export const useCompare = () => {
  const context = React.useContext(CompareContext);
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider");
  }
  return context;
};

export default CompareProvider;
