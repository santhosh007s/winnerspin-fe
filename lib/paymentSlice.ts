import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

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

export const fetchPaymentDetails = createAsyncThunk(
  "payment/fetchPaymentDetails",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    try {
      const response = await fetch("http://127.0.0.1:3000/promoter/profile", {
        headers: { token: state.auth.token! },
      })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch payment details")
      }
      return data.promoter.payment
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

export const addPaymentDetails = createAsyncThunk(
  "payment/addPaymentDetails",
  async (paymentDetails: Omit<PaymentDetails, "_id">, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    try {
      const response = await fetch("http://127.0.0.1:3000/promoter/add-payment-details", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: state.auth.token! },
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
      .addCase(fetchPaymentDetails.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPaymentDetails.fulfilled, (state, action: PayloadAction<PaymentDetails | null>) => {
        state.isLoading = false
        state.details = action.payload
      })
      .addCase(addPaymentDetails.fulfilled, (state, action: PayloadAction<PaymentDetails>) => {
        state.details = action.payload
      })
  },
})

export default paymentSlice.reducer