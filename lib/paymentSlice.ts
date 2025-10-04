import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"
import { fetchPromoterProfile } from "./authSlice"

export interface PaymentDetails {
  _id: string
  bankName: string
  accNo: string
  ifscCode: string
  accHolderName: string
  upiId?: string
  branch?: string
  branchAdress?: string
}

interface PaymentState {
  details: PaymentDetails | null
  isLoading: boolean
  error: string | null
}

const initialState: PaymentState = {
  details: null,
  isLoading: false,
  error: null,
}

export const addPaymentDetails = createAsyncThunk(
  "payment/addPaymentDetails",
  async (paymentDetails: Omit<PaymentDetails, "_id">, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    try {
      const response = await fetch(`/api/promoter/add-payment-details?seasonId=${state.season.currentSeason?._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: state.auth.token!,
          seasonid: state.season.currentSeason?._id,
        },
        body: JSON.stringify(paymentDetails),
      })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to add payment details")
      }
      // The backend doesn't return the details, so we optimistically update
      return paymentDetails as PaymentDetails
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Listen for the fetchPromoterProfile action
      .addCase(fetchPromoterProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPromoterProfile.fulfilled, (state, action) => {
        state.isLoading = false
        // The payload from fetchPromoterProfile contains the whole promoter object
        state.details = action.payload.payment || null
      })
      .addCase(fetchPromoterProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || "Failed to fetch profile data"
      })
      .addCase(addPaymentDetails.fulfilled, (state, action: PayloadAction<PaymentDetails>) => {
        state.details = action.payload
      })
  },
})

export default paymentSlice.reducer