"use client"

import Link from "next/link"
import homeData from "@/data/homedata.json"
import { useEffect, useState, useCallback } from "react"
import Image from "next/image"

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  // Phrases to cycle through
  const phrases = [
    "Welcome to MCHAX4U",
    "Unlock PS4 Minecraft cross-play",
    "Access exclusive features",
    "Join any Bedrock server",
    "Play with PC, Mobile & Console players"
  ]

  // Image carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % homeData.images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    return () => clearInterval(cursorInterval)
  }, [])

  // Typewriter with backspace effect
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 150
    const currentPhrase = phrases[currentPhraseIndex % phrases.length]
    
    if (!isDeleting) {
      // Typing forward
      if (displayText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Pause at end of typing
        const pauseTimeout = setTimeout(() => {
          setIsDeleting(true)
        }, 500)
        return () => clearTimeout(pauseTimeout)
      }
    } else {
      // Deleting backward
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }, typingSpeed)
        return () => clearTimeout(timeout)
      } else {
        // Move to next phrase when done deleting
        setIsDeleting(false)
        setCurrentPhraseIndex(prev => prev + 1)
      }
    }
  }, [displayText, currentPhraseIndex, isDeleting, phrases])

  return (
    <div className="min-h-[calc(100vh-120px)] p-4 flex items-center justify-center">
      {/* Main container with Minecraft UI style */}
      <div className="w-full max-w-6xl border-4 border-[#4a3b2a] bg-[#4a3b2a] rounded-lg overflow-hidden shadow-lg">
        {/* Top bar like Minecraft inventory */}
        <div className="bg-[#8b6b4a] py-2 px-4 border-b-4 border-[#6d5a45] flex justify-between items-center">
          <div className="text-yellow-100  text-2xl tracking-wider">
            {homeData.title}
          </div>
          <div className="flex space-x-2">
            <div className="w-4 h-4 bg-[#ff5555] border-2 border-[#ff0000]"></div>
            <div className="w-4 h-4 bg-[#ffff55] border-2 border-[#ffff00]"></div>
            <div className="w-4 h-4 bg-[#55ff55] border-2 border-[#55ff00]"></div>
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-col md:flex-row bg-[#8b6b4a] p-4">
          {/* Image carousel */}
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <div className="relative w-full h-64 md:h-96 border-4 border-[#6d5a45] rounded-lg overflow-hidden">
              {homeData.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Minecraft Image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover transition-opacity duration-1000 ${
                    index === currentImageIndex ? "opacity-100" : "opacity-0 absolute"
                  }`}
                  priority={index === 0}
                />
              ))}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
                {homeData.images.map((_, index) => (
                  <div 
                    key={index}
                    className={`w-3 h-3 rounded-full border-2 ${index === currentImageIndex ? "bg-yellow-300 border-yellow-400" : "bg-gray-400 border-gray-500"}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="w-full md:w-1/2 p-4 flex flex-col justify-center">
            <div className="bg-[#5e4b32] border-4 border-[#6d5a45] rounded-lg px-8 py-4">
              <div className="min-h-[200px] flex flex-col justify-between">
                <div>
                  <h2 className="text-center text-yellow-100 text-2xl mb-4 tracking-wider">
                    {displayText}
                    <span className={`ml-1 inline-block w-2 h-6 bg-yellow-200 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
                  </h2>
                  <p className="text-white text-lg leading-relaxed tracking-wide">
                    {homeData.description}
                  </p>
                </div>
                
                <div className="mt-8 flex justify-center">
                  <Link
                    href={homeData.buttonLink}
                    className="mc-button-green px-8 py-4 text-lg"
                  >
                    {homeData.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="minecraft-footer">
          <span>PS4</span>
          <span>MCHAX4U v2.1.0</span>
        </div>
      </div>
    </div>
  )
}