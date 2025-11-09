import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"


interface Promoter {
  _id: string
  userid: string
  name: string
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

interface User {
  id: string
  cardNo: string
  name: string
  email: string
  seasonId: string | null
  mustChangePassword?: boolean
  promoter: Promoter
}


interface CustomerAuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  seasonId: string | null
}

const initialState: CustomerAuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  seasonId: null,
}


// Async thunk for customer login
export const loginCustomer = createAsyncThunk(
  "customerAuth/login",
  async ({ cardNo, password }: { cardNo: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/customer/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardNo, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed")
      }
      return data
    } catch (error) {
      if(error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An error occurred while logging in")
    }
  },
)

// Async thunk for changing password
export const updatePassword = createAsyncThunk(
  "customerAuth/updatePassword",
  async (
    { currentPassword, newPassword }: { currentPassword?: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch("/api/customer/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })
      const data = await response.json()
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to change password.")
      }
      return data
    } catch (error) {
      if(error instanceof Error) return rejectWithValue(error.message);
      return rejectWithValue("An error occurred while changing password")
    }
  },
)

// Async thunk for logout
export const logoutCustomer = createAsyncThunk("customerAuth/logout", async () => {
  const response = await fetch("/api/customer/auth/logout", {
    method: "POST",
  })

  if (!response.ok) {
    throw new Error("Logout failed")
  }

  return response.json()
})

// Async thunk to verify token
export const verifyToken = createAsyncThunk("customerAuth/verifyToken", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/customer/auth/verify", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return rejectWithValue(errorData.message || "Token verification failed")
    }
    
    return response.json()
  } catch (error) {
    if(error instanceof Error) return rejectWithValue(error.message);
    return rejectWithValue("An error occurred while verifying token")
  }
})

const customerAuthSlice = createSlice({
  name: "customerAuth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    resetAuth: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      state.isLoading = false
      state.seasonId = null
    },
    passwordUpdateSuccess: (state) => {
      if (state.user) {
        state.user.mustChangePassword = false
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginCustomer.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(loginCustomer.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.seasonId = action.payload.user.seasonId
        state.error = null
      })
      .addCase(loginCustomer.rejected, (state) => {
        state.isLoading = false
        state.error = "Login failed"
        state.isAuthenticated = false
        state.user = null
      })
      // Logout cases
      .addCase(logoutCustomer.fulfilled, (state) => {
        Object.assign(state, initialState)
      })
      // Verify token cases
      .addCase(verifyToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.isAuthenticated = true
        state.seasonId = action.payload.user.seasonId
        state.error = null
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = (action.payload as string) || "Session expired. Please log in again."
      })
      .addCase(updatePassword.fulfilled, (state) => {
        if (state.user) state.user.mustChangePassword = false
        // No need to set loading or error, dialog handles it
      })
  },
})

export const { clearError, resetAuth, passwordUpdateSuccess } = customerAuthSlice.actions
export default customerAuthSlice.reducer
