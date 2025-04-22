import { TableHead } from "@/components/ui/table"
import { ArrowUp, ArrowDown } from "lucide-react"

interface SortableTableHeadProps {
    title: string
    column: string
    sortColumn: string
    sortDirection: "asc" | "desc"
    onSort: (column: string) => void
}

export function SortableTableHead({
    title,
    column,
    sortColumn,
    sortDirection,
    onSort,
  }: SortableTableHeadProps){

    const isSorted = sortColumn === column

    return(
        <TableHead
            className="cursor-pointer select-none"
            onClick={() => onSort(column)}
        >
            <div className="flex items-center gap-1">
                {title}
                {isSorted &&
                (sortDirection === "asc" ? (
                    <ArrowUp className="w-4 h-4" />
                ) : (
                    <ArrowDown className="w-4 h-4" />
                ))}
            </div>
        </TableHead>
    )
}