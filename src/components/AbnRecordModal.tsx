"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { X, Building2, User, MapPin, Calendar, FileText } from "lucide-react";
import { AbnRecord } from "@/types";
import { formatDate, formatAbn, getStatusColor } from "@/lib/utils";

interface AbnRecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  record: AbnRecord | null;
}

export default function AbnRecordModal({
  isOpen,
  onClose,
  record,
}: AbnRecordModalProps) {
  if (!record) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-semibold text-gray-900"
                      >
                        ABN Record Details
                      </Dialog.Title>
                      <p className="text-sm text-gray-500">
                        Complete information for this ABN
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  {/* ABN Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      ABN Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          ABN
                        </label>
                        <p className="text-lg font-mono text-gray-900">
                          {formatAbn(record.abn)}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Status
                        </label>
                        <div className="mt-1">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              record.status
                            )}`}
                          >
                            {record.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Entity Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      Entity Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Entity Name
                        </label>
                        <p className="text-sm text-gray-900 mt-1">
                          {record.organisationName || record.legalName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Entity Type
                        </label>
                        <div className="mt-1">
                          <p className="text-sm text-gray-900">
                            {record.entityTypeCode || "N/A"}
                          </p>
                          {record.entityTypeText && (
                            <p className="text-xs text-gray-500">
                              {record.entityTypeText}
                            </p>
                          )}
                        </div>
                      </div>
                      {record.acn && (
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            ACN
                          </label>
                          <p className="text-sm font-mono text-gray-900 mt-1">
                            {record.acn}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* GST Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      GST Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          GST Status
                        </label>
                        <div className="mt-1">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                              record.gstStatus
                            )}`}
                          >
                            {record.gstStatus}
                          </span>
                        </div>
                      </div>
                      {record.gstFromDate && (
                        <div>
                          <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                            GST From Date
                          </label>
                          <p className="text-sm text-gray-900 mt-1">
                            {formatDate(record.gstFromDate)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Address Information */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <MapPin className="h-4 w-4 mr-2" />
                      Address Information
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          State
                        </label>
                        <p className="text-sm text-gray-900 mt-1">
                          {record.state || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Postcode
                        </label>
                        <p className="text-sm text-gray-900 mt-1">
                          {record.postcode || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Important Dates
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          ABN Status From
                        </label>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatDate(record.abnStatusFromDate)}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Last Updated
                        </label>
                        <p className="text-sm text-gray-900 mt-1">
                          {formatDate(record.lastUpdated)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
