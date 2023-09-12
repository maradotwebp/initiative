import {CharacterState} from "./character";

export interface ChangelogEntry {
  msg: string;
  children?: string[];
}

export function compileChangelogChildren(before: CharacterState[], after: CharacterState[]): ChangelogEntry['children'] {
  const messages: string[] = [];

  for(let i = 0; i < before.length; i++) {
    const beforeChar = before[i];
    const afterChar = after.find(c => c.id === beforeChar.id);
    if(!afterChar) {
      messages.push(`${beforeChar.name} disappeared, mysteriously.`);
    } else if(beforeChar.hp.current < afterChar.hp.current) {
      messages.push(`${afterChar.name} healed ${afterChar.hp.current - beforeChar.hp.current} HP.`);
    } else if(beforeChar.hp.current > afterChar.hp.current) {
      messages.push(`${afterChar.name} received ${beforeChar.hp.current - afterChar.hp.current} points of damage.`);
    }
  }

  return messages;
}