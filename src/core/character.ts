export interface CharacterState {
  name: string;
  initiative: number;
  type: "axe" | "bow" | "club" | "dagger" | "machete" | "sword" | "wand";
  hp: {
    current: number;
    max: number;
  }
}

/**
 * Returns whether a character can act on their turn.
 */
export function canAct(character: CharacterState): boolean {
  return character.hp.current > 0;
}