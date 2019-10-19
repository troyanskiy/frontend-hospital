import { possibleStates, State } from './quarantine';

export type PatientsRegister = Partial<Record<State, number>>;

