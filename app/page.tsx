import { Header } from "@/components/header"
import { TaskSection } from "@/components/task-section"

export default function TaskPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TaskSection />
      </main>
    </div>
  )
}
