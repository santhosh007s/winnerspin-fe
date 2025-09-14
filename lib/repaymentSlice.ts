import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "./store"

interface Installment {
  _id: string
  installmentNo: number
  amount: string
  paymentDate: string
}

interface Due {
  installmentNo: number
  dueDate: string
  amount: string
  status: "due"
}

export interface RepaymentInfo {
  customerId: string
  customerName: string
  cardNo: string
  installments: Installment[]
  dues: Due[]
}

interface RepaymentState {
  repayments: RepaymentInfo[]
  isLoading: boolean
  error: string | null
}

const initialState: RepaymentState = {
  repayments: [],
  isLoading: false,
  error: null,
}

export const fetchRepayments = createAsyncThunk("repayment/fetchRepayments", async (_, { getState, rejectWithValue }) => {
  const state = getState() as RootState
  try {
    const response = await fetch("http://127.0.0.1:3000/promoter/all-repayments", {
      headers: { token: state.auth.token! },
    })
    const data = await response.json()
    if (!response.ok) {
      return rejectWithValue(data.message || "Failed to fetch repayments")
    }
    return data.repayments
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const addRepayment = createAsyncThunk(
  "repayment/addRepayment",
  async (repaymentData: { customerId: string; seasonId: string; amount: string }, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    try {
      const response = await fetch("http://127.0.0.1:3000/promoter/add-repayment", {
        method: "POST",
        headers: { "Content-Type": "application/json", token: state.auth.token! },
        body: JSON.stringify(repaymentData),
      })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to add repayment")
      }
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const repaymentSlice = createSlice({
  name: "repayment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepayments.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchRepayments.fulfilled, (state, action: PayloadAction<RepaymentInfo[]>) => {
        state.isLoading = false
        state.repayments = action.payload
      })
      .addCase(fetchRepayments.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || "Failed to fetch repayments"
      })
      .addCase(addRepayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addRepayment.fulfilled, (state) => {
        state.isLoading = false
        // We will refetch the list after a successful addition
      })
      .addCase(addRepayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || "Failed to add repayment"
      })
  },
})

export default repaymentSlice.reducer