import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface PaymentDetails {
  bankName: string
  accountNumber: string
  ifscCode: string
  accountHolderName: string
}

interface WalletState {
  earnings: number
  paymentDetails: PaymentDetails | null
  isLoading: boolean
  error: string | null
}

const initialState: WalletState = {
  earnings: 0,
  paymentDetails: null,
  isLoading: false,
  error: null,
}

export const fetchEarnings = createAsyncThunk("wallet/fetchEarnings", async (_, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const response = await fetch("http://127.0.0.1:3000/promoter/earnings", {
    headers: {
      token: state.auth.token,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch earnings")
  }

  const data = await response.json()
  return data.earnings
})

export const addPaymentDetails = createAsyncThunk(
  "wallet/addPaymentDetails",
  async (paymentDetails: PaymentDetails, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const response = await fetch("http://127.0.0.1:3000/promoter/add-payment-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: state.auth.token,
      },
      body: JSON.stringify(paymentDetails),
    })

    if (!response.ok) {
      throw new Error("Failed to add payment details")
    }

    const data = await response.json()
    return paymentDetails
  },
)

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarnings.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchEarnings.fulfilled, (state, action) => {
        state.isLoading = false
        state.earnings = action.payload
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch earnings"
      })
      .addCase(addPaymentDetails.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addPaymentDetails.fulfilled, (state, action) => {
        state.isLoading = false
        state.paymentDetails = action.payload
      })
      .addCase(addPaymentDetails.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to add payment details"
      })
  },
})

export const { clearError } = walletSlice.actions
export default walletSlice.reducer
