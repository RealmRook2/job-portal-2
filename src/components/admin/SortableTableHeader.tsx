import { useState } from "react";
import { TableHead } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, ArrowUp, ArrowDown, Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SortableTableHeaderProps {
  label: string;
  sortKey?: string;
  currentSort?: { key: string; direction: "asc" | "desc" } | null;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  filterOptions?: string[];
  currentFilter?: string;
  onFilter?: (value: string) => void;
  filterable?: boolean;
  sortable?: boolean;
}

export const SortableTableHeader = ({
  label,
  sortKey,
  currentSort,
  onSort,
  filterOptions = [],
  currentFilter,
  onFilter,
  filterable = false,
  sortable = true,
}: SortableTableHeaderProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSort = () => {
    if (!sortKey || !onSort) return;
    
    if (currentSort?.key === sortKey) {
      if (currentSort.direction === "asc") {
        onSort(sortKey, "desc");
      } else {
        onSort("", "asc"); // Clear sort
      }
    } else {
      onSort(sortKey, "asc");
    }
  };

  const handleFilter = (value: string) => {
    if (onFilter) {
      onFilter(value === currentFilter ? "" : value);
    }
    setIsFilterOpen(false);
  };

  const isSorted = currentSort?.key === sortKey;
  const sortDirection = isSorted ? currentSort.direction : null;

  return (
    <TableHead className="font-semibold text-foreground/80">
      <div className="flex items-center gap-2">
        <span>{label}</span>
        <div className="flex items-center gap-1">
          {sortable && sortKey && onSort && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 hover:bg-transparent"
              onClick={handleSort}
              title={isSorted ? (sortDirection === "asc" ? "Sort Descending" : "Clear Sort") : "Sort"}
            >
              {isSorted ? (
                sortDirection === "asc" ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )
              ) : (
                <ArrowUpDown className="h-3 w-3 text-muted-foreground" />
              )}
            </Button>
          )}
          {filterable && filterOptions.length > 0 && onFilter && (
            <DropdownMenu open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-6 w-6 p-0 hover:bg-transparent",
                    currentFilter && "text-primary"
                  )}
                  title="Filter"
                >
                  <Filter className={cn("h-3 w-3", currentFilter && "text-primary fill-primary")} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem onClick={() => handleFilter("")} className={cn(!currentFilter && "bg-primary/10")}>
                  <X className="h-3 w-3 mr-2" />
                  Clear Filter
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {filterOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => handleFilter(option)}
                    className={cn(currentFilter === option && "bg-primary/10")}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </TableHead>
  );
};

