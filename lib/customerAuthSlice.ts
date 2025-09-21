import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface CustomerAuthState {
  user: {
    id: string
    cardNumber: string
    name: string
    email: string
  } | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: CustomerAuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
}


// Async thunk for customer login
export const loginCustomer = createAsyncThunk(
  "customerAuth/login",
  async ({ cardNumber, password }: { cardNumber: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/customer/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cardNumber, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        return rejectWithValue(data.message || "Login failed")
      }
      return data
    } catch (error: any) {
      return rejectWithValue(error.message)
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
  } catch (error: any) {
    return rejectWithValue(error.message)
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
        state.error = null
      })
      .addCase(loginCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.error = (action.payload as string) || "Login failed"
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
        state.error = null
      })
      .addCase(verifyToken.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = (action.payload as string) || "Session expired. Please log in again."
      })
  },
})

export const { clearError, resetAuth } = customerAuthSlice.actions
export default customerAuthSlice.reducer
