"use client"

import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

import { CommandMenu } from "./commando"

export function SiteHeader() {
  return (
    <header className="stick top-0 z-40 w-full border-b bg-transparent backdrop-blur-xl">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          {/* <CommandMenu /> */}
          <nav className="flex items-center space-x-1">           
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}
