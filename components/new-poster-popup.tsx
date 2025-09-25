"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { fetchNewPoster } from "@/lib/posterSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { X } from "lucide-react"

const POPUP_SHOWN_KEY = "newPosterPopupShown"

export function NewPosterPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { newPoster } = useSelector((state: RootState) => state.poster)
  const { currentSeason } = useSelector((state: RootState) => state.season)

  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem(POPUP_SHOWN_KEY)
    if (currentSeason && !hasBeenShown) {
      dispatch(fetchNewPoster())
    }
  }, [dispatch, currentSeason])

  useEffect(() => {
    if (newPoster?.url) {
      setIsOpen(true)
      sessionStorage.setItem(POPUP_SHOWN_KEY, "true")
    }
  }, [newPoster])

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
            layout="fill"
            objectFit="contain"
          />
          <button onClick={() => setIsOpen(false)} className="absolute right-0  md:-right-10  text-white bg-black/50 rounded-full p-1.5 z-10 hover:bg-black dark:bg-neutral-400/20 dark:hover:bg-neutral-400/50 transition-colors">
            <X className="h-5 w-5 rounded-full hover:scale-110 transition-colors" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
