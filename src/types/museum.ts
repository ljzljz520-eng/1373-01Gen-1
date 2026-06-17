export interface Floor {
  id: string;
  name: string;
  number: number;
  description: string;
  halls: Hall[];
}

export interface Hall {
  id: string;
  name: string;
  roomNumber: string;
  description: string;
  floorId: string;
  exhibitCount: number;
  exhibits: Exhibit[];
}

export interface Exhibit {
  id: string;
  name: string;
  era: string;
  zone: string;
  background: string;
  description: string;
  imageUrl: string;
  hallId: string;
  relatedExhibitIds: string[];
}

export interface BreadcrumbItem {
  label: string;
  path: string;
}

export interface RouteParams {
  floorId?: string;
  hallId?: string;
  exhibitId?: string;
}
