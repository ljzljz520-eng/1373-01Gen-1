import { create } from 'zustand';
import type { Floor, Exhibit, BreadcrumbItem } from '@/types/museum';
import {
  floors,
  getFloorById,
  getHallById as getHallByIdFromData,
  getExhibitById,
  getExhibitsByIds,
} from '@/data/museumData';

interface MuseumState {
  floors: Floor[];
  currentFloorId: string | null;
  currentHallId: string | null;
  currentExhibitId: string | null;
  visitedHalls: Set<string>;
  setCurrentFloor: (id: string | null) => void;
  setCurrentHall: (id: string | null) => void;
  setCurrentExhibit: (id: string | null) => void;
  markHallVisited: (hallId: string) => void;
  getFloorById: (id: string) => Floor | undefined;
  getHallById: (floorId: string, hallId: string) => Floor['halls'][0] | undefined;
  getExhibitById: (id: string) => Exhibit | undefined;
  getRelatedExhibits: (exhibitIds: string[]) => Exhibit[];
  generateBreadcrumbs: (
    floorId?: string,
    hallId?: string,
    exhibitId?: string
  ) => BreadcrumbItem[];
}

export const useMuseumStore = create<MuseumState>((set, get) => ({
  floors,
  currentFloorId: null,
  currentHallId: null,
  currentExhibitId: null,
  visitedHalls: new Set<string>(),

  setCurrentFloor: (id) => set({ currentFloorId: id }),
  setCurrentHall: (id) => set({ currentHallId: id }),
  setCurrentExhibit: (id) => set({ currentExhibitId: id }),

  markHallVisited: (hallId) =>
    set((state) => ({
      visitedHalls: new Set(state.visitedHalls).add(hallId),
    })),

  getFloorById: (id) => getFloorById(id),
  getHallById: (floorId, hallId) => getHallByIdFromData(floorId, hallId),
  getExhibitById: (id) => getExhibitById(id),
  getRelatedExhibits: (exhibitIds) => getExhibitsByIds(exhibitIds),

  generateBreadcrumbs: (floorId, hallId, exhibitId) => {
    const crumbs: BreadcrumbItem[] = [{ label: '首页', path: '/' }];

    if (floorId) {
      const floor = get().getFloorById(floorId);
      if (floor) {
        crumbs.push({ label: floor.name, path: `/floor/${floorId}` });

        if (hallId) {
          const hall = get().getHallById(floorId, hallId);
          if (hall) {
            crumbs.push({
              label: hall.name,
              path: `/floor/${floorId}/hall/${hallId}`,
            });

            if (exhibitId) {
              const exhibit = get().getExhibitById(exhibitId);
              if (exhibit) {
                crumbs.push({
                  label: exhibit.name,
                  path: `/floor/${floorId}/hall/${hallId}/exhibit/${exhibitId}`,
                });
              }
            }
          }
        }
      }
    }

    return crumbs;
  },
}));
