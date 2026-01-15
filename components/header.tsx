"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ListTodo, Store, PlusCircle, Gavel, User, Wallet, ChevronDown, LogOut, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/hooks/use-wallet"
import { NEURA_CHAIN, getExplorerAddressUrl } from "@/lib/neura-config"

const navItems = [
  { href: "/", label: "Task", icon: ListTodo },
  { href: "/marketplace", label: "Marketplace", icon: Store },
  { href: "/create", label: "Create", icon: PlusCircle },
  { href: "/auctions", label: "Auctions", icon: Gavel },
  { href: "/profile", label: "Profile", icon: User },
]

export function Header() {
  const pathname = usePathname()
  const { address, balance, isConnected, isConnecting, connect, disconnect, isCorrectChain, switchToNeura } =
    useWallet()

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  return (
    <header className="sticky top-0 z-50 border-b border-primary/30 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50 transition-all duration-300 group-hover:shadow-primary/80">
              <span className="text-xl font-black text-background">N</span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-secondary opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-50" />
            </div>
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Neurium
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const Icon = item.icon
              return (
                <Link key={item.href} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`gap-2 transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-primary to-secondary text-background shadow-lg shadow-primary/30"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                </Link>
              )
            })}
          </nav>

          {/* Wallet Connection */}
          <div className="flex items-center gap-3">
            {isConnected && address ? (
              <>
                {!isCorrectChain && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={switchToNeura}
                    className="shadow-lg shadow-destructive/30"
                  >
                    Switch to Neura
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="gap-2 border-primary/50 bg-card/50 backdrop-blur-sm hover:bg-card/80 hover:border-primary transition-all duration-300 shadow-lg shadow-primary/10"
                    >
                      <span className="text-primary font-bold">{balance} ANKR</span>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse" />
                        <span className="text-foreground font-mono">{truncateAddress(address)}</span>
                      </div>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card/95 backdrop-blur-xl border-primary/30">
                    <DropdownMenuItem asChild>
                      <a
                        href={getExplorerAddressUrl(address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <ExternalLink className="h-4 w-4" />
                        View on Explorer
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <a
                        href={NEURA_CHAIN.faucet}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Wallet className="h-4 w-4" />
                        Get Testnet ANKR
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={disconnect} className="text-destructive cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button
                onClick={connect}
                disabled={isConnecting}
                className="gap-2 bg-gradient-to-r from-primary to-secondary text-background font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300"
              >
                <Wallet className="h-4 w-4" />
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
