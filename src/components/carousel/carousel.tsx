"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"
import { cn } from "@/lib/utils"

type CarouselApi = UseEmblaCarouselType[1]
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>
type CarouselOptions = UseCarouselParameters[0]
type CarouselPlugin = UseCarouselParameters[1]

const carouselVariants = cva(
  "relative w-full overflow-hidden rounded-2xl group/carousel",
  {
    variants: {
      variant: {
        default: "bg-card",
        fade: "bg-card",
        cards: "bg-transparent",
        spotlight: "bg-card",
        gallery: "bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CarouselProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof carouselVariants> {
  opts?: CarouselOptions
  plugins?: CarouselPlugin
  autoplay?: boolean
  autoplayInterval?: number
  showArrows?: boolean
  showDots?: boolean
  showProgress?: boolean
  infinite?: boolean
  children: React.ReactNode
}

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0]
  api: ReturnType<typeof useEmblaCarousel>[1]
  scrollPrev: () => void
  scrollNext: () => void
  scrollTo: (index: number) => void
  canScrollPrev: boolean
  canScrollNext: boolean
  selectedIndex: number
  scrollSnaps: number[]
  progress: number
  variant?: "default" | "fade" | "cards" | "spotlight" | "gallery"
  isPlaying: boolean
  togglePlay: () => void
}

const CarouselContext = React.createContext<CarouselContextProps | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }
  return context
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      className,
      variant = "default",
      opts,
      plugins,
      autoplay = false,
      autoplayInterval = 5000,
      showArrows = true,
      showDots = true,
      showProgress = false,
      infinite = true,
      children,
      ...props
    },
    ref
  ) => {
    const carouselOpts = React.useMemo<CarouselOptions>(
      () => ({
        loop: infinite,
        align: variant === "spotlight" ? "center" : "start",
        ...opts,
      }),
      [infinite, variant, opts]
    )

    const [carouselRef, api] = useEmblaCarousel(carouselOpts, plugins)
    const [canScrollPrev, setCanScrollPrev] = React.useState(false)
    const [canScrollNext, setCanScrollNext] = React.useState(false)
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([])
    const [progress, setProgress] = React.useState(0)
    const [isPlaying, setIsPlaying] = React.useState(autoplay)

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) return
      setSelectedIndex(api.selectedScrollSnap())
      setCanScrollPrev(api.canScrollPrev())
      setCanScrollNext(api.canScrollNext())
    }, [])

    const scrollPrev = React.useCallback(() => {
      api?.scrollPrev()
    }, [api])

    const scrollNext = React.useCallback(() => {
      api?.scrollNext()
    }, [api])

    const scrollTo = React.useCallback(
      (index: number) => {
        api?.scrollTo(index)
      },
      [api]
    )

    const togglePlay = React.useCallback(() => {
      setIsPlaying((p) => !p)
    }, [])

    React.useEffect(() => {
      if (!api) return
      onSelect(api)
      setScrollSnaps(api.scrollSnapList())
      api.on("reInit", onSelect)
      api.on("select", onSelect)
      api.on("scroll", () => {
        const p = api.scrollProgress()
        setProgress(p)
      })
      return () => {
        api.off("select", onSelect)
        api.off("reInit", onSelect)
      }
    }, [api, onSelect])

    React.useEffect(() => {
      if (!api || !isPlaying) return
      const timer = setInterval(() => {
        if (canScrollNext) {
          api.scrollNext()
        } else if (infinite) {
          api.scrollTo(0)
        }
      }, autoplayInterval)
      return () => clearInterval(timer)
    }, [api, isPlaying, canScrollNext, infinite, autoplayInterval])

    React.useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          scrollPrev()
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          scrollNext()
        }
      }
      const node = (ref as React.RefObject<HTMLDivElement>)?.current || carouselRef.current
      if (!node) return
      node.tabIndex = 0
      node.addEventListener("keydown", handleKeyDown)
      return () => node.removeEventListener("keydown", handleKeyDown)
    }, [scrollPrev, scrollNext, ref, carouselRef])

    return (
      <CarouselContext.Provider
        value={{
          carouselRef,
          api,
          scrollPrev,
          scrollNext,
          scrollTo,
          canScrollPrev,
          canScrollNext,
          selectedIndex,
          scrollSnaps,
          progress,
          variant,
          isPlaying,
          togglePlay,
        }}
      >
        <div
          ref={ref}
          data-slot="carousel"
          className={cn(carouselVariants({ variant, className }))}
          {...props}
        >
          {children}
          <AnimatePresence>
            {showArrows && (
              <>
                <motion.button
                  type="button"
                  aria-label="Previous slide"
                  onClick={scrollPrev}
                  disabled={!canScrollPrev && !infinite}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: canScrollPrev || infinite ? 1 : 0.4, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 size-10 md:size-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-[#1a2027]/90 backdrop-blur-xl border border-white/40 dark:border-white/10 text-[#253E38] dark:text-[#A7CD0F] shadow-[0_8px_24px_rgba(16,20,24,0.15)] transition-all duration-300 ease-[var(--ease-premium)] hover:scale-110 hover:bg-white dark:hover:bg-[#1a2027] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <ChevronLeft className="size-5 md:size-6" />
                </motion.button>
                <motion.button
                  type="button"
                  aria-label="Next slide"
                  onClick={scrollNext}
                  disabled={!canScrollNext && !infinite}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: canScrollNext || infinite ? 1 : 0.4, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 size-10 md:size-12 flex items-center justify-center rounded-full bg-white/90 dark:bg-[#1a2027]/90 backdrop-blur-xl border border-white/40 dark:border-white/10 text-[#253E38] dark:text-[#A7CD0F] shadow-[0_8px_24px_rgba(16,20,24,0.15)] transition-all duration-300 ease-[var(--ease-premium)] hover:scale-110 hover:bg-white dark:hover:bg-[#1a2027] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
                >
                  <ChevronRight className="size-5 md:size-6" />
                </motion.button>
              </>
            )}
          </AnimatePresence>
          {autoplay && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause autoplay" : "Start autoplay"}
              className="absolute bottom-2 md:bottom-4 left-2 md:left-4 z-30 size-9 md:size-10 flex items-center justify-center rounded-full bg-white/90 dark:bg-[#1a2027]/90 backdrop-blur-xl border border-white/40 dark:border-white/10 text-[#253E38] dark:text-[#A7CD0F] shadow-md transition-all duration-300 ease-[var(--ease-premium)] hover:scale-105"
            >
              {isPlaying ? <Pause className="size-4 md:size-5" /> : <Play className="size-4 md:size-5" />}
            </button>
          )}
          {showProgress && (
            <div className="absolute bottom-0 left-0 right-0 z-20 h-1 bg-black/10 dark:bg-white/10 overflow-hidden rounded-b-2xl">
              <motion.div
                className="h-full bg-gradient-to-r from-[#253E38] via-[#A7CD0F] to-[#FEB300]"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          )}
          {showDots && (
            <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => scrollTo(i)}
                  className={cn(
                    "relative rounded-full transition-all duration-400 ease-[var(--ease-premium)] will-change-transform",
                    i === selectedIndex
                      ? "w-8 md:w-10 h-2.5 bg-[#253E38] dark:bg-[#A7CD0F] shadow-[0_2px_8px_rgba(37,62,56,0.4)] dark:shadow-[0_2px_8px_rgba(167,205,15,0.4)]"
                      : "w-2.5 h-2.5 bg-white/60 dark:bg-white/25 hover:bg-white/80 dark:hover:bg-white/40 backdrop-blur-sm"
                  )}
                />
              ))}
            </div>
          )}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

export interface CarouselContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, ...props }, ref) => {
    const { carouselRef, variant } = useCarousel()

    const contentClass = cn(
      "overflow-hidden touch-pan-y",
      variant === "fade" && "[--slide-opacity:0]",
      variant === "cards" && "py-4 md:py-8",
      variant === "spotlight" && "py-4 md:py-8"
    )

    return (
      <div ref={carouselRef} className={contentClass}>
        <div
          ref={ref}
          data-slot="carousel-content"
          className={cn(
            "flex",
            variant === "cards" && "gap-4 md:gap-6 px-2 md:px-4",
            variant === "spotlight" && "gap-4 md:gap-6 px-4 md:px-8",
            variant === "gallery" && "gap-3 md:gap-4",
            className
          )}
          {...props}
        />
      </div>
    )
  }
)
CarouselContent.displayName = "CarouselContent"

export interface CarouselItemProps extends React.HTMLAttributes<HTMLDivElement> {
  index?: number
}

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, index = 0, ...props }, ref) => {
    const { selectedIndex, variant } = useCarousel()
    const isActive = index === selectedIndex

    const baseClass = cn(
      "relative min-w-0 shrink-0 basis-full transition-all duration-[500ms] ease-[var(--ease-premium)] will-change-transform",
      variant === "cards" && "basis-full md:basis-1/2 lg:basis-1/3",
      variant === "spotlight" && "basis-3/4 md:basis-2/3 lg:basis-1/2"
    )

    return (
      <motion.div
        ref={ref}
        data-slot="carousel-item"
        initial={false}
        animate={
          variant === "fade"
            ? { opacity: isActive ? 1 : 0.4 }
            : variant === "spotlight"
            ? {
                scale: isActive ? 1 : 0.88,
                opacity: isActive ? 1 : 0.5,
                filter: isActive ? "blur(0px)" : "blur(2px)",
              }
            : variant === "cards"
            ? {
                scale: isActive ? 1 : 0.96,
                opacity: isActive ? 1 : 0.75,
              }
            : {}
        }
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(baseClass, className)}
        {...(props as any)}
      />
    )
  }
)
CarouselItem.displayName = "CarouselItem"

export interface CarouselPreviousProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(
  ({ className, ...props }, ref) => {
    const { scrollPrev, canScrollPrev } = useCarousel()
    return (
      <button
        ref={ref}
        data-slot="carousel-previous"
        type="button"
        onClick={scrollPrev}
        disabled={!canScrollPrev}
        className={cn(
          "inline-flex items-center justify-center size-11 rounded-xl bg-[#253E38] text-white hover:bg-[#1e322e] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 ease-[var(--ease-premium)] shadow-lg hover:shadow-xl hover:-translate-y-0.5",
          className
        )}
        {...props}
      >
        <ChevronLeft className="size-5" />
      </button>
    )
  }
)
CarouselPrevious.displayName = "CarouselPrevious"

export interface CarouselNextProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(
  ({ className, ...props }, ref) => {
    const { scrollNext, canScrollNext } = useCarousel()
    return (
      <button
        ref={ref}
        data-slot="carousel-next"
        type="button"
        onClick={scrollNext}
        disabled={!canScrollNext}
        className={cn(
          "inline-flex items-center justify-center size-11 rounded-xl bg-[#253E38] text-white hover:bg-[#1e322e] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300 ease-[var(--ease-premium)] shadow-lg hover:shadow-xl hover:-translate-y-0.5",
          className
        )}
        {...props}
      >
        <ChevronRight className="size-5" />
      </button>
    )
  }
)
CarouselNext.displayName = "CarouselNext"

export interface CarouselDotsProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselDots = React.forwardRef<HTMLDivElement, CarouselDotsProps>(
  ({ className, ...props }, ref) => {
    const { scrollSnaps, selectedIndex, scrollTo } = useCarousel()
    return (
      <div
        ref={ref}
        data-slot="carousel-dots"
        className={cn("flex items-center justify-center gap-2 py-4", className)}
        {...props}
      >
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={cn(
              "rounded-full transition-all duration-400 ease-[var(--ease-premium)]",
              i === selectedIndex
                ? "w-8 h-2.5 bg-[#253E38] dark:bg-[#A7CD0F] shadow-md"
                : "w-2.5 h-2.5 bg-border hover:bg-[#253E38]/40 dark:hover:bg-[#A7CD0F]/40"
            )}
          />
        ))}
      </div>
    )
  }
)
CarouselDots.displayName = "CarouselDots"

export interface CarouselProgressProps extends React.HTMLAttributes<HTMLDivElement> {}

const CarouselProgress = React.forwardRef<HTMLDivElement, CarouselProgressProps>(
  ({ className, ...props }, ref) => {
    const { progress } = useCarousel()
    return (
      <div
        ref={ref}
        data-slot="carousel-progress"
        className={cn("w-full h-1.5 rounded-full bg-muted overflow-hidden", className)}
        {...props}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[#253E38] via-[#A7CD0F] to-[#FEB300] rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    )
  }
)
CarouselProgress.displayName = "CarouselProgress"

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselDots,
  CarouselProgress,
  carouselVariants,
  useCarousel,
}
