import {CharacterState} from "./character";

export interface ChangelogEntry {
  msg: string;
  children?: string[];
}

export function compileChangelogChildren(before: CharacterState[], after: CharacterState[]): ChangelogEntry['children'] {
  const messages: string[] = [];

  // Log all newly added characters.
  for (const afterCharacter of after) {
    if(!before.find(c => c.id === afterCharacter.id)) {
      messages.push(`${afterCharacter.name} appeared, mysteriously.`);
    }
  }

  for(let i = 0; i < before.length; i++) {
    const beforeChar = before[i];
    const afterChar = after.find(c => c.id === beforeChar.id);
    if(!afterChar) {
      messages.push(`${beforeChar.name} disappeared, mysteriously.`);
      continue;
    }

    if(beforeChar.hp.current <= 0 && afterChar.hp.current > 0) {
      messages.push(`${afterChar.name} resurrected with ${afterChar.hp.current} HP.`);
    } else if (beforeChar.hp.current > 0 && afterChar.hp.current <= 0) {
      messages.push(`${afterChar.name} died.`);
    } else if(beforeChar.hp.current < afterChar.hp.current) {
      messages.push(`${afterChar.name} healed ${afterChar.hp.current - beforeChar.hp.current} HP.`);
    } else if(beforeChar.hp.current > afterChar.hp.current) {
      messages.push(`${afterChar.name} received ${beforeChar.hp.current - afterChar.hp.current} points of damage.`);
    }

    if(beforeChar.note !== afterChar.note) {
      if(afterChar.note) {
        messages.push(`${afterChar.name} changed note to '${afterChar.note}'.`);
      } else {
        messages.push(`${afterChar.name} deleted their note.`);
      }
    }

    if(beforeChar.initiative !== afterChar.initiative) {
      messages.push(`${afterChar.name} changed initiative from ${beforeChar.initiative} to ${afterChar.initiative}.`);
    }
  }

  return messages;
}