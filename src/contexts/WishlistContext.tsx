import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

// Define the Product type which matches the product structure used in ProductCard
interface Product {
  id: string | number;
  name: string;
  price: number;
  discountPrice?: number;
  images: string[];
  rating?: number;
  ratingCount?: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  discount?: number;
  description?: string;
}

// Define the context interface
interface WishlistContextType {
  wishlist: Product[];
  wishlistItems: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  clearWishlist: () => void;
}

// Create the context with default values
export const WishlistContext = createContext<WishlistContextType>({
  wishlist: [],
  wishlistItems: [],
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
});

// Define props for the WishlistProvider component
interface WishlistProviderProps {
  children: ReactNode;
}

// Wishlist provider component
export const WishlistProvider: React.FC<WishlistProviderProps> = ({
  children,
}) => {
  // Initialize wishlist state, try to load from localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // Add product to wishlist
  const addToWishlist = (product: Product) => {
    setWishlist((prevWishlist) => {
      // Check if the product is already in the wishlist
      if (prevWishlist.some((item) => item.id === product.id)) {
        return prevWishlist;
      }
      return [...prevWishlist, product];
    });
  };

  // Remove product from wishlist
  const removeFromWishlist = (productId: string | number) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((product) => product.id !== productId)
    );
  };

  // Check if a product is in the wishlist
  const isInWishlist = (productId: string | number) => {
    return wishlist.some((product) => product.id === productId);
  };

  // Clear the entire wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  // Provide context values to children
  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItems: wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom hook to use the wishlist context
export const useWishlist = () => useContext(WishlistContext);

export default WishlistProvider;
