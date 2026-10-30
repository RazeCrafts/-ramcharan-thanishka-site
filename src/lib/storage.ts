/**
 * Static storage layer — no Cloudflare, no database, no R2.
 * All data is hardcoded here and in page components.
 * Media is served directly from /public/assets/.
 */

export interface Milestone {
  id: string;
  date: string;
  title: string;
  description: string;
  photo?: string;
  completed: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface GalleryItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  thumbnailUrl?: string;
  caption?: string;
  description?: string;
  captureDate?: string;
  uploadDate: string;
  exifDate?: string;
  type: "photo" | "video";
}

export interface Letter {
  id: string;
  title: string;
  content: string;
  date: string;
  isDraft: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface HighScore {
  userId: string;
  score: number;
  updatedAt: string;
}

const MILESTONES: Milestone[] = [
  {
    id: "milestone-1",
    date: "2026-07-20",
    title: "The day we started dating",
    description: "July 20, 2026 — where our story began.",
    completed: true,
    order: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "milestone-2",
    date: "2026-08-04",
    title: "Our first kiss",
    description: "August 4, 2026 — a moment we'll never forget.",
    completed: true,
    order: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "milestone-3",
    date: "2026-10-20",
    title: "Three months together",
    description: "October 20, 2026 — a quarter of a year.",
    completed: true,
    order: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "milestone-4",
    date: "2027-01-20",
    title: "Six months together",
    description: "January 20, 2027 — half a year.",
    completed: false,
    order: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "milestone-5",
    date: "2027-07-20",
    title: "One year together",
    description: "July 20, 2027 — a full year together.",
    completed: false,
    order: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const storage = {
  listMilestones: async (): Promise<Milestone[]> => MILESTONES,
  getMilestone: async (id: string): Promise<Milestone | null> =>
    MILESTONES.find((m) => m.id === id) ?? null,
  addMilestone: async () => {
    throw new Error("Custom milestones are not supported in this static version.");
  },
  updateMilestone: async () => {
    throw new Error("Milestone updates are not supported in this static version.");
  },
  deleteMilestone: async () => {
    throw new Error("Milestone deletion is not supported in this static version.");
  },
  listGallery: async (): Promise<GalleryItem[]> => [],
  getGalleryItem: async () => null,
  addGalleryItem: async () => {
    throw new Error("Uploads are not supported in this static version.");
  },
  updateGalleryItem: async () => {
    throw new Error("Gallery updates are not supported in this static version.");
  },
  deleteGalleryItem: async () => {
    throw new Error("Gallery deletion is not supported in this static version.");
  },
  listLetters: async (): Promise<Letter[]> => [],
  getLetter: async () => null,
  addLetter: async () => {
    throw new Error("Letters are not supported in this static version.");
  },
  updateLetter: async () => {
    throw new Error("Letter updates are not supported in this static version.");
  },
  deleteLetter: async () => {
    throw new Error("Letter deletion is not supported in this static version.");
  },
  listScores: async (): Promise<HighScore[]> => [],
  setScore: async () => {
    throw new Error("High scores are not supported in this static version.");
  },
  getCounter: async () => ({ muah: 0 }),
  incrementCounter: async () => {
    throw new Error("Counter is not supported in this static version.");
  },
};
