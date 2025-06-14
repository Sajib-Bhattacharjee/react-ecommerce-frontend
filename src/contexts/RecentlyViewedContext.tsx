import React, { createContext, useState, useEffect, ReactNode } from "react";

export interface ViewedProduct {
  id: string | number;
  name: string;
  price: number;
  image: string;
  discount?: number;
  rating?: number;
}

interface RecentlyViewedContextType {
  viewedItems: ViewedProduct[];
  addToRecentlyViewed: (product: ViewedProduct) => void;
  clearRecentlyViewed: () => void;
}

export const RecentlyViewedContext = createContext<RecentlyViewedContextType>({
  viewedItems: [],
  addToRecentlyViewed: () => {},
  clearRecentlyViewed: () => {},
});

interface RecentlyViewedProviderProps {
  children: ReactNode;
  maxItems?: number;
}

export const RecentlyViewedProvider: React.FC<RecentlyViewedProviderProps> = ({
  children,
  maxItems = 8,
}) => {
  const [viewedItems, setViewedItems] = useState<ViewedProduct[]>(() => {
    const savedItems = localStorage.getItem("recentlyViewedItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Save viewedItems to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("recentlyViewedItems", JSON.stringify(viewedItems));
  }, [viewedItems]);

  const addToRecentlyViewed = (product: ViewedProduct) => {
    setViewedItems((prevItems) => {
      // Don't add if already at the beginning of the list
      if (prevItems.length > 0 && prevItems[0].id === product.id) {
        return prevItems;
      }

      // Filter out existing instance if present
      const filteredItems = prevItems.filter((item) => item.id !== product.id);

      // Add as first item and limit to maxItems
      return [product, ...filteredItems].slice(0, maxItems);
    });
  };

  const clearRecentlyViewed = () => {
    setViewedItems([]);
  };

  return (
    <RecentlyViewedContext.Provider
      value={{
        viewedItems,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  );
};

// Custom hook to use the recently viewed context
export const useRecentlyViewed = () => {
  const context = React.useContext(RecentlyViewedContext);
  if (context === undefined) {
    throw new Error(
      "useRecentlyViewed must be used within a RecentlyViewedProvider"
    );
  }
  return context;
};

export default RecentlyViewedProvider;
