import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Installment {
  id: string
  amount: number
  dueDate: string
  paidDate: string | null
  status: "paid" | "due" | "overdue"
  installmentNumber: number
  description: string
  isVerified: boolean
}

interface InstallmentSummary {
  totalPaid: number
  totalDue: number
  totalBalance: number
  paidCount: number
  dueCount: number
  overdueCount: number
}

interface InstallmentsState {
  installments: Installment[]
  summary: InstallmentSummary | null
  isLoading: boolean
  error: string | null
}

const initialState: InstallmentsState = {
  installments: [],
  summary: null,
  isLoading: false,
  error: null,
}

// Async thunk to fetch installments
export const fetchInstallments = createAsyncThunk("installments/fetchInstallments", async () => {
  const response = await fetch("/api/customer/installments")

  if (!response.ok) {
    throw new Error("Failed to fetch installments")
  }

  return response.json()
})

// Async thunk to fetch installment summary
export const fetchInstallmentSummary = createAsyncThunk("installments/fetchSummary", async () => {
  const response = await fetch("/api/customer/installments/summary")

  if (!response.ok) {
    throw new Error("Failed to fetch installment summary")
  }

  return response.json()
})

const installmentsSlice = createSlice({
  name: "installments",
  initialState,
  reducers: {
    clearInstallmentsError: (state) => {
      state.error = null
    },
    resetInstallments: (state) => {
      state.installments = []
      state.summary = null
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch installments cases
      .addCase(fetchInstallments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchInstallments.fulfilled, (state, action) => {
        state.isLoading = false
        state.installments = action.payload.installments
        state.error = null
      })
      .addCase(fetchInstallments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch installments"
      })
      // Fetch summary cases
      .addCase(fetchInstallmentSummary.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchInstallmentSummary.fulfilled, (state, action) => {
        state.isLoading = false
        state.summary = action.payload.summary
        state.error = null
      })
      .addCase(fetchInstallmentSummary.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch summary"
      })
  },
})

export const { clearInstallmentsError, resetInstallments } = installmentsSlice.actions
export default installmentsSlice.reducer
