const sidebarNav = [
  {
    adminPage: false,   
    link: "/",
    section: "Dashboard",
    icon: "lucide:layout-dashboard", //width:"20"
    text: "Dashboard",
  },
  {
    adminPage: false,   
    link: "/patients",
    section: "patients",
    icon: "ph:users-bold",
    text: "Patients",
  },
  {
    adminPage: false,   
    link: "/records",
    section: "records",
    icon: "vaadin:records",
    text: "Medical Records",
  },
    {
    adminPage: false,   
    link: "/inventory",
    section: "inventory",
    icon: "icon-park-outline:ad-product",
    text: "Inventory",
  },
  {
    adminPage: false,   
    link: "/prescriptions",
    section: "prescriptions",
    icon: "material-symbols:prescriptions",
    text: "Prescriptions",
  },
    {
    adminPage: false,   
    link: "/transactions",
    section: "transactions",
    icon: "icon-park-outline:transaction-order",
    text: "Transactions",
  },
    {
    adminPage: false,   
    link: "/chat",
    section: "chat",
    icon: "mingcute:chat-4-fill",
    text: "Chat",
  },
{
    adminPage: false,   
    link: "/notifications",
    section: "notifications",
    icon: "clarity:notification-solid",
    text: "Notifications",
  },
    {
    adminPage: true,
    link: "/team_management",
    section: "team_management",
    icon: "fluent:people-team-16-filled",
    text: "Team Management",
  },
    {
    adminPage: true,
    link: "/audit",
    section: "audit",
    icon: "fluent-mdl2:compliance-audit",
    text: "Audit",
  },

];

export default sidebarNav;
