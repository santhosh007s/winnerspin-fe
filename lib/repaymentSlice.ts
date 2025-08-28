import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Repayment {
  id: string
  amount: number
  cardNo: string
  customerId: string
  customerName: string
  seasonId: string
  paymentDate: string
  createdAt: string
}

interface RepaymentState {
  repayments: Repayment[]
  isLoading: boolean
  error: string | null
}

const initialState: RepaymentState = {
  repayments: [],
  isLoading: false,
  error: null,
}

export const fetchRepayments = createAsyncThunk("repayment/fetchRepayments", async (_, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const response = await fetch("http://127.0.0.1:3000/promoter/all-repayments", {
    headers: {
      token: state.auth.token,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch repayments")
  }

  const data = await response.json()
  return data.repayments
})

export const addRepayment = createAsyncThunk(
  "repayment/addRepayment",
  async (
    repaymentData: {
      amount: number
      cardNo: string
      customerId: string
      seasonId: string
      paymentDate: string
    },
    { getState },
  ) => {
    const state = getState() as { auth: { token: string } }
    const response = await fetch("http://127.0.0.1:3000/promoter/add-repayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: state.auth.token,
      },
      body: JSON.stringify(repaymentData),
    })

    if (!response.ok) {
      throw new Error("Failed to add repayment")
    }

    const data = await response.json()
    return data
  },
)

const repaymentSlice = createSlice({
  name: "repayment",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepayments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRepayments.fulfilled, (state, action) => {
        state.isLoading = false
        state.repayments = action.payload
      })
      .addCase(fetchRepayments.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch repayments"
      })
      .addCase(addRepayment.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(addRepayment.fulfilled, (state) => {
        state.isLoading = false
        // Refresh repayments list would be handled by refetching
      })
      .addCase(addRepayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to add repayment"
      })
  },
})

export const { clearError } = repaymentSlice.actions
export default repaymentSlice.reducer
