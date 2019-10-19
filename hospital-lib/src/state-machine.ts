import { isSubsetOf } from './utils';
import { Drug, Rule, State, Trigger } from './state-machine.types';

export class StateMachine {
    constructor(private rules: Rule[]) {

    }

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
