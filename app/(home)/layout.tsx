import TopBar from "@/components/layout/TopBar"

function HomeLayout({children}: {children: React.ReactNode}) {
  return (
    <>
      <TopBar />
      {children}
    </>
  )
}

export default HomeLayout
