import {auth} from "@clerk/nextjs/server"
import {redirect} from "next/navigation"

import CreateSectionForm from "@/components/sections/CreateSectionForm"
import {db} from "@/lib/db"

const CourseCurriculumPage = async ({params}: {params: {courseId: string}}) => {
  const {userId} = await auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      instructorId: userId,
    },

    // include để fetch all data from section
    include: {
      sections: {
        orderBy: {
          position: "asc",
        },
      },
    },
  })

  //   console.log(course)

  if (!course) {
    return redirect("/instructor/courses")
  }

  return <CreateSectionForm course={course} />
}

export default CourseCurriculumPage
