import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import { CompareProvider } from "./contexts/CompareContext";
import { RecentlyViewedProvider } from "./contexts/RecentlyViewedContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./styles/global.css";
import "./styles/layout.css";
import "./styles/theme.css";
import "./styles/footer-fix.css";
import "./styles/header-responsive-fix.css";
import "bootstrap/dist/css/bootstrap.min.css";
import BestSellersPage from "./pages/BestSellersPage";
import DealsPage from "./pages/DealsPage";
import BlogPage from "./pages/BlogPage";

// Use React.lazy for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const ShopPage = lazy(() => import("./pages/ShopPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const AccountPage = lazy(() => import("./pages/account/AccountPage"));
const WishlistPage = lazy(() => import("./pages/account/WishlistPage"));
const OrdersPage = lazy(() => import("./pages/account/OrdersPage"));
const ProfilePage = lazy(() => import("./pages/account/ProfilePage"));
const AddressesPage = lazy(() => import("./pages/account/AddressesPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const FaqPage = lazy(() => import("./pages/FaqPage"));
const ShippingPage = lazy(() => import("./pages/ShippingPage"));
const ReturnsPage = lazy(() => import("./pages/ReturnsPage"));
const TrackOrderPage = lazy(() => import("./pages/TrackOrderPage"));
const PrivacyPolicyPage = lazy(() => import("./pages/PrivacyPolicyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const SitemapPage = lazy(() => import("./pages/SitemapPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const NewArrivalsPage = lazy(() => import("./pages/NewArrivalsPage"));
const ElectronicsPage = lazy(() => import("./pages/ElectronicsPage"));
const ClothingPage = lazy(() => import("./pages/ClothingPage"));
const HomeKitchenPage = lazy(() => import("./pages/HomeKitchenPage"));

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <CompareProvider>
              <RecentlyViewedProvider>
                <Router>
                  <Suspense
                    fallback={
                      <div className="spinner-container">
                        <div className="spinner"></div>
                      </div>
                    }
                  >
                    <Routes>
                      <Route path="/" element={<Layout />}>
                        <Route index element={<HomePage />} />
                        <Route path="shop" element={<ShopPage />} />
                        <Route
                          path="new-arrivals"
                          element={<NewArrivalsPage />}
                        />
                        <Route
                          path="electronics"
                          element={<ElectronicsPage />}
                        />
                        <Route path="clothing" element={<ClothingPage />} />
                        <Route
                          path="home-kitchen"
                          element={<HomeKitchenPage />}
                        />
                        <Route
                          path="product/:slug"
                          element={<ProductDetailsPage />}
                        />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="account" element={<AccountPage />}>
                          <Route path="wishlist" element={<WishlistPage />} />
                          <Route path="orders" element={<OrdersPage />} />
                          <Route path="profile" element={<ProfilePage />} />
                          <Route path="addresses" element={<AddressesPage />} />
                        </Route>
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="faq" element={<FaqPage />} />
                        <Route path="shipping" element={<ShippingPage />} />
                        <Route path="returns" element={<ReturnsPage />} />
                        <Route
                          path="track-order"
                          element={<TrackOrderPage />}
                        />
                        <Route
                          path="privacy-policy"
                          element={<PrivacyPolicyPage />}
                        />
                        <Route
                          path="terms-conditions"
                          element={<TermsPage />}
                        />
                        <Route path="sitemap" element={<SitemapPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route
                          path="forgot-password"
                          element={<ForgotPasswordPage />}
                        />
                        <Route
                          path="best-sellers"
                          element={<BestSellersPage />}
                        />
                        <Route path="/deals" element={<DealsPage />} />
                        <Route path="/blog" element={<BlogPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Route>
                    </Routes>
                  </Suspense>
                </Router>
              </RecentlyViewedProvider>
            </CompareProvider>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
