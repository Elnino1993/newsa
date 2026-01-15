"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Twitter, MessageCircle, Users, Send, ExternalLink, CheckCircle2, Calendar, Zap } from "lucide-react"

interface Task {
  id: string
  title: string
  description: string
  url: string
  icon: React.ElementType
  reward: number
  completed: boolean
}

const tasks: Task[] = [
  {
    id: "follow",
    title: "Follow on Twitter",
    description: "Follow our official Twitter account",
    url: "https://x.com/OxVentura",
    icon: Twitter,
    reward: 100,
    completed: false,
  },
  {
    id: "retweet",
    title: "Retweet Launch Post",
    description: "Retweet our launch announcement",
    url: "https://x.com/OxVentura/status/2011482805193044428",
    icon: Twitter,
    reward: 150,
    completed: false,
  },
  {
    id: "comment",
    title: "Comment on Post",
    description: "Leave a meaningful comment on our post",
    url: "https://x.com/OxVentura/status/2011482805193044428",
    icon: MessageCircle,
    reward: 200,
    completed: false,
  },
  {
    id: "tag",
    title: "Tag 3 Friends",
    description: "Tag 3 friends in our launch post",
    url: "https://x.com/OxVentura/status/2011482805193044428",
    icon: Users,
    reward: 250,
    completed: false,
  },
  {
    id: "telegram",
    title: "Join Telegram",
    description: "Join our official Telegram community",
    url: "https://t.me/OxVentura",
    icon: Send,
    reward: 100,
    completed: false,
  },
  {
    id: "daily-check",
    title: "Daily Check",
    description: "Complete your daily check-in",
    url: "https://daily.neurium.xyz/",
    icon: Calendar,
    reward: 1000,
    completed: false,
  },
]

export function TaskSection() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set())

  const handleTaskClick = (task: Task) => {
    window.open(task.url, "_blank", "noopener,noreferrer")
    setCompletedTasks((prev) => new Set([...prev, task.id]))
  }

  const earnedRewards = tasks.filter((task) => completedTasks.has(task.id)).reduce((sum, task) => sum + task.reward, 0)

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <Badge
            variant="secondary"
            className="mb-4 text-sm px-6 py-2 bg-gradient-to-r from-primary/20 to-secondary/20 border-primary/50 text-primary font-bold shadow-lg shadow-primary/20"
          >
            <Zap className="h-3 w-3 mr-1" />
            Earn Rewards
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
            <span className="text-balance">Earn </span>
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-pulse">
              $Task
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
            Complete social tasks and earn exclusive rewards in the Neurium ecosystem
          </p>
        </div>

        <Card className="mb-10 border-2 border-primary/40 bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-xl shadow-2xl shadow-primary/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
          <CardContent className="py-8 relative z-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Your Progress</span>
              <span className="text-sm font-bold text-foreground bg-muted/50 px-3 py-1 rounded-full">
                {completedTasks.size}/{tasks.length} tasks
              </span>
            </div>
            <div className="h-4 bg-muted/30 rounded-full overflow-hidden mb-6 border border-border/50">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-700 ease-out rounded-full shadow-lg shadow-primary/50 relative"
                style={{ width: `${(completedTasks.size / tasks.length) * 100}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground font-medium">Total Earned</span>
              <div className="flex items-center gap-2">
                <Zap className="h-6 w-6 text-primary" />
                <span className="text-4xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {earnedRewards}
                </span>
                <span className="text-xl font-bold text-muted-foreground">$Task</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-5">
          {tasks.map((task) => {
            const Icon = task.icon
            const isCompleted = completedTasks.has(task.id)

            return (
              <Card
                key={task.id}
                className={`transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm border-2 ${
                  isCompleted
                    ? "border-primary/60 bg-gradient-to-br from-primary/10 to-secondary/10 shadow-xl shadow-primary/20"
                    : "border-border/50 bg-card/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
                }`}
              >
                <CardContent className="py-6">
                  <div className="flex items-center gap-5">
                    {/* Status Icon */}
                    <div
                      className={`flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        isCompleted
                          ? "bg-gradient-to-br from-primary to-secondary shadow-lg shadow-primary/50"
                          : "bg-muted/50 border-2 border-border"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-7 w-7 text-background" />
                      ) : (
                        <Icon className="h-7 w-7 text-muted-foreground" />
                      )}
                    </div>

                    {/* Task Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-xl mb-1 text-foreground">{task.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
                    </div>

                    {/* Reward */}
                    <div className="text-right mr-4">
                      <div className="flex items-center gap-1 justify-end mb-1">
                        <Zap className="h-5 w-5 text-primary" />
                        <span className="text-2xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                          +{task.reward}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">$Task</p>
                    </div>

                    {/* Action Button */}
                    <Button
                      onClick={() => handleTaskClick(task)}
                      variant={isCompleted ? "outline" : "default"}
                      size="lg"
                      className={`gap-2 flex-shrink-0 font-bold transition-all duration-300 ${
                        isCompleted
                          ? "border-2 border-primary/50 text-primary hover:bg-primary/10"
                          : "bg-gradient-to-r from-primary to-secondary text-background shadow-lg shadow-primary/30 hover:shadow-primary/50"
                      }`}
                    >
                      {isCompleted ? "Done" : "Start"}
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
