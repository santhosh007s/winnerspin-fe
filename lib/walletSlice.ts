import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Transaction {
  _id: string
  customer: string // Assuming customer ID, can be populated if needed
  amount: number
  createdAt: string
}

interface WalletState {
  earnings: number
  transactions: Transaction[]
  isLoading: boolean
  error: string | null
}

const initialState: WalletState = {
  earnings: 0,
  transactions: [],
  isLoading: false,
  error: null,
}

export const fetchEarnings = createAsyncThunk("wallet/fetchEarnings", async (seasonId: string, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const response = await fetch(`/api/promoter/all-earnings?seasonId=${seasonId}`, {
    headers: {
      token: state.auth.token,
      seasonid: seasonId,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch earnings")
  }

  const data = await response.json()
  return data // Return the whole object { earnings, transactions }
})

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
        state.earnings = action.payload.earnings
        state.transactions = action.payload.transactions
      })
      .addCase(fetchEarnings.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch earnings"
      })
  },
})

export const { clearError } = walletSlice.actions
export default walletSlice.reducer
