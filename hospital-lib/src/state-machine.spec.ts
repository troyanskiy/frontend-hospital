import { Expect, Setup, Test, TestCase, TestFixture } from 'alsatian';
import { StateMachine } from './state-machine';
import { defaultRules } from './quarantine';
import { Drug, State } from './state-machine.types';

const emptyStateMachine = new StateMachine([]);
;
const oneArrayRuleStateMachine = new StateMachine([{
    sources: ['D'],
    triggers: [['I']],
    target: 'H'
}]);
const onePredicateStateMachine = new StateMachine([{
    sources: ['F'],
    target: 'H',
    triggers: [(drugs: Drug[]) => !!drugs.length]
}]);
const standardStateMachine = new StateMachine(defaultRules);

@TestFixture()
export class QuarantineTest {


    @Setup
    public setup() {

    }

    @TestCase(emptyStateMachine, 'D', [], 'D')
    @TestCase(emptyStateMachine, 'D', ['An', 'As'], 'D')
    @TestCase(oneArrayRuleStateMachine, 'D', [], 'D')
    @TestCase(oneArrayRuleStateMachine, 'D', ['An'], 'D')
    @TestCase(oneArrayRuleStateMachine, 'D', ['I'], 'H')
    @TestCase(standardStateMachine, 'D', [], 'X')
    @TestCase(standardStateMachine, 'D', ['An'], 'X')
    @TestCase(standardStateMachine, 'D', ['I'], 'D')
    @TestCase(standardStateMachine, 'D', ['I', 'An', 'P'], 'D')
    @TestCase(standardStateMachine, 'D', ['I', 'An', 'P'], 'D')
    @TestCase(standardStateMachine, 'D', ['I', 'An', 'P'], 'D')
    @TestCase(standardStateMachine, 'D', ['An', 'As'], 'X')
    @TestCase(standardStateMachine, 'D', ['As', 'I', 'P'], 'X')
    @TestCase(standardStateMachine, 'H', ['As', 'I', 'An', 'P'], 'X')
    @TestCase(onePredicateStateMachine, 'F', [], 'F')
    @TestCase(onePredicateStateMachine, 'F', ['As'], 'H')
    @Test()
    public isProperStateTransition(stateMachine: StateMachine, fromState: State, drugsGiven: Drug[], expectedResult: State): void {
        Expect(stateMachine.getTargetState(fromState, drugsGiven)).toEqual(expectedResult);
    }


}
