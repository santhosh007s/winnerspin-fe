import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface User {
  _id: string
  userid: string
  username: string
  email: string
  mobNo: string
  address: string
  city: string
  state: string
  pincode: string
  status: "approved" | "pending"
  balance: number
  customers: string[]
  createdBy: string
}

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  isLoading: false,
  error: null,
}

export const loginPromoter = createAsyncThunk(
  "auth/loginPromoter",
  async ({ username, password }: { username: string; password: string }) => {
    const response = await fetch("/api/promoter/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })

    if (!response.ok) {
      throw new Error("Login failed")
    }

    const data = await response.json()
    return data
  },
)

export const fetchPromoterProfile = createAsyncThunk("auth/fetchProfile", async (seasonId: string, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const response = await fetch(`/api/promoter/profile?seasonId=${seasonId}`, {
    method: "GET",
    headers: {
      token: state.auth.token,
      seasonid: seasonId,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch profile")
  }

  const data = await response.json()
  return data.promoter
})

export const updatePromoterProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updateData: Partial<User>, { getState, rejectWithValue }) => {
    const state = getState() as RootState
    const seasonId = state.season.currentSeason?._id
    if (!seasonId) {
      return rejectWithValue("No active season selected")
    }
    try {
      const response = await fetch("/api/promoter/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: state.auth.token!,
          seasonid: seasonId,
        },
        body: JSON.stringify(updateData),
      })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update profile")
      }
      return data.promoter
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.error = null
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginPromoter.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginPromoter.fulfilled, (state, action) => {
        state.isLoading = false
        state.token = action.payload.token
        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token)
        }
      })
      .addCase(loginPromoter.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Login failed"
      })
      .addCase(fetchPromoterProfile.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(updatePromoterProfile.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePromoterProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
      })
      .addCase(updatePromoterProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || "Failed to update profile"
      })
  },
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer
