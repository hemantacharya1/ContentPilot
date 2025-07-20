import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Mic, 
  FileText, 
  Youtube, 
  Image, 
  Link,
  Twitter,
  Linkedin,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Brain,
  Zap,
  TrendingUp,
  Clock,
  Users,
  Target
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("create");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const stats = [
    { title: "Content Generated", value: "24", icon: FileText, trend: "+12%" },
    { title: "Platforms Connected", value: "3", icon: Target, trend: "+1" },
    { title: "AI Generations Left", value: "5", icon: Zap, trend: "Free Plan" },
    { title: "Engagement Rate", value: "8.2%", icon: TrendingUp, trend: "+2.1%" },
  ];

  const recentContent = [
    {
      title: "AI in 2024: Key Trends Thread",
      platform: "Twitter",
      status: "Published",
      engagement: "1.2k views",
      time: "2 hours ago"
    },
    {
      title: "Building in Public: Lessons Learned",
      platform: "LinkedIn",
      status: "Scheduled",
      engagement: "Draft",
      time: "Tomorrow 9 AM"
    },
    {
      title: "Voice Note: Product Ideas",
      platform: "Processing",
      status: "Processing",
      engagement: "2 min audio",
      time: "5 minutes ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gradient">ContentPilot</h1>
              <Badge variant="secondary" className="hidden sm:inline-flex">
                Free Plan
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.trend}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Create Tab */}
          <TabsContent value="create" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Input Methods */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5" />
                      Create New Content
                    </CardTitle>
                    <CardDescription>
                      Choose your input method to start creating content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Button variant="outline" className="h-24 flex-col gap-2">
                        <Mic className="h-8 w-8" />
                        Voice Recording
                      </Button>
                      <Button variant="outline" className="h-24 flex-col gap-2">
                        <Youtube className="h-8 w-8" />
                        YouTube Link
                      </Button>
                      <Button variant="outline" className="h-24 flex-col gap-2">
                        <FileText className="h-8 w-8" />
                        PDF Upload
                      </Button>
                      <Button variant="outline" className="h-24 flex-col gap-2">
                        <Image className="h-8 w-8" />
                        Screenshot
                      </Button>
                      <Button variant="outline" className="h-24 flex-col gap-2">
                        <Link className="h-8 w-8" />
                        Article Link
                      </Button>
                      <Button variant="outline" className="h-24 flex-col gap-2">
                        <FileText className="h-8 w-8" />
                        Raw Text
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Actions */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="ghost">
                      <Twitter className="h-4 w-4 mr-2" />
                      Generate Twitter Thread
                    </Button>
                    <Button className="w-full justify-start" variant="ghost">
                      <Linkedin className="h-4 w-4 mr-2" />
                      Create LinkedIn Post
                    </Button>
                    <Button className="w-full justify-start" variant="ghost">
                      <Brain className="h-4 w-4 mr-2" />
                      Train Writing Style
                    </Button>
                    <Button className="w-full justify-start" variant="ghost">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Content
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Content</CardTitle>
                    <CardDescription>
                      Your latest generated and published content
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentContent.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <h3 className="font-medium">{item.title}</h3>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {item.platform}
                              </Badge>
                              <Badge 
                                variant={item.status === "Published" ? "default" : "outline"}
                                className="text-xs"
                              >
                                {item.status}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <div>{item.engagement}</div>
                            <div className="text-xs">{item.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Content Library */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Content Library</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Drafts</span>
                      <Badge variant="secondary">12</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Published</span>
                      <Badge variant="secondary">24</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Scheduled</span>
                      <Badge variant="secondary">3</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Templates</span>
                      <Badge variant="secondary">8</Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Memory Tab */}
          <TabsContent value="memory" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5" />
                    Content Memory
                  </CardTitle>
                  <CardDescription>
                    Your AI remembers key insights and learnings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">AI Trends 2024</h4>
                      <p className="text-sm text-muted-foreground">
                        Key insights about AI development, LLMs, and market trends from 5 sources
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">AI</Badge>
                        <Badge variant="outline" className="text-xs">Technology</Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <h4 className="font-medium mb-2">Building in Public</h4>
                      <p className="text-sm text-muted-foreground">
                        Lessons learned from indie hackers and startup founders
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="outline" className="text-xs">Startups</Badge>
                        <Badge variant="outline" className="text-xs">Growth</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Writing Style
                  </CardTitle>
                  <CardDescription>
                    AI learns your unique voice and tone
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Style Training</span>
                      <Badge variant="secondary">85% Complete</Badge>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-[85%]"></div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Tone</span>
                        <span className="text-muted-foreground">Professional, Friendly</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Length</span>
                        <span className="text-muted-foreground">Medium-form</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Keywords</span>
                        <span className="text-muted-foreground">AI, Tech, Building</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Total Views</span>
                      <span className="font-medium">12.4K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Engagement Rate</span>
                      <span className="font-medium">8.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Content Published</span>
                      <span className="font-medium">24</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Best Performing</span>
                      <span className="font-medium">Twitter</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Usage Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">AI Generations Used</span>
                      <span className="font-medium">5 / 5</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full w-full"></div>
                    </div>
                    <div className="text-center">
                      <Button className="w-full">
                        Upgrade to Pro
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 