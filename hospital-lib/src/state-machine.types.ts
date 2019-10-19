export const possibleStates = ["F", "H", "D", "T", "X"] as const;
export const possibleDrugs = ["I", "An", "P", "As"] as const;
export type State = typeof possibleStates[number];
export type Drug = typeof possibleDrugs[number];
export type TriggerFunction = (x: Drug[]) => boolean;
export type Trigger = Drug[] | TriggerFunction;

export interface Rule {
    sources: State[];
    target: State;
    triggers: Trigger[]
}
