"use client"
import React, { useState, useEffect } from "react"
import Image from "next/image"

interface GameItemProps {
  title: string
  description: string
  image: string
  rank?: string
  playtime?: string
  year: number
}


const GameItem = ({ title, description, image, year }: GameItemProps) => (
  <div className="relative bg-white rounded-lg shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">
    <div className="relative z-20">
      <div className="relative w-full h-48 overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="contain"
          className={`transition-transform duration-300 group-hover:scale-105 ${
            title.toLowerCase().includes('valorant') ? 'scale-[0.7]' : ''
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
        <div className="absolute top-0 left-0 w-full p-3 flex justify-end">
          <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full
            border border-white/10">
            <svg 
              className="w-4 h-4 text-yellow-400" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-xs font-medium text-white">Peak Rank</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
      </div>
    </div>
    <div className="p-4 bg-white">
      <p className="text-gray-700 text-sm leading-relaxed font-medium tracking-wide">
        {description}
      </p>
      <div className="mt-2 flex items-center text-xs text-gray-500">
        <svg 
          className="w-4 h-4 mr-1" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
        <span className="font-medium">Experience since {year}</span>
      </div>
    </div>
  </div>
)

// Base types
interface BaseMatch {
  gameId: number
  gameMode: string
  win: boolean
  gameCreation: number
  gameDuration: number
  gameName: "league" | "valorant" | "tft"
}

// Game-specific types
interface LeagueMatch extends BaseMatch {
  gameName: "league"
  championName: string
  kills: number
  deaths: number
  assists: number
  kda: number
  teamPosition: string
  champLevel: number
  totalMinionsKilled: number
  neutralMinionsKilled: number
}

interface ValorantMatch extends BaseMatch {
  gameName: "valorant"
  agent: string
  kills: number
  deaths: number
  assists: number
  score: string
}

interface TFTMatch extends BaseMatch {
  gameName: "tft"
  placement: number
  championName: string
  tftSetNumber: number
  companionSpecies: string
  level: number
}

type GameMatch = LeagueMatch | ValorantMatch | TFTMatch

// Match block generators
const generateLeagueBlock = (match: LeagueMatch, failedImages: Set<string>, setFailedImages: (fn: (prev: Set<string>) => Set<string>) => void) => {
  const displayName = match.championName === "MonkeyKing" ? "Wukong" : match.championName
  const imageSrc = failedImages.has(displayName) 
    ? '/league_champion/unknown.jpeg'
    : `/league_champion/${displayName}.png`

  return (
    <div className={`border rounded-lg p-4 relative ${
      match.win 
        ? "bg-gradient-to-r from-blue-50 via-blue-50/50 to-white border-blue-100" 
        : "bg-gradient-to-r from-red-50 via-red-50/50 to-white border-red-100"
    } hover:shadow-lg transition-all duration-300`}>
      <div className="absolute -top-3 -left-3">
        <Image
          src="/game-icons/league.jpeg"
          alt="League of Legends"
          width={24}
          height={24}
          className="rounded-full ring-2 ring-white shadow-md"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className={`relative rounded-full p-1 ${match.win ? "bg-blue-100/50" : "bg-red-100/50"}`}>
            <Image
              src={imageSrc}
              alt={displayName}
              width={56}
              height={56}
              className={`rounded-full ring-2 ring-opacity-50 transition-transform duration-200 hover:scale-110
                ${match.win ? 'ring-blue-300' : 'ring-red-300'}`}
              onError={() => setFailedImages(prev => new Set(prev).add(displayName))}
            />
            <div className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full 
              flex items-center justify-center text-xs font-bold text-white shadow-lg
              ${match.win ? "bg-blue-500" : "bg-red-500"}`}>
              {match.champLevel}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-gray-800">{displayName}</span>
              {match.teamPosition && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium
                  ${match.win ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                  {match.teamPosition === "UTILITY" ? "Support" : 
                   match.teamPosition === "BOTTOM" ? "ADC" : 
                   match.teamPosition === "JUNGLE" ? "Jungle" : 
                   match.teamPosition === "MIDDLE" ? "Mid" : 
                   match.teamPosition === "TOP" ? "Top" : ""}
                </span>
              )}
              <div className={`px-3 py-0.5 rounded-full font-medium text-xs
                ${match.win ? "bg-blue-100 text-blue-700" : "bg-red-100 text-red-700"}`}>
                {match.kills}/{match.deaths}/{match.assists}
              </div>
              <span className={`text-xs ${match.kda >= 3 ? "text-green-600 font-medium" : "text-gray-600"}`}>
                {(match.kda || 0).toFixed(1)} KDA
              </span>
            </div>
            <div className="text-sm text-gray-600 font-medium mt-1">
              {match.gameMode === "CLASSIC" ? "RIFT" : 
               match.gameMode === "ARAM" ? "ARAM" : 
               match.gameMode === "URF" ? "URF" : 
               match.gameMode}
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-sm font-medium text-gray-700">{timeAgo(match.gameCreation)}</div>
          <div className="text-xs text-gray-500 mt-1">{Math.floor(match.gameDuration / 60)}min</div>
        </div>
      </div>
    </div>
  )
}

const generateValorantBlock = (match: ValorantMatch) => {
  return (
    <div key={match.gameId}>
      {/* Valorant match display logic - to be implemented */}
      <div>Valorant Match Placeholder</div>
    </div>
  )
}

const TFTMatchBlock = ({ match }: { match: TFTMatch }) => {
  const [failedImage, setFailedImage] = useState(false)
  const placement = match.placement
  const isTopFour = placement <= 4

  return (
    <div className={`border rounded-lg p-4 relative ${
      isTopFour 
        ? "bg-gradient-to-r from-amber-50 via-amber-50/50 to-white border-amber-100" 
        : "bg-gradient-to-r from-amber-50/80 via-amber-50/30 to-white border-amber-100/80"
    } hover:shadow-lg transition-all duration-300`}>
      <div className="absolute -top-3 -left-3">
        <Image
          src="/game-icons/tft.jpeg"
          alt="Teamfight Tactics"
          width={24}
          height={24}
          className="rounded-full ring-2 ring-white shadow-md"
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className={`relative rounded-full p-1 ${isTopFour ? "bg-amber-100/50" : "bg-amber-100/30"}`}>
            <Image
              src={failedImage ? '/tft_tactician/unknown.jpeg' : `/tft_tactician/${match.companionSpecies.replace('PetChibi', '')}.png`}
              alt={match.companionSpecies.replace('PetChibi', '')}
              width={56}
              height={56}
              className={`rounded-full bg-gray-100 ring-2 ring-opacity-50 transition-transform duration-200 transform hover:scale-110
                ${isTopFour ? 'ring-amber-300' : 'ring-amber-200'}`}
              onError={() => setFailedImage(true)}
            />
            <div className={`absolute -bottom-1.5 -right-1.5 w-5 h-5 rounded-full 
              flex items-center justify-center text-xs font-bold text-white shadow-lg bg-amber-400`}>
              {match.level ?? 8}
            </div>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                placement === 1 ? "bg-yellow-100 text-yellow-800" :
                placement === 2 ? "bg-zinc-100 text-zinc-800" :
                placement === 3 ? "bg-orange-100 text-orange-800" :
                placement === 4 ? "bg-emerald-100 text-emerald-800" :
                                "bg-amber-100/80 text-amber-800"
              }`}>
                {placement}{placement === 1 ? "st" : placement === 2 ? "nd" : placement === 3 ? "rd" : "th"} Place
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold text-amber-600 bg-amber-100/80`}>
                Set {match.tftSetNumber}
              </span>
            </div>
          </div>
        </div>
        <div className="text-left sm:text-right">
          <div className="text-sm font-medium text-gray-700">{timeAgo(match.gameCreation)}</div>
          <div className="text-xs text-gray-500 mt-1">{Math.floor(match.gameDuration / 60)}min</div>
        </div>
      </div>
    </div>
  )
}

const generateTFTBlock = (match: TFTMatch) => <TFTMatchBlock match={match} />

// Main match history component
const MatchHistory = ({ matches }: { matches: GameMatch[] }) => {
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set())
  const [isExpanded, setIsExpanded] = useState(false)
  const initialDisplayCount = 5
  
  // Sort matches by creation time
  const sortedMatches = [...matches].sort((a, b) => b.gameCreation - a.gameCreation)
  const displayedMatches = isExpanded ? sortedMatches : sortedMatches.slice(0, initialDisplayCount)

  const generateMatchBlock = (match: GameMatch) => {
    switch (match.gameName) {
      case "league":
        return generateLeagueBlock(match, failedImages, setFailedImages)
      case "valorant":
        return generateValorantBlock(match)
      case "tft":
        return generateTFTBlock(match)
      default:
        return <div key={match}>Unknown game type</div>
    }
  }

  return (
    <div className="bg-gradient-to-br from-white via-white to-gray-50 rounded-2xl shadow-lg p-8 mb-8 border border-gray-100/50 backdrop-blur-sm relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-100/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-100/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
      
      <div className="relative">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Recent Matches
          </span>
          <div className="h-1 flex-grow bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full"></div>
        </h2>
        
        <div className="space-y-4">
          {displayedMatches.map(match => (
            <div key={match.gameId} className="transform hover:scale-[1.01] transition-all duration-200">
              {generateMatchBlock(match)}
            </div>
          ))}
        </div>

        {matches.length > initialDisplayCount && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 w-full py-3 px-4 text-sm font-medium text-gray-600 hover:text-gray-800 
              bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200
              rounded-xl transition-all duration-200 shadow-sm hover:shadow
              border border-gray-200/50 backdrop-blur-sm"
          >
            {isExpanded ? (
              <span className="flex items-center justify-center gap-2">
                Show Less <span className="text-gray-400">↑</span>
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Show More <span className="text-gray-400">({matches.length - initialDisplayCount})</span> <span className="text-gray-400">↓</span>
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

// Utility functions
const timeAgo = (timestamp: number) => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `${days}d ago`
  if (hours > 0) return `${hours}h ago`
  if (minutes > 0) return `${minutes}m ago`
  return `${seconds}s ago`
}


// Main component
export default function Games() {
  const [matches, setMatches] = useState<GameMatch[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('https://eager-bunnie-joon-7441769d.koyeb.app/matches/recent')
        if (!response.ok) {
          throw new Error('Failed to fetch matches')
        }
        const data = await response.json()
        setMatches(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load matches')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  const games = [
    {
      title: "League of Legends",
      description: "Playing since Season 2, I love teaming up with friends on Discord. Jungle and ADC are my go-to roles.",
      image: "/league_rank/Diamond_Icon.png",
      year: 2013,
    },
    {
      title: "Teamfight Tactics",
      description:
        "My favorite strategy game since beta. I love Double Up mode with friends and experimenting with team comps.",
      image: "/league_rank/Master_Icon.png",
      year: 2019
    },
    {
      title: "VALORANT",
      description: "I started during the pandemic and enjoy playing Controllers. While I don't play much now, I love watching matches.",
      image: "/valorant_rank/Platinum.png",
      year: 2022
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {games.map((game, index) => (
          <GameItem key={index} {...game} />
        ))}
      </div>
      {isLoading && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="animate-pulse flex space-x-4">
            <div className="flex-1 space-y-4 py-1">
              <div className="h-4 bg-slate-200 rounded w-3/4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
                <div className="h-4 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
          <p className="text-red-600">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && matches.length > 0 && (
        <MatchHistory matches={matches} />
      )}

      {!isLoading && !error && matches.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600">No recent matches found.</p>
        </div>
      )}
    </div>
  )
}

