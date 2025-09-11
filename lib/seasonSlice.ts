import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"

interface Season {

  _id: string
  season: string
  amount: number
  duration: string
}

interface SeasonState {
  seasons: Season[]
  currentSeason: Season | null
  isLoading: boolean
  error: string | null
}

const initialState: SeasonState = {
  seasons: [],
  currentSeason: null,
  isLoading: false,
  error: null,
}

export const fetchSeasons = createAsyncThunk("season/fetchSeasons", async (_, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const response = await fetch("http://127.0.0.1:3000/promoter/all-seasons", {
    headers: {
      token: state.auth.token,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch seasons")
  }

  const data = await response.json()
  return data // Return the whole payload
})

const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {
    setCurrentSeason: (state, action: PayloadAction<Season>) => {
      state.currentSeason = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeasons.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchSeasons.fulfilled, (state, action: PayloadAction<{ seasons: Season[], curSeason: Season }>) => {
        state.isLoading = false
        state.seasons = action.payload.seasons
        state.currentSeason = action.payload.curSeason
      })
      .addCase(fetchSeasons.rejected, (state, action) => {  
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch seasons"
      })
  },
})

export const { setCurrentSeason } = seasonSlice.actions
export default seasonSlice.reducer
