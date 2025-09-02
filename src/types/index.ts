export interface AbnRecord {
  _id: string;
  abn: string;
  status: "Active" | "Cancelled";
  abnStatusFromDate: string;
  entityTypeCode?: string;
  entityTypeText?: string;
  legalName?: string;
  organisationName?: string;
  acn?: string;
  gstStatus: "Registered" | "Cancelled";
  gstFromDate?: string;
  state?: string;
  postcode?: string;
  lastUpdated: string;
  createdAt: string;
  updatedAt: string;
}

export interface AbnName {
  _id: string;
  abn: string;
  name: string;
  type: "TradingName" | "BusinessName" | "LegalName" | "Other";
  createdAt: string;
  updatedAt: string;
  abnRecord?: AbnRecord;
}

export interface ApiResponse<T> {
  status: string;
  results?: number;
  total?: number;
  page?: number;
  pages?: number;
  data: T;
}

export interface AbnRecordFilters {
  page?: number;
  limit?: number;
  status?: "Active" | "Cancelled";
  entityType?: string;
  state?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface AbnNameFilters {
  page?: number;
  limit?: number;
  abn?: string;
  type?: "TradingName" | "BusinessName" | "LegalName" | "Other";
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface AbnStats {
  overview: {
    totalRecords: number;
    activeRecords: number;
    cancelledRecords: number;
    gstRegistered: number;
  };
  entityTypes: Array<{
    _id: string;
    count: number;
  }>;
  states: Array<{
    _id: string;
    count: number;
  }>;
}

export interface NameStats {
  overview: {
    totalNames: number;
    uniqueAbns: number;
  };
  nameTypes: Array<{
    _id: string;
    count: number;
  }>;
}
