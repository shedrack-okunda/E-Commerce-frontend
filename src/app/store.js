import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/AuthSlice";
import productReducer from "../features/products/ProductSlice";
import cartReducer from "../features/cart/CartSlice";
import addressReducer from "../features/address/AddressSlice";
import userReducer from "../features/user/UserSlice";
import wishlistReducer from "../features/wishlist/WishlistSlice";
import brandReducer from "../features/brands/BrandSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cart: cartReducer,
  address: addressReducer,
  user: userReducer,
  wishlist: wishlistReducer,
  brand: brandReducer,
});
export const store = configureStore({ reducer: rootReducer });
