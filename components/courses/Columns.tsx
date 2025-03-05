"use client"

import {Course} from "@prisma/client"
import {ColumnDef} from "@tanstack/react-table"
import {Pencil} from "lucide-react"
import Link from "next/link"
import {ArrowUpDown} from "lucide-react"

import {Badge} from "../ui/badge"
import {Button} from "../ui/button"

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title", // course.title

    // sort for title
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "price",

    // sort for price
    header: ({column}) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({row}) => {
      // getValue("price") vì  accessorKey: "price",
      const price = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price)

      return <div>{formatted}</div>
    },
  },
  {
    accessorKey: "isPublished",
    header: "Status",

    // format cell
    cell: ({row}) => {
      const isPublished = row.getValue("isPublished") || false

      return (
        <Badge
          className={`${
            isPublished && "bg-[#46abf9] text-black hover:bg-[#a6cbfb]"
          }`}
        >
          {isPublished ? "Published" : "Draft"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    cell: ({row}) => (
      <Link
        href={`/instructor/courses/${row.original.id}/basic`}
        className="flex gap-2 items-center hover:text-[#4fa5f5]"
      >
        <Pencil className="h-4 w-4" /> Edit
      </Link>
    ),
  },
]
