"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

export interface ComboboxProps {
    items: { value: string; label: string }[];
    title: string;
    className?: string;
    style?: React.CSSProperties;
    selected?: string;
    onSelect?: (value: string) => void; // Nueva prop opcional
}

export function Combobox({ items, title, className, style, selected, onSelect }: ComboboxProps) {
    const [open, setOpen] = React.useState(false)
    // Permitir que los valores sean string o number
    type ItemValue = string | number;

    // Ajustar el estado y props para aceptar ambos tipos
    const [value, setValue] = React.useState<ItemValue>("");

    React.useEffect(() => {
        if (selected !== undefined) {
            setValue(selected);
        }
    }, [selected]);

    // Ajustar los tipos en las props
    // (esto debe ir en la definición de ComboboxProps, fuera del componente)
    // export interface ComboboxProps {
    //     items: { value: string | number; label: string }[];
    //     ...
    //     selected?: string | number;
    //     onSelect?: (value: string | number) => void;
    // }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button

                    role="combobox"
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                    style={{ backgroundColor: 'white', color: 'black', ...style }}
                >
                    {value
                        ? items.find((framework) => framework.label === value)?.label
                        : title}
                    <Search className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {items.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.label}
                                    onSelect={(currentLabel) => {
                                        // Encontrar el item por label para obtener el value real
                                        const selectedItem = items.find(i => i.label === currentLabel);
                                        const newValue = selectedItem?.value === value ? "" : selectedItem?.value || "";
                                        setValue(newValue);
                                        setOpen(false);

                                        console.log("Selected item:", selectedItem);

                                        //al seleccionar un valor, llamar a la función onSelect si existe
                                        if (onSelect && selectedItem) {
                                            onSelect(selectedItem.value);
                                        }
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
