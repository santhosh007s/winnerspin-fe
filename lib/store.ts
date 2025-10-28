import { configureStore } from "@reduxjs/toolkit";

// Promoter-related slices
import authSlice from "./promoter/authSlice";
import seasonSlice from "./seasonSlice";
import customerSlice from "./customer/customerSlice";
import repaymentSlice from "./promoter/repaymentSlice";
import walletSlice from "./promoter/walletSlice";
import withdrawalSlice from "./promoter/withdrawalSlice";
import posterSlice from "./promoter/posterSlice";
import paymentReducer from "./promoter/paymentSlice";

// Customer-related slices
import customerAuthSlice from "./customer/customerAuthSlice";
import customerProfileSlice from "./customer/customerProfileSlice";
import installmentsSlice from "./customer/installmentsSlice";
import promoterSlice from "./customer/promoterSlice";
import customerPosterSlice from "./customer/customerPosterSlice";

export const store = configureStore({
  reducer: {
    // Promoter reducers
    auth: authSlice,
    season: seasonSlice,
    customer: customerSlice,
    repayment: repaymentSlice,
    wallet: walletSlice,
    withdrawal: withdrawalSlice,
    payment: paymentReducer,
    poster: posterSlice,

    // Customer reducers
    customerAuth: customerAuthSlice,
    customerProfile: customerProfileSlice,
    installments: installmentsSlice,
    promoter: promoterSlice,
    customerPoster: customerPosterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
