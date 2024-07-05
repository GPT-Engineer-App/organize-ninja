import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { CircleUser, Menu, Package2, Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { navItems } from "../App";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Layout = () => {
  const [projects, setProjects] = useState([]);

  const addProject = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <Sidebar projects={projects} addProject={addProject} />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <MobileSidebar projects={projects} addProject={addProject} />
          <div className="w-full flex-1">{/* Add nav bar content here! */}</div>
          <UserDropdown />
        </header>
        <main className="flex-grow p-4 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

const Sidebar = ({ projects, addProject }) => (
  <div className="hidden border-r bg-muted/40 md:block">
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <NavLink to="/" className="flex items-center gap-2 font-semibold">
          <Package2 className="h-6 w-6" />
          <span>TodoMaster</span>
        </NavLink>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-2">
          {navItems.map((item) => (
            <SidebarNavLink key={item.to} to={item.to}>
              {item.icon}
              {item.title}
            </SidebarNavLink>
          ))}
          <div className="mt-4">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground">Projects</h3>
            {projects.map((project, index) => (
              <SidebarNavLink key={index} to={`/project/${project.name}`}>
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }}></span>
                {project.name}
              </SidebarNavLink>
            ))}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Project</DialogTitle>
                </DialogHeader>
                <AddProjectForm addProject={addProject} />
              </DialogContent>
            </Dialog>
          </div>
        </nav>
      </div>
    </div>
  </div>
);

const MobileSidebar = ({ projects, addProject }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left" className="flex flex-col">
      <nav className="grid gap-2 text-lg font-medium">
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-semibold mb-4"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">TodoMaster</span>
        </NavLink>
        {navItems.map((item) => (
          <SidebarNavLink key={item.to} to={item.to}>
            {item.icon}
            {item.title}
          </SidebarNavLink>
        ))}
        <div className="mt-4">
          <h3 className="text-xs font-semibold uppercase text-muted-foreground">Projects</h3>
          {projects.map((project, index) => (
            <SidebarNavLink key={index} to={`/project/${project.name}`}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }}></span>
              {project.name}
            </SidebarNavLink>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="mt-2 w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Project</DialogTitle>
              </DialogHeader>
              <AddProjectForm addProject={addProject} />
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </SheetContent>
  </Sheet>
);

const UserDropdown = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="secondary" size="icon" className="rounded-full">
        <CircleUser className="h-5 w-5" />
        <span className="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Settings</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Logout</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const SidebarNavLink = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary text-muted-foreground",
        isActive && "text-primary bg-muted",
      )
    }
  >
    {children}
  </NavLink>
);

const AddProjectForm = ({ addProject }) => {
  const [projectName, setProjectName] = useState("");
  const [projectColor, setProjectColor] = useState("#000000");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName.trim()) {
      addProject({ name: projectName, color: projectColor });
      setProjectName("");
      setProjectColor("#000000");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="projectName">Project Name</Label>
        <Input
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="projectColor">Project Color</Label>
        <Input
          id="projectColor"
          type="color"
          value={projectColor}
          onChange={(e) => setProjectColor(e.target.value)}
        />
      </div>
      <Button type="submit">Add Project</Button>
    </form>
  );
};

export default Layout;