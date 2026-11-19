// Import NavLink from react-router, to link to admin pages
import { NavLink } from "react-router";
import { Users, MapPinHouse, ImageUp, Replace } from 'lucide-react';
import styles from "./DashboardNav.module.css";

const TABS = [
  { id: 1, label: "Upload Hero Image", icon: ImageUp, route: "upload-image" },
  { id: 2, label: "Change Hero Image", icon: Replace, route: "change-image"},
  { id: 3, label: "Users", icon: Users, route: "users" },
  { id: 4, label: "Destinations", icon: MapPinHouse, route: "dest-admin" },
];

function DashboardNavLinks(){
  return (
    <div
      className={styles.dashboard}
      role="group"
      aria-label="Admin dashboard tabs navigation"
    >
      {TABS.map(tab => {
        const Icon = tab.icon;

        return (
          <NavLink
            to={tab.route}
            key={tab.id}
            className={({ isActive }) =>
              isActive
                ? `${styles.tabBtn} ${styles.active}`
                : styles.tabBtn
            }
          >
            <Icon size={24} strokeWidth={2} />
            {tab.label}
          </NavLink>
        );
      })}
    </div>
  );
}
// 13. Open Dashboard.jsx
export default DashboardNavLinks;