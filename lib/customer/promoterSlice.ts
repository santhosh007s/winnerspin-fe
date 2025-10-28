import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Promoter {
  _id: string
  username: string
  email: string
  mobNo: string
  department?: string
  joinDate?: string
  profileImage?: string
}

interface PromoterState {
  promoter: Promoter | null
  isLoading: boolean
  error: string | null
}

const initialState: PromoterState = {
  promoter: null,
  isLoading: false,
  error: null,
}

// Async thunk to fetch promoter details
export const fetchPromoterDetails = createAsyncThunk("promoter/fetchDetails", async () => {
  const response = await fetch("/api/customer/promoter")

  if (!response.ok) {
    throw new Error("Failed to fetch promoter details")
  }

  return response.json()
})

const promoterSlice = createSlice({
  name: "promoter",
  initialState,
  reducers: {
    clearPromoterError: (state) => {
      state.error = null
    },
    resetPromoter: (state) => {
      state.promoter = null
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch promoter details cases
      .addCase(fetchPromoterDetails.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchPromoterDetails.fulfilled, (state, action) => {
        state.isLoading = false
        const promoterData = action.payload.promoter
        state.promoter = {
          ...promoterData,
          id: promoterData._id,
          name: promoterData.username,
          phone: promoterData.mobNo,
        }
        state.error = null
      })
      .addCase(fetchPromoterDetails.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch promoter details"
      })
  },
})

export const { clearPromoterError, resetPromoter } = promoterSlice.actions
export default promoterSlice.reducer
