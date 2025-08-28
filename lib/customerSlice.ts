import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

interface Customer {
  id: string
  username: string
  email: string
  mobile: string
  cardNo: string
  state: string
  city: string
  address: string
  pincode: string
  firstPayment: number
  paymentDate: string
  seasonId: string
}

interface CustomerState {
  customers: Customer[]
  selectedCustomer: Customer | null
  isLoading: boolean
  error: string | null
}

const initialState: CustomerState = {
  customers: [],
  selectedCustomer: null,
  isLoading: false,
  error: null,
}

export const fetchCustomers = createAsyncThunk("customer/fetchCustomers", async (_, { getState }) => {
  const state = getState() as { auth: { token: string } }
  const response = await fetch("http://127.0.0.1:3000/promoter/all-customers", {
    headers: {
      token: state.auth.token,
    },
  })

  if (!response.ok) {
    throw new Error("Failed to fetch customers")
  }

  const data = await response.json()
  return data.customers
})

export const fetchCustomerDetails = createAsyncThunk(
  "customer/fetchCustomerDetails",
  async (customerId: string, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const response = await fetch(`http://127.0.0.1:3000/promoter/customer-details?id=${customerId}`, {
      headers: {
        token: state.auth.token,
      },
    })

    if (!response.ok) {
      throw new Error("Failed to fetch customer details")
    }

    const data = await response.json()
    return data.customer
  },
)

export const createCustomer = createAsyncThunk(
  "customer/createCustomer",
  async (customerData: Omit<Customer, "id" | "cardNo">, { getState }) => {
    const state = getState() as { auth: { token: string } }
    const response = await fetch("http://127.0.0.1:3000/promoter/create-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: state.auth.token,
      },
      body: JSON.stringify(customerData),
    })

    if (!response.ok) {
      throw new Error("Failed to create customer")
    }

    const data = await response.json()
    return data
  },
)

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    clearSelectedCustomer: (state) => {
      state.selectedCustomer = null
    },
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.isLoading = false
        state.customers = action.payload
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to fetch customers"
      })
      .addCase(fetchCustomerDetails.fulfilled, (state, action) => {
        state.selectedCustomer = action.payload
      })
      .addCase(createCustomer.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createCustomer.fulfilled, (state) => {
        state.isLoading = false
        // Refresh customers list would be handled by refetching
      })
      .addCase(createCustomer.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message || "Failed to create customer"
      })
  },
})

export const { clearSelectedCustomer, clearError } = customerSlice.actions
export default customerSlice.reducer
