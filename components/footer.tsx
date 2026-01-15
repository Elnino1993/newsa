import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-card/30 backdrop-blur-xl py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/40">
              <span className="text-lg font-black text-background">N</span>
            </div>
            <span className="text-xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Neurium
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm">
            <Link
              href="/marketplace"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Marketplace
            </Link>
            <Link
              href="/create"
              className="text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Create
            </Link>
            <a
              href="https://docs.neuraprotocol.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Docs
              <ExternalLink className="h-3 w-3" />
            </a>
            <a
              href="https://neuraverse.neuraprotocol.io/?section=faucet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors duration-300 font-medium"
            >
              Faucet
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <p className="text-sm text-muted-foreground">
            Powered by <span className="text-primary font-bold">Neura Protocol</span> • Chain ID: 267
          </p>
        </div>
      </div>
    </footer>
  )
}
