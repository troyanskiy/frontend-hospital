import { BeforeAfterStatistic, QuarantineService } from './quarantine.service';
import { Drug, PatientsRegister } from 'hospital-lib';

function testCase(patientsBefore: PatientsRegister,
                          patientsAfter: PatientsRegister,
                          drugs: Drug[],
                          expected: BeforeAfterStatistic,
                          description) {
  return it(description, () => {
    expect(QuarantineService.mapToBas(patientsBefore, patientsAfter, drugs)).toEqual(expected);
  });
}

describe('Patients data mapper', () => {
  testCase({}, {}, [], { drugs: [], patients: [] }, 'empty hospital, no drugs');
  testCase({}, {}, ['I'], {
    drugs: ['I'],
    patients: []
  }, 'empty hospital, one drug');
  testCase({}, {}, ['I', 'As'], {
    drugs: ['I', 'As'],
    patients: []
  }, 'empty hospital, some drugs');
  testCase({ F: 2 }, { F: 2 }, ['I', 'As'], {
    drugs: ['I', 'As'],
    patients: [{ state: 'F', before: 2, after: 2 }]
  }, 'one state, no differences');
  testCase({ F: 2 }, { X: 2 }, ['I', 'As'], {
    drugs: ['I', 'As'],
    patients: [{ state: 'F', before: 2, after: 0 }, { state: 'X', before: 0, after: 2 }]
  }, 'one state, different state after, same amount of people');
  testCase({ F: 2, T: 4 }, { X: 6 }, ['I', 'As'], {
    drugs: ['I', 'As'],
    patients: [{ state: 'F', before: 2, after: 0 }, {
      state: 'T',
      before: 4,
      after: 0
    }, { state: 'X', before: 0, after: 6 }]
  }, 'two states, only one new state after');

  it('one state in the beginning, two new states after', () => {
    const res = QuarantineService.mapToBas({ X: 6 }, { F: 2, T: 4 }, []).patients;
    const expectationOnordered = [
      { state: 'X', before: 6, after: 0 },
      { state: 'T', before: 0, after: 4 },
      { state: 'F', before: 0, after: 2 }
    ];
    expect(res).toEqual(jasmine.arrayContaining(expectationOnordered));
    expect(res.length).toEqual(expectationOnordered.length);
  });

  it('multiple states initially, after some states dissapear and some are new', () => {
    const res = QuarantineService.mapToBas({ X: 6, T: 3 }, { F: 2, T: 4 }, ['I', 'As']).patients;
    const expectationOnordered = [
      { state: 'F', before: 0, after: 2 },
      { state: 'X', before: 6, after: 0 },
      { state: 'T', before: 3, after: 4 }
    ];
    expect(res).toEqual(jasmine.arrayContaining(expectationOnordered));
    expect(res.length).toEqual(expectationOnordered.length);
  });



});
