"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from "next/link"
import { Store } from "@/types"
import useCart from "@/hooks/use-cart"
import { useRouter } from "next/navigation"


interface SelectStore{
  data: Store[]
}

const SelectStore: React.FC<SelectStore> = ({
  data
}) => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const router = useRouter();
  const cart = useCart();
  const stores = data;
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between text-green-500"
        >
          {value
            ? value.slice(0, 5)
            : "Stores"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search store..." />
          <CommandEmpty>No store found.</CommandEmpty>
          <CommandGroup>
            <CommandItem>
                <Link href={`https://trsstore.vercel.app`} className="flex text-green-500 items-center w-full justify-between" target="_blank">
                
                Create Store <Plus className="h-4 w-4"/>
                </Link>
            </CommandItem>
            {stores.map((store: Store) => (
              <CommandItem
                key={store.id}
                onSelect={(currentValue) => {
                  
                  setValue(currentValue === value ? "" : currentValue);
                  cart.setStoreId(store.id);
                  router.push("/");
                  setOpen(false)
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === store.name ? "opacity-100" : "opacity-0"
                  )}
                />
                {store.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default SelectStore;
