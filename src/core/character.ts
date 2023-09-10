export interface ICharacter {
  name: string;
  initiative: number;
  hp: {
    current: number;
    max: number;
  }
}