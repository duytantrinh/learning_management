import Sidebar from "@/components/layout/Sidebar"
import TopBar from "@/components/layout/TopBar"

import {auth} from "@clerk/nextjs/server"
import {redirect} from "next/navigation"
import React from "react"

async function InstructorLayout({children}: {children: React.ReactNode}) {
  const {userId} = await auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  return (
    <div className="h-full flex flex-col">
      <TopBar />
      <div className="flex-1 flex">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  )
}

export default InstructorLayout
