import { HistoryService } from './history.service';
import { TestBed } from '@angular/core/testing';
import { cold } from 'jasmine-marbles';

describe('HistoryService', () => {
  let historyService: HistoryService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HistoryService]
    });
    historyService = TestBed.get(HistoryService);
  });
  it('should create HistoryService ', () => {
    expect(historyService).toBeTruthy();
  });

  it('should make history out of one item', () => {
    const dataSource$ = cold('x-', { x: 'item1' });
    const result$ = historyService.getHistory(dataSource$, );
    const expected$ = cold('x-', { x: ['item1'] });
    expect(result$).toBeObservable(expected$);
  });

  it('should make history out of three items', () => {
    const dataSource$ = cold('x-y-z', {
      x: 'item1',
      y: 'item2',
      z: 'item3'
    });
    const result$ = historyService.getHistory(dataSource$, );
    const expected$ = cold('x-y-z', {
      x: ['item1'],
      y: ['item2', 'item1'],
      z: ['item3', 'item2', 'item1']
    });
    expect(result$).toBeObservable(expected$);
  });
});


