import React from "react"
import {
  Calculator,
  Calendar,
  CreditCard,
  Search as SearchIcon,
  Settings,
  Smile,
  User,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function CommandMenu() {
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && e.metaKey) {
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  return (
    <>
      <Button
        asChild
        variant="outline"
        onClick={() => setOpen(true)}
        className="w-full pl-4 pr-2 md:w-80"
      >
        <div className="flex h-10 flex-row justify-between">
          <div className="flex flex-row gap-2">
            <SearchIcon className="my-auto h-4 w-4" />
            Search...
          </div>

          <kbd className="hidden rounded bg-muted px-[0.4rem] py-[0.2rem] font-mono text-sm font-semibold sm:block">
            ⌘ J
          </kbd>
        </div>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem onSelect={() => (window.location.href = "/")}>
              Calendar
            </CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
