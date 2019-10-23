import { PatientsDataService } from './patients-data.service';

function generateTestCase(states, expected, description) {
  return it(description, () => {
    expect(PatientsDataService.mapPatientsStatesToRegister(states)).toEqual(expected);
  });
}

describe('Patients data mapper', () => {
  generateTestCase([], {}, 'should convert empty array to empty object');
  generateTestCase(['F'], { F: 1 }, 'should aggregate one state');
  generateTestCase(['F', 'F'], { F: 2 }, 'should aggregate two states');
  generateTestCase(['F', 'X', 'F', 'X', 'X'], { F: 2, X: 3 }, 'should aggregate different kinds of states');
});
