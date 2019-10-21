export const possibleStates = {
    F: 'Fever',
    H: 'Healthy',
    D: 'Diabetes',
    T: 'Tuberculosis',
    X: 'Dead'
};
export const possibleDrugs = {
    I: 'Insulin',
    An: 'Antibiotic',
    P: 'Paracetamol',
    As: 'Aspirin'
};
export type State = keyof typeof possibleStates;
export type Drug = keyof typeof possibleDrugs;
export type TriggerFunction = (x: Drug[]) => boolean;
export type Trigger = Drug[] | TriggerFunction;

export interface Rule {
    sources: State[];
    target: State;
    triggers: Trigger[]
}
