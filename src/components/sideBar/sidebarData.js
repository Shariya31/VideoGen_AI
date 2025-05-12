// sidebarData.js
export const sidebarLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "🏠",
    },
    {
      name: "Explore",
      icon: "📁",
      children: [
        { name: "All Projects", path: "/projects" },
        { name: "New Project", path: "/projects/new" },
      ],
    },
    {
      name: "Create New Video",
      icon: "✅",
      path: "/new-video",
    },
    // {
    //   name: "Logout",
    //   icon: "⚙️",
    //   // children: [
    //   //   { name: "Profile", path: "/settings/profile" },
    //   //   { name: "Preferences", path: "/settings/preferences" },
    //   // ],
    // },
  ];
  