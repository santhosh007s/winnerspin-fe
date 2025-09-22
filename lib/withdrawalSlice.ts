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

export const fetchWithdrawals = createAsyncThunk(
  "withdrawal/fetchWithdrawals",
  async ({ seasonId }: { seasonId: string }, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const response = await fetch(`/api/promoter/all-withdrawals?seasonId=${seasonId}`, {
    headers: {
      token: state.auth.token,
      seasonid: seasonId,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch withdrawals")
  }

  const data = await response.json()
  return data.withdrawals
  },
)

export const requestWithdrawal = createAsyncThunk(
  "withdrawal/requestWithdrawal",
  async ({ amount, seasonId }: { amount: number; seasonId: string }, { rejectWithValue, getState }) => {
    const state = getState() as { auth: { token: string } }
    const response = await fetch("/api/promoter/request-withdrawal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: state.auth.token,
        seasonid: seasonId,
      },
      body: JSON.stringify({ amount }),
    })

    const data = await response.json()
    if (!response.ok) {
      
      throw new Error(data.message || "Server error")
    }

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
        state.error = action.error.message || "Failed  withdrawal"
      })
  },
})

export const { clearError } = withdrawalSlice.actions
export default withdrawalSlice.reducer
