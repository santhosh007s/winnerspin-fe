import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Withdrawal {
  id: string
  amount: number
  status: "Processing" | "Completed" | "Rejected"
  date: string
  requestedAt: string
}

interface WithdrawalState {
  withdrawals: Withdrawal[]
  isLoading: boolean
  error: string | null
}

const initialState: WithdrawalState = {
  withdrawals: [],
  isLoading: false,
  error: null,
}

export const fetchWithdrawals = createAsyncThunk("withdrawal/fetchWithdrawals", async (_, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const response = await fetch("http://127.0.0.1:3000/promoter/all-withdrawals", {
    headers: {
      token: state.auth.token,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch withdrawals")
  }

  const data = await response.json()
  return data.withdrawals
})

export const requestWithdrawal = createAsyncThunk(
  "withdrawal/requestWithdrawal",
  async (amount: number, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const response = await fetch("http://127.0.0.1:3000/promoter/request-withdrawal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: state.auth.token,
      },
      body: JSON.stringify({ amount }),
    })

    if (!response.ok) {
      throw new Error("Failed to request withdrawal")
    }

    const data = await response.json()
    return data
  },
)

const withdrawalSlice = createSlice({
  name: "withdrawal",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWithdrawals.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchWithdrawals.fulfilled, (state, action) => {
        state.isLoading = false
        state.withdrawals = action.payload
      })
      .addCase(fetchWithdrawals.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch withdrawals"
      })
      .addCase(requestWithdrawal.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(requestWithdrawal.fulfilled, (state) => {
        state.isLoading = false
        // Refresh withdrawals list would be handled by refetching
      })
      .addCase(requestWithdrawal.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to request withdrawal"
      })
  },
})

export const { clearError } = withdrawalSlice.actions
export default withdrawalSlice.reducer
