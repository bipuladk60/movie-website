import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Film } from "lucide-react"

function Preloader({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      localStorage.setItem("hasVisited", "true") // Store user visit
      onComplete() // Notify parent that animation is done
    }, 1000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return isVisible ? (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        className="mb-4"
      >
        <Film size={80} className="text-red-600" />
      </motion.div>
      <p className="text-lg font-semibold">Loading MovieApp...</p>
    </motion.div>
  ) : null
}

export default Preloader
