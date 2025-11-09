import { createSelector } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"

const selectCustomerAuthLoading = (state: RootState) => state.customerAuth.isLoading
const selectCustomerProfileLoading = (state: RootState) => state.customerProfile.isLoading
const selectInstallmentsLoading = (state: RootState) => state.installments.isLoading
const selectPromoterLoading = (state: RootState) => state.promoter.isLoading

export const selectIsGlobalLoading = createSelector(
  [selectCustomerAuthLoading, selectCustomerProfileLoading, selectInstallmentsLoading, selectPromoterLoading],
  (auth, profile, installments, promoter) => auth || profile || installments || promoter,
)