import {Course, Section} from "@prisma/client"
import React from "react"
import {Sheet, SheetContent, SheetTrigger} from "../ui/sheet"
import {Button} from "../ui/button"
import Link from "next/link"

interface SectionMenuProps {
  course: Course & {sections: Section[]}
}

const SectionMenu = ({course}: SectionMenuProps) => {
  return (
    <div className="z-60 md:hidden">
      <Sheet>
        <SheetTrigger>
          <span className="flex justify-center items-center py-[8px] px-4 border border-inherit border-solid bg-[#3bb0fd] hover:bg-[#d3f1f7]">
            Sections
          </span>
        </SheetTrigger>
        <SheetContent className="flex flex-col">
          <Link
            href={`/courses/${course.id}/overview`}
            className={`p-3 rounded-lg hover:bg-[#ebf9ff] mt-4`}
          >
            Overview
          </Link>
          {course.sections.map((section) => (
            <Link
              key={section.id}
              href={`/courses/${course.id}/sections/${section.id}`}
              className="p-3 rounded-lg hover:bg-[#ebf9ff] mt-4"
            >
              {section.title}
            </Link>
          ))}
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default SectionMenu
