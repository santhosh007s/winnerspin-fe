import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Promoter {
  userid: string
  username: string
  email: string
  mobNo: string
}

interface Season {
  _id: string
  season: string
  startDate: string
  endDate: string
}

interface CustomerProfile {
  _id: string
  cardNo: string
  username: string
  email: string
  mobile: string
  address: string
  pincode: string
  city: string
  state: string
  createdAt: string
  status: "approved" | "pending"
  seasons: Season[]
  promoter?: Promoter
}

interface CustomerProfileState {
  profile: CustomerProfile | null
  isLoading: boolean
  error: string | null
}

const initialState: CustomerProfileState = {
  profile: null,
  isLoading: false,
  error: null,
}

// Async thunk to fetch customer profile
export const fetchCustomerProfile = createAsyncThunk("customerProfile/fetchProfile", async () => {
  const response = await fetch("/api/customer/profile")

  if (!response.ok) {
    throw new Error("Failed to fetch profile")
  }

  const data = await response.json()
  return data.customer as CustomerProfile
})

// Async thunk to update customer profile
export const updateCustomerProfile = createAsyncThunk(
  "customerProfile/updateProfile",
  async (profileData: Partial<CustomerProfile>) => {
    const response = await fetch("/api/customer/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    })

    if (!response.ok) {
      throw new Error("Failed to update profile")
    }

    return response.json()
  },
)

const customerProfileSlice = createSlice({
  name: "customerProfile",
  initialState,
  reducers: {
    clearProfileError: (state) => {
      state.error = null
    },
    resetProfile: (state) => {
      state.profile = null
      state.error = null
      state.isLoading = false
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile cases
      .addCase(fetchCustomerProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCustomerProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload
        state.error = null
      })
      .addCase(fetchCustomerProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch profile"
      })
      // Update profile cases
      .addCase(updateCustomerProfile.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateCustomerProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.profile = action.payload.customer
        state.error = null
      })
      .addCase(updateCustomerProfile.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to update profile"
      })
  },
})

export const { clearProfileError, resetProfile } = customerProfileSlice.actions
export default customerProfileSlice.reducer
