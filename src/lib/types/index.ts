export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Type[];
  moves: Move[];
}

export interface Type {
  id: number;
  name: string;
}

export interface Move {
  id: number;
  name: string;
}
