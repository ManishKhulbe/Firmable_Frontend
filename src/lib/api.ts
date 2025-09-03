import axios from "axios";
import {
  AbnRecord,
  AbnName,
  ApiResponse,
  AbnRecordFilters,
  AbnNameFilters,
  AbnStats,
  NameStats,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ABN Records API
export const abnRecordsApi = {
  // Get all ABN records with filters
  getAll: async (
    filters: AbnRecordFilters = {}
  ): Promise<ApiResponse<AbnRecord[]>> => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/abn-records?${params.toString()}`);
    return response.data;
  },

  // Get single ABN record
  getByAbn: async (
    abn: string
  ): Promise<ApiResponse<{ record: AbnRecord; names: AbnName[] }>> => {
    const response = await api.get(`/abn-records/${abn}`);
    return response.data;
  },

  // Create new ABN record
  create: async (data: Partial<AbnRecord>): Promise<ApiResponse<AbnRecord>> => {
    const response = await api.post("/abn-records", data);
    return response.data;
  },

  // Update ABN record
  update: async (
    abn: string,
    data: Partial<AbnRecord>
  ): Promise<ApiResponse<AbnRecord>> => {
    const response = await api.put(`/abn-records/${abn}`, data);
    return response.data;
  },

  // Delete ABN record
  delete: async (abn: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/abn-records/${abn}`);
    return response.data;
  },

  // Get ABN records statistics
  getStats: async (): Promise<ApiResponse<AbnStats>> => {
    const response = await api.get("/abn-records/stats/overview");
    return response.data;
  },
};

// ABN Names API
export const abnNamesApi = {
  // Get all ABN names with filters
  getAll: async (
    filters: AbnNameFilters = {}
  ): Promise<ApiResponse<AbnName[]>> => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, value.toString());
      }
    });

    const response = await api.get(`/abn-names?${params.toString()}`);
    return response.data;
  },

  // Get single ABN name
  getById: async (id: string): Promise<ApiResponse<AbnName>> => {
    const response = await api.get(`/abn-names/${id}`);
    return response.data;
  },

  // Get names by ABN
  getByAbn: async (abn: string): Promise<ApiResponse<AbnName[]>> => {
    const response = await api.get(`/abn-names/abn/${abn}`);
    return response.data;
  },

  // Create new ABN name
  create: async (data: Partial<AbnName>): Promise<ApiResponse<AbnName>> => {
    const response = await api.post("/abn-names", data);
    return response.data;
  },

  // Update ABN name
  update: async (
    id: string,
    data: Partial<AbnName>
  ): Promise<ApiResponse<AbnName>> => {
    const response = await api.put(`/abn-names/${id}`, data);
    return response.data;
  },

  // Delete ABN name
  delete: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    const response = await api.delete(`/abn-names/${id}`);
    return response.data;
  },

  // Search names
  search: async (
    term: string,
    page = 1,
    limit = 10
  ): Promise<ApiResponse<AbnName[]>> => {
    const response = await api.get(
      `/abn-names/search/${encodeURIComponent(
        term
      )}?page=${page}&limit=${limit}`
    );
    return response.data;
  },

  // Get ABN names statistics
  getStats: async (): Promise<ApiResponse<NameStats>> => {
    const response = await api.get("/abn-names/stats/overview");
    return response.data;
  },
};

export default api;
