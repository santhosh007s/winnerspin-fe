import { configureStore } from "@reduxjs/toolkit";

// Promoter-related slices
import authSlice from "./authSlice";
import seasonSlice from "./seasonSlice";
import customerSlice from "./customerSlice";
import repaymentSlice from "./repaymentSlice";
import walletSlice from "./walletSlice";
import withdrawalSlice from "./withdrawalSlice";
import posterSlice from "./posterSlice";
import paymentReducer from "./paymentSlice";

// Customer-related slices
import customerAuthSlice from "./customerAuthSlice";
import customerProfileSlice from "./customerProfileSlice";
import installmentsSlice from "./installmentsSlice";
import promoterSlice from "./promoterSlice";
import customerPosterSlice from "./customerPosterSlice";

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
