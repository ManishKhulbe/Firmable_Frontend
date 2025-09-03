"use client";

import { useState, useEffect } from "react";
import { X, Save, AlertCircle } from "lucide-react";
import { AbnRecord } from "@/types";
import { abnRecordsApi } from "@/lib/api";

interface AbnRecordFormProps {
  isOpen: boolean;
  onClose: () => void;
  record?: AbnRecord | null;
  onSuccess: () => void;
}

export default function AbnRecordForm({
  isOpen,
  onClose,
  record,
  onSuccess,
}: AbnRecordFormProps) {
  const [formData, setFormData] = useState({
    abn: "",
    status: "Active" as "Active" | "Cancelled",
    entityTypeCode: "",
    entityTypeText: "",
    acn: "",
    gstStatus: "Registered" as "Registered" | "Cancelled",
    state: "",
    postcode: "",
    legalName: "",
    organisationName: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (record) {
      setFormData({
        abn: record.abn || "",
        status: record.status || "Active",
        entityTypeCode: record.entityTypeCode || "",
        entityTypeText: record.entityTypeText || "",
        acn: record.acn || "",
        gstStatus: record.gstStatus || "Registered",
        state: record.state || "",
        postcode: record.postcode || "",
        legalName: record.legalName || "",
        organisationName: record.organisationName || "",
      });
      setIsEditMode(true);
    } else {
      setFormData({
        abn: "",
        status: "Active" as "Active" | "Cancelled",
        entityTypeCode: "",
        entityTypeText: "",
        acn: "",
        gstStatus: "Registered" as "Registered" | "Cancelled",
        state: "",
        postcode: "",
        legalName: "",
        organisationName: "",
      });
      setIsEditMode(false);
    }
    setError(null);
  }, [record, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isEditMode && record) {
        await abnRecordsApi.update(record.abn, formData);
      } else {
        await abnRecordsApi.create(formData);
      }
      onSuccess();
      onClose();
    } catch (err: unknown) {
      setError(
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isEditMode ? "Edit ABN Record" : "Create New ABN Record"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <div className="flex">
                <AlertCircle className="h-5 w-5 text-red-400" />
                <div className="ml-3">
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ABN *
              </label>
              <input
                type="text"
                name="abn"
                value={formData.abn}
                onChange={handleInputChange}
                placeholder="12345678901"
                maxLength={11}
                required
                disabled={isEditMode}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Active">Active</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entity Type Code
              </label>
              <input
                type="text"
                name="entityTypeCode"
                value={formData.entityTypeCode}
                onChange={handleInputChange}
                placeholder="e.g., COM, IND, PPL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Entity Type Text
              </label>
              <input
                type="text"
                name="entityTypeText"
                value={formData.entityTypeText}
                onChange={handleInputChange}
                placeholder="e.g., Company, Individual"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ACN
              </label>
              <input
                type="text"
                name="acn"
                value={formData.acn}
                onChange={handleInputChange}
                placeholder="123456789"
                maxLength={9}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GST Status
              </label>
              <select
                name="gstStatus"
                value={formData.gstStatus}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Registered">Registered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select State</option>
                <option value="NSW">NSW - New South Wales</option>
                <option value="VIC">VIC - Victoria</option>
                <option value="QLD">QLD - Queensland</option>
                <option value="WA">WA - Western Australia</option>
                <option value="SA">SA - South Australia</option>
                <option value="TAS">TAS - Tasmania</option>
                <option value="ACT">ACT - Australian Capital Territory</option>
                <option value="NT">NT - Northern Territory</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Postcode
              </label>
              <input
                type="text"
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
                placeholder="e.g., 2000"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legal Name
              </label>
              <input
                type="text"
                name="legalName"
                value={formData.legalName}
                onChange={handleInputChange}
                placeholder="Legal entity name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organisation Name
              </label>
              <input
                type="text"
                name="organisationName"
                value={formData.organisationName}
                onChange={handleInputChange}
                placeholder="Organisation name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="h-4 w-4" />
              <span>
                {loading ? "Saving..." : isEditMode ? "Update" : "Create"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
