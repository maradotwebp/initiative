import {canAct, CharacterState} from "./character";

export interface TrackerState {
  inFight: boolean;
  currentCharacter: CharacterState|undefined;
}

/**
 * Returns the state for a new fight.
 */
export function startedFight(characters: CharacterState[]): TrackerState {
  // If there is only one or fewer characters who can act, there is no fight
  if(characters.filter(canAct).length <= 1) return stoppedFight();

  return {
    inFight: true,
    currentCharacter: characters[0]
  }
}

/**
 * Returns the state for a new stopped fight.
 */
export function stoppedFight(): TrackerState {
  return {
    inFight: false,
    currentCharacter: undefined
  }
}

/**
 * Returns the trackerState such that the previous character in the turn order is acting.
 */
export function previous(state: TrackerState, characters: CharacterState[]): TrackerState {
  // If there is only one or fewer characters who can act, there is no fight
  if(characters.filter(canAct).length <= 1) return stoppedFight();

  let character = state.currentCharacter;
  do {
    const curIdx = characters.findIndex(c => c.id === character?.id);
    character = characters[(curIdx - 1 + characters.length) % characters.length];
  } while(!canAct(character));

  return {
    ...state,
    currentCharacter: character
  }
}

/**
 * Returns the trackerState such that the next character in the turn order is acting.
 */
export function next(state: TrackerState, characters: CharacterState[]): TrackerState {
  // If there is only one or fewer characters who can act, there is no fight
  if(characters.filter(canAct).length <= 1) return stoppedFight();

  let character = state.currentCharacter;
  do {
    const curIdx = characters.findIndex(c => c.id === character?.id);
    character = characters[(curIdx + 1) % characters.length];
  } while(!canAct(character));

  return {
    ...state,
    currentCharacter: character
  }
}