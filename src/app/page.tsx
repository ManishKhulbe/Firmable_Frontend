"use client";

import { useState, useEffect } from "react";
import { Building2, Users, BarChart3, Search } from "lucide-react";
import AbnRecordsTable from "@/components/AbnRecordsTable";
import AbnNamesTable from "@/components/AbnNamesTable";
import AbnRecordModal from "@/components/AbnRecordModal";
import { AbnRecord, AbnName, AbnStats, NameStats } from "@/types";
import { abnRecordsApi, abnNamesApi } from "@/lib/api";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"records" | "names">("records");
  const [selectedRecord, setSelectedRecord] = useState<AbnRecord | null>(null);
  const [selectedName, setSelectedName] = useState<AbnName | null>(null);
  const [abnStats, setAbnStats] = useState<AbnStats | null>(null);
  const [nameStats, setNameStats] = useState<NameStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch statistics on component mount
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const [abnStatsResponse, nameStatsResponse] = await Promise.all([
          abnRecordsApi.getStats(),
          abnNamesApi.getStats()
        ]);
        setAbnStats(abnStatsResponse.data);
        setNameStats(nameStatsResponse.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleViewRecord = (record: AbnRecord) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  const handleEditRecord = (record: AbnRecord) => {
    setSelectedRecord(record);
    // You can implement an edit modal or form
    console.log("Edit record:", record);
  };

  const handleDeleteRecord = (record: AbnRecord) => {
    if (confirm(`Are you sure you want to delete ABN ${record.abn}?`)) {
      // You can implement delete functionality
      console.log("Delete record:", record);
    }
  };

  const handleViewName = (name: AbnName) => {
    setSelectedName(name);
    // You can implement a modal or navigate to a detail page
    console.log("View name:", name);
  };

  const handleEditName = (name: AbnName) => {
    setSelectedName(name);
    // You can implement an edit modal or form
    console.log("Edit name:", name);
  };

  const handleDeleteName = (name: AbnName) => {
    if (confirm(`Are you sure you want to delete "${name.name}"?`)) {
      // You can implement delete functionality
      console.log("Delete name:", name);
    }
  };

  // Function to refresh statistics
  const refreshStats = async () => {
    try {
      const [abnStatsResponse, nameStatsResponse] = await Promise.all([
        abnRecordsApi.getStats(),
        abnNamesApi.getStats()
      ]);
      setAbnStats(abnStatsResponse.data);
      setNameStats(nameStatsResponse.data);
    } catch (error) {
      console.error("Error refreshing statistics:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Building2 className="h-8 w-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">FIRMABLE</h1>
              </div>
              <span className="text-sm text-gray-500">
                ABN Records Management
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Search className="h-4 w-4" />
                <span>Search & Filter</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("records")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "records"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>ABN Records</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("names")}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "names"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>ABN Names</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Building2 className="h-8 w-8 text-blue-600" />
              </div>
                              <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Total Records
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {loading ? "..." : abnStats?.overview.totalRecords || 0}
                  </p>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-green-600" />
              </div>
                              <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">Total Names</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {loading ? "..." : nameStats?.overview.totalNames || 0}
                  </p>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BarChart3 className="h-8 w-8 text-purple-600" />
              </div>
                              <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    Active Records
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {loading ? "..." : abnStats?.overview.activeRecords || 0}
                  </p>
                </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Search className="h-8 w-8 text-orange-600" />
              </div>
                              <div className="ml-4">
                  <p className="text-sm font-medium text-gray-500">
                    GST Registered
                  </p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {loading ? "..." : abnStats?.overview.gstRegistered || 0}
                  </p>
                </div>
            </div>
          </div>
        </div>

        {/* Table Content */}
        {activeTab === "records" && (
          <AbnRecordsTable
            onViewRecord={handleViewRecord}
            onEditRecord={handleEditRecord}
            onDeleteRecord={handleDeleteRecord}
            onDataChange={refreshStats}
          />
        )}

        {activeTab === "names" && (
          <AbnNamesTable
            onViewName={handleViewName}
            onEditName={handleEditName}
            onDeleteName={handleDeleteName}
            onDataChange={refreshStats}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>© 2025 FIRMABLE - ABN Records Management System</p>
            <p className="mt-1">
              Built with Next.js, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      {/* ABN Record Modal */}
      <AbnRecordModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        record={selectedRecord}
      />
    </div>
  );
}
