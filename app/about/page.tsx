"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import supabase from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

export default function About() {
  const [showCursor, setShowCursor] = useState(true)

  // Данные из макета Figma
  const aboutData = {
    title: "About MCHAX4U",
    sections: [
      {
        title: "What is MCHAX4U?",
        content: "MCHAX4U unlocks cross-platform features for PS4 Minecraft players. Our tools bridge the gap between PS4 and other platforms, giving access to normally restricted features.",
        icon: "❖"
      },
      {
        title: "Key Features",
        items: [
          { text: "Cross-play with PC/mobile/consoles", icon: "⚙️" },
          { text: "Exclusive game modes & servers", icon: "🎮" },
          { text: "Custom skins & texture packs", icon: "👕" },
          { text: "Performance optimization", icon: "⚡" },
          { text: "Advanced building tools", icon: "🛠️" }
        ]
      },
      {
        title: "Technology",
        content: "Using advanced client-side modifications, we enhance PS4 connectivity while maintaining stability. No server modifications required - all changes happen locally.",
        icon: "🔧"
      }
    ]
  }

  // Эффект мигающего курсора
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(v => !v), 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="minecraft-bg min-h-screen p-4 flex items-center justify-center">
      {/* Основной контейнер */}
      <div className="minecraft-ui-container w-full max-w-4xl">
        
        {/* Шапка как в инвентаре Minecraft */}
        <div className="minecraft-header">
          <div className="text-yellow-100 text-2xl tracking-wider">{aboutData.title}</div>
          <div className="minecraft-window-controls">
            <span className="minecraft-btn red"></span>
            <span className="minecraft-btn yellow"></span>
            <span className="minecraft-btn green"></span>
          </div>
        </div>

        {/* Контентная область */}
        <div className="minecraft-content-area">
          
          {/* Секция с описанием */}
          {aboutData.sections.map((section, i) => (
            <div key={i} className="minecraft-section">
              <h3 className="minecraft-section-title">
                <span className="minecraft-icon">{section.icon}</span>
                {section.title}
                <span className={`minecraft-cursor ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
              </h3>

              {section.content && (
                <p className="minecraft-text">{section.content}</p>
              )}

              {section.items && (
                <ul className="minecraft-feature-list">
                  {section.items.map((item, j) => (
                    <li key={j} className="minecraft-feature-item">
                      <span className="minecraft-feature-icon">{item.icon}</span>
                      {item.text}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* Кнопка загрузки */}
          <div className="mt-8 flex justify-center">
            <Link href="/download" className="mc-button-green">
              Download Now
            </Link>
          </div>
        </div>

        {/* Подвал */}
        <div className="minecraft-footer">
        <span>PS4</span>
        <span>MCHAX4U v2.1.0</span>
        </div>
      </div>
    </div>
  )
}