import { HairlineAnalysisResult, JournalEntry } from "@/types/analysis";
import { SAMPLE_ANALYSIS, SAMPLE_JOURNAL_ENTRIES } from "./mock-data";

const STORAGE_KEYS = {
  ANALYSES: "follicleai_analyses",
  JOURNAL: "follicleai_journal",
  LATEST_RESULT: "follicleai_latest_result",
  USER_SETTINGS: "follicleai_settings",
};

export const FollicleStorage = {
  getLatestAnalysis(): HairlineAnalysisResult {
    if (typeof window === "undefined") return SAMPLE_ANALYSIS;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.LATEST_RESULT);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.warn("Error reading local storage", e);
    }
    return SAMPLE_ANALYSIS;
  },

  saveAnalysis(analysis: HairlineAnalysisResult): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(STORAGE_KEYS.LATEST_RESULT, JSON.stringify(analysis));
      const history = this.getAllAnalyses();
      const updated = [analysis, ...history.filter((a) => a.id !== analysis.id)];
      localStorage.setItem(STORAGE_KEYS.ANALYSES, JSON.stringify(updated.slice(0, 15)));
    } catch (e) {
      console.warn("Error saving analysis to storage", e);
    }
  },

  getAllAnalyses(): HairlineAnalysisResult[] {
    if (typeof window === "undefined") return [SAMPLE_ANALYSIS];
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ANALYSES);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Error reading analyses history", e);
    }
    return [SAMPLE_ANALYSIS];
  },

  getJournalEntries(): JournalEntry[] {
    if (typeof window === "undefined") return SAMPLE_JOURNAL_ENTRIES;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.JOURNAL);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.warn("Error reading journal", e);
    }
    return SAMPLE_JOURNAL_ENTRIES;
  },

  addJournalEntry(entry: JournalEntry): void {
    if (typeof window === "undefined") return;
    try {
      const entries = this.getJournalEntries();
      const updated = [entry, ...entries];
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(updated));
    } catch (e) {
      console.warn("Error adding journal entry", e);
    }
  },

  deleteJournalEntry(id: string): void {
    if (typeof window === "undefined") return;
    try {
      const entries = this.getJournalEntries();
      const filtered = entries.filter((e) => e.id !== id);
      localStorage.setItem(STORAGE_KEYS.JOURNAL, JSON.stringify(filtered));
    } catch (e) {
      console.warn("Error deleting journal entry", e);
    }
  },

  clearAllData(): void {
    if (typeof window === "undefined") return;
    try {
      localStorage.removeItem(STORAGE_KEYS.ANALYSES);
      localStorage.removeItem(STORAGE_KEYS.JOURNAL);
      localStorage.removeItem(STORAGE_KEYS.LATEST_RESULT);
    } catch (e) {
      console.warn("Error clearing storage", e);
    }
  },
};
