import { PatientsRegister } from './patientsRegister';
import { StateMachine } from './state-machine';
import { Drug, Rule, State } from './state-machine.types';


function isInsulinMissed(drugsGiven: Drug[]): boolean {
    return !drugsGiven.includes('I');
}

type PatientStatePair = [State, number];

export const defaultRules: Rule[] = [
    {
        sources: ['F', 'H', 'D', 'T'],
        target: 'X',
        triggers: [['As', 'P']]
    }, {
        sources: ['D'],
        target: 'X',
        triggers: [isInsulinMissed]
    }, {
        sources: ['F'],
        target: 'H',
        triggers: [['As'], ['P']]
    }, {
        sources: ['H'],
        target: 'F',
        triggers: [['I', 'An']]
    }, {
        sources: ['D'],
        target: 'D',
        triggers: [['I']]
    }, {
        sources: ['T'],
        target: 'H',
        triggers: [['An']]
    },
];

export class Quarantine {

    stateMachine = new StateMachine(defaultRules);
    private drugsGiven: Drug[] = [];
    private patientsAfterTreatment: PatientsRegister;

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
        const patientsStates = this.calculatePatientsStates();
        this.patientsAfterTreatment = this.convertStates(patientsStates);

    }

    public report(): PatientsRegister {
        return this.patientsAfterTreatment;
    }

    private calculatePatientsStates(): PatientStatePair[] {
        return Object.entries(this.patientsBeforeTreatment)
            .map(([state, numberOfPatients]: PatientStatePair) => [this.stateMachine.getTargetState(state, this.drugsGiven), numberOfPatients]);
    }

    private convertStates(diff: PatientStatePair[]): PatientsRegister {
        return diff.reduce((acc, [state, numberOfPatients]: PatientStatePair) => ({
                ...acc,
                [state]: acc[state] ? acc[state] + numberOfPatients : numberOfPatients
            }),
            this.emptyHospital)

    }

}
