import {db} from "@/lib/db"
import {Course, Section} from "@prisma/client"
import Link from "next/link"
import {Progress} from "../ui/progress"

interface CourseSideBarProps {
  course: Course & {sections: Section[]}
  studentId: string
}

const CourseSideBar = async ({course, studentId}: CourseSideBarProps) => {
  //( 1. count how many section of this course ?)
  const publishedSections = await db.section.findMany({
    where: {
      courseId: course.id,
      isPublished: true,
    },
    orderBy: {
      position: "asc",
    },
  })

  const publishedSectionIds = publishedSections.map((section) => section.id)

  const purchase = await db.purchase.findUnique({
    where: {
      customerId_courseId: {
        customerId: studentId,
        courseId: course.id,
      },
    },
  })

  //( 2. count how many section is completed ?)
  const completedSections = await db.progress.count({
    where: {
      studentId,
      sectionId: {
        in: publishedSectionIds,
      },
      isCompleted: true,
    },
  })

  //( 3. percent of completed ?)
  const progressPercentage =
    (completedSections / publishedSectionIds.length) * 100

  return (
    <div className="hidden md:flex flex-col w-64 border-r shadow-md px-3 my-4 text-sm font-medium">
      <h1 className="text-lg font-bold text-center mb-4">{course.title}</h1>
      {purchase && (
        <div>
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-xs">{Math.round(progressPercentage)}% completed</p>
        </div>
      )}
      <Link
        href={`/courses/${course.id}/overview`}
        className={`p-3 rounded-lg hover:bg-[#caf7ff] mt-4`}
      >
        Overview
      </Link>
      {publishedSections.map((section) => (
        <Link
          key={section.id}
          href={`/courses/${course.id}/sections/${section.id}`}
          className="p-3 rounded-lg hover:bg-[#c8f1f9] mt-4"
        >
          {section.title}
        </Link>
      ))}
    </div>
  )
}

export default CourseSideBar
