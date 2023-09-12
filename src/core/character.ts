export interface CharacterState {
  name: string;
  initiative: number;
  type: "axe" | "bow" | "club" | "dagger" | "machete" | "sword" | "wand";
  hp: {
    current: number;
    max: number;
  }
}