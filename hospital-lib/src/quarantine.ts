import { PatientsRegister } from './patientsRegister';

export const possibleStates = ["F", "H", "D", "T", "X"] as const;
const possibleDrugs = ["I", "An", "P", "As"] as const;

export type State = typeof possibleStates[number];
export type Drug = typeof possibleDrugs[number];

type TriggerFunction = (x: Drug[]) => boolean;
export type Trigger = Drug[] | TriggerFunction;

interface Rule {
    sources: State[];
    target: State;
    triggers: Trigger[]
}

function isInsulinMissed(drugsGiven: Drug[]): boolean {
    return !drugsGiven.includes("I");
}


function isSubsetOf<T>(set: T[], subset: T[]): boolean {
    return subset.every(val => set.includes(val));
}

class StateMachine {
    rules: Rule[] = [
        {
            sources: ['F', 'H', 'D', 'T'],
            target: 'X',
            triggers: [["As", "P"]]
        }, {
            sources: ['D'],
            target: 'X',
            triggers: [isInsulinMissed]
        }, {
            sources: ['F'],
            target: 'H',
            triggers: [["As"], ["P"]]
        }, {
            sources: ['H'],
            target: 'F',
            triggers: [["I", "An"]]
        }, {
            sources: ['D'],
            target: 'D',
            triggers: [["I"]]
        }, {
            sources: ['T'],
            target: 'H',
            triggers: [["An"]]
        },
    ];

    getTargetState(source: State, givenDrugs: Drug[]): State {
        for (const rule of this.rules) {
            if (rule.sources.includes(source) && this.isDrugsMatchesTriggers(rule.triggers, givenDrugs)) {
                return rule.target;
            }
        }
        return source;
    }

    private isDrugsMatchesTriggers(triggers: Trigger[], givenDrugSet: Drug[]): boolean {
        return triggers.some(trigger => {
            if (Array.isArray(trigger)) {
                return isSubsetOf(givenDrugSet, trigger);
            } else {
                return trigger(givenDrugSet);
            }
        });
    }

}


export class Quarantine {

    drugsGiven: Drug[] = [];
    stateMachine = new StateMachine();
    patientsAfterTreatment: PatientsRegister;

    constructor(private patientsBeforeTreatment: PatientsRegister) {
        this.patientsAfterTreatment = { ...patientsBeforeTreatment };
    }

    private get emptyHospital(): PatientsRegister {
        return Object.keys(this.patientsAfterTreatment).reduce((acc, state) => ({
                ...acc,
                [state]: 0
            }),
            {} as PatientsRegister);
    }


    public setDrugs(drugs: Drug[]): void {
        this.drugsGiven = drugs;
    }

    public wait40Days(): void {
        const diff = this.calculatePatientsStates();
        this.patientsAfterTreatment = this.convertStates(diff);

    }

    calculatePatientsStates(): [State, number][] {
        return Object.entries(this.patientsBeforeTreatment)
            .map(([state, numberOfPatients]: [State, number]) => [this.stateMachine.getTargetState(state, this.drugsGiven), numberOfPatients]);
    }

    convertStates(diff: [State, number][]): PatientsRegister {
        return diff.reduce((acc, [state, numberOfPatients]: [State, number]) => ({
                ...acc,
                [state]: acc[state] + numberOfPatients //here we are sure that acc[state] exists because we initialize with emptyHospital
            }),
            this.emptyHospital)

    }

    public report(): PatientsRegister {
        return this.patientsAfterTreatment;
    }

}
