import { useState } from "react";
import {
  LayoutDashboard,
  Activity as ActivityIcon,
  ClipboardList,
  Trophy,
  BarChart3
} from "lucide-react";

import AdminLayout from "../layouts/AdminLayout";

import Overview from "../components/admin/Overview";
import Activity from "../components/admin/Activity";
import Tests from "../components/admin/Tests";
import Results from "../components/admin/Results";
import Performance from "../components/admin/Performance";

import { MdSpaceDashboard } from "react-icons/md";
function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AdminLayout>
      <div className="flex  items-center gap-2">
      <MdSpaceDashboard size={25} color="#2563eb" />
      <h1 className="dashboard-header">Admin Dashboard</h1>
      </div>

      <div className="top-tabs">

        <div
          className={`tab-item ${activeTab === "overview" ? "active" : ""}`}
          onClick={() => setActiveTab("overview")}
        >
          <LayoutDashboard size={18} />
          Overview
        </div>

        <div
          className={`tab-item ${activeTab === "activity" ? "active" : ""}`}
          onClick={() => setActiveTab("activity")}
        >
          <ActivityIcon size={18} />
          Activity
        </div>

        <div
          className={`tab-item ${activeTab === "tests" ? "active" : ""}`}
          onClick={() => setActiveTab("tests")}
        >
          <ClipboardList size={18} />
          Tests
        </div>

        <div
          className={`tab-item ${activeTab === "results" ? "active" : ""}`}
          onClick={() => setActiveTab("results")}
        >
          <Trophy size={18} />
          Results
        </div>

        <div
          className={`tab-item ${activeTab === "performance" ? "active" : ""}`}
          onClick={() => setActiveTab("performance")}
        >
          <BarChart3 size={18} />
          Performance
        </div>

      </div>

      <div className="tab-content">
        {activeTab === "overview" && <Overview />}
        {activeTab === "activity" && <Activity />}
        {activeTab === "tests" && <Tests />}
        {activeTab === "results" && <Results />}
        {activeTab === "performance" && <Performance />}
      </div>

    </AdminLayout>
  );
}

export default AdminDashboard;