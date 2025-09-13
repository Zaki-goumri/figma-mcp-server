export interface FigmaDocument {
  name: string;
  version: string;
  lastModified: string;
  document: FigmaNode;
}

export interface FigmaNode {
  id: string;
  name: string;
  type: string;
  children?: FigmaNode[];
  absoluteBoundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  fills?: any[];
  strokes?: any[];
  characters?: string;
  style?: any;
}

export interface FigmaComponent {
  key: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface FigmaStyle {
  key: string;
  name: string;
  description: string;
  style_type: 'FILL' | 'TEXT' | 'EFFECT' | 'GRID';
}

export interface FigmaComment {
  id: string;
  message: string;
  user: {
    handle: string;
    img_url: string;
  };
  created_at: string;
  resolved_at?: string;
}
