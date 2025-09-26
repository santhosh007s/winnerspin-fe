"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image, { type ImageProps } from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { fetchNewPoster } from "@/lib/posterSlice"
import { fetchCustomerNewPoster } from "@/lib/customerPosterSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { X } from "lucide-react"

interface NewPosterPopupProps {
  audience: "promoter" | "customer"
}

export function NewPosterPopup({ audience }: NewPosterPopupProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()

  const POPUP_SHOWN_KEY = `newPosterPopupShown_${audience}`

  const { newPoster } = useSelector((state: RootState) =>
    audience === "promoter" ? state.poster : state.customerPoster
  )
  const promoterSeason = useSelector((state: RootState) => state.season.currentSeason)
  const customerSeasonId = useSelector((state: RootState) => state.customerAuth.seasonId)

  // Determine if there is a valid season context to proceed
  const hasValidSeason = audience === "promoter" ? !!promoterSeason : !!customerSeasonId

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem(POPUP_SHOWN_KEY)
    if (hasValidSeason && !hasBeenShown) {
      if (audience === "promoter") {
        dispatch(fetchNewPoster())
      } else {
        dispatch(fetchCustomerNewPoster())
      }
    }
  }, [dispatch, hasValidSeason, audience, POPUP_SHOWN_KEY])

  useEffect(() => {
    if (newPoster?.url) {
      setIsOpen(true)
      sessionStorage.setItem(POPUP_SHOWN_KEY, "true")
    }
  }, [newPoster, POPUP_SHOWN_KEY])

  if (!isOpen || !newPoster?.url) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent showCloseButton={false} className="p-4 sm:p-6 md:p-8 border-0 bg-transparent shadow-none w-screen h-screen max-w-none max-h-none rounded-none flex items-center justify-center">
        <div className="relative w-full h-full sm:max-w-[80vw] lg:max-w-[90vw] xl:max-w-[95vw] sm:max-h-[80vh] lg:max-h-[85vh] xl:max-h-[90vh]">
          <Image
            src={newPoster.url}
            alt="Promotional Poster"
            fill
            style={{ objectFit: "contain" }}
          />
          <button onClick={() => setIsOpen(false)} className="absolute right-0  md:-right-10  text-white bg-black/50 rounded-full p-1.5 z-10 hover:bg-black dark:bg-neutral-400/20 dark:hover:bg-neutral-400/50 transition-colors">
            <X className="h-5 w-5 rounded-full hover:scale-110 transition-colors" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
