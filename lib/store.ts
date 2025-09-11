import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./authSlice"
import seasonSlice from "./seasonSlice"
import customerSlice from "./customerSlice"
import repaymentSlice from "./repaymentSlice"
import walletSlice from "./walletSlice"
import withdrawalSlice from "./withdrawalSlice"
import paymentReducer from "./paymentSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    season: seasonSlice,
    customer: customerSlice,
    repayment: repaymentSlice,
    wallet: walletSlice,
    withdrawal: withdrawalSlice,
    payment: paymentReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
