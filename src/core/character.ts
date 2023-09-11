export interface ICharacter {
  name: string;
  initiative: number;
  type: "sword" | "machete";
  hp: {
    current: number;
    max: number;
  }
}