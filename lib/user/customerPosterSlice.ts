import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "../store"
 
interface Poster {
  _id: string
  url: string
  audience: "customer" | "promoter"
  season: string
  createdAt: string
  updatedAt: string
}

interface PosterState {
  newPoster: Poster | null
  isLoading: boolean
  error: string | null
}

const initialState: PosterState = {
  newPoster: null,
  isLoading: false,
  error: null,
}

export const fetchCustomerNewPoster = createAsyncThunk(
  "customerPoster/fetchNew",
  async (_, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    const seasonId = state.customerAuth.seasonId
    if (!seasonId) {
      return rejectWithValue("Customer is not part of an active season.")
    }

    try {
      const response = await fetch(`/api/customer/new-poster?seasonId=${seasonId}`)
      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch new poster for customer")
      }
      return data.newPoster
    } catch (error) {
      if(error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An error occurred while fetching the new poster for customer")
    }
  }
)

const customerPosterSlice = createSlice({
  name: "customerPoster",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerNewPoster.fulfilled, (state, action: PayloadAction<Poster | null>) => {
        state.newPoster = action.payload
      })
  },
})

export default customerPosterSlice.reducer