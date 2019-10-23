import { PatientsDataService } from './patients-data.service';

function testCase(states, expected, description) {
  return it(description, () => {
    expect(PatientsDataService.mapPatientsStatesToRegister(states)).toEqual(expected);
  });
}

describe('Patients data mapper', () => {
  testCase([], {}, 'should convert empty array to empty object');
  testCase(['F'], { F: 1 }, 'should aggregate one state');
  testCase(['F', 'F'], { F: 2 }, 'should aggregate two states');
  testCase(['F', 'X', 'F', 'X', 'X'], { F: 2, X: 3 }, 'should aggregate different kinds of states');
});
