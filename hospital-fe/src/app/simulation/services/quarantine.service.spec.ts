import { Simulation, QuarantineService, StateDiff } from './quarantine.service';
import { Drug, PatientsRegister } from 'hospital-lib';

function testCase(patientsBefore: PatientsRegister,
                          patientsAfter: PatientsRegister,
                          drugs: Drug[],
                          expected: Simulation,
                          description) {
  return it(description, () => {
    expect(QuarantineService.mapToBas(patientsBefore, patientsAfter, drugs)).toEqual(expected);
  });
}

describe('Patients data mapper', () => {
  testCase({}, {}, [], { drugs: [], patientsStatesDiffs: [] }, 'empty hospital, no drugs');
  testCase({}, {}, ['I'], {
    drugs: ['I'],
    patientsStatesDiffs: []
  }, 'empty hospital, one drug');
  testCase({}, {}, ['I', 'As'], {
    drugs: ['I', 'As'],
    patientsStatesDiffs: []
  }, 'empty hospital, some drugs');
  testCase({ F: 2 }, { F: 2 }, ['I', 'As'], {
    drugs: ['I', 'As'],
    patientsStatesDiffs: [{ state: 'F', numberOfPatientsBefore: 2, numberOfPatientsAfter: 2 }]
  }, 'one state, no differences');
  testCase({ F: 2 }, { X: 2 }, ['I', 'As'], {
    drugs: ['I', 'As'],
    patientsStatesDiffs: [{ state: 'F', numberOfPatientsBefore: 2, numberOfPatientsAfter: 0 }, { state: 'X', numberOfPatientsBefore: 0, numberOfPatientsAfter: 2 }]
  }, 'one state, different state after, same amount of people');
  testCase({ F: 2, T: 4 }, { X: 6 }, ['I', 'As'], {
    drugs: ['I', 'As'],
    patientsStatesDiffs: [{ state: 'F', numberOfPatientsBefore: 2, numberOfPatientsAfter: 0 }, {
      state: 'T',
      numberOfPatientsBefore: 4,
      numberOfPatientsAfter: 0
    }, { state: 'X', numberOfPatientsBefore: 0, numberOfPatientsAfter: 6 }]
  }, 'two states, only one new state after');

  it('one state in the beginning, two new states after', () => {
    const res = QuarantineService.mapToBas({ X: 6 }, { F: 2, T: 4 }, []).patientsStatesDiffs;
    const expectationOnordered: StateDiff[] = [
      { state: 'X', numberOfPatientsBefore: 6, numberOfPatientsAfter: 0 },
      { state: 'T', numberOfPatientsBefore: 0, numberOfPatientsAfter: 4 },
      { state: 'F', numberOfPatientsBefore: 0, numberOfPatientsAfter: 2 }
    ];
    expect(res).toEqual(jasmine.arrayContaining(expectationOnordered));
    expect(res.length).toEqual(expectationOnordered.length);
  });

  it('multiple states initially, after some states dissapear and some are new', () => {
    const res = QuarantineService.mapToBas({ X: 6, T: 3 }, { F: 2, T: 4 }, ['I', 'As']).patientsStatesDiffs;
    const expectationOnordered: StateDiff[] = [
      { state: 'F', numberOfPatientsBefore: 0, numberOfPatientsAfter: 2 },
      { state: 'X', numberOfPatientsBefore: 6, numberOfPatientsAfter: 0 },
      { state: 'T', numberOfPatientsBefore: 3, numberOfPatientsAfter: 4 }
    ];
    expect(res).toEqual(jasmine.arrayContaining(expectationOnordered));
    expect(res.length).toEqual(expectationOnordered.length);
  });



});
