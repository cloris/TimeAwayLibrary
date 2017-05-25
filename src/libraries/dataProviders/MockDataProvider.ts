import { IWebPartContext } from '@microsoft/sp-webpart-base';
import * as lodash from '@microsoft/sp-lodash-subset';
import {IMyTimeAwayDataProvider} from '../dataProviders/IMyTimeAwayDataProvider';
import { IMyTimeAwayItem } from "../models/timeAwayModel";
import { TimePeriod, ApprovalStatus } from "../models/timeAwayModel";

export class MockDataProvider implements IMyTimeAwayDataProvider {

  private _idCounter: number;
  private _items: IMyTimeAwayItem[];
  private _webPartContext: IWebPartContext;
  private _mormalWeekToggle: boolean;
  private _period: TimePeriod;

  constructor(value: IWebPartContext, listName: string, mormalWeekToggle: boolean, period: TimePeriod) {
    this.mormalWeekToggle = mormalWeekToggle;
    this._period = period;
    this._idCounter = 0;

    let currentDate = new Date();
    this._items = [
      this._createMockMyTimeAwayItem({id : 1, firstName: 'Cloris', lastName: 'sun', start: this._addDays(currentDate, -1), end: this._addDays(currentDate, 1), comments: 'Mock My Time Away Item 1', status: ApprovalStatus.Approved }),
      this._createMockMyTimeAwayItem({id : 2, firstName: 'Cloris', lastName: 'sun', start: this._addDays(currentDate, 7), end: this._addDays(currentDate, 9), comments: 'Mock My Time Away Item 2', status: ApprovalStatus.Rejected }),
      this._createMockMyTimeAwayItem({id : 3,  firstName: 'Albert', lastName: 'xie', start: this._addDays(currentDate, 3), end: this._addDays(currentDate, 4), comments: 'Mock My Time Away Item 3', status: ApprovalStatus.Rejected }),
      this._createMockMyTimeAwayItem({id : 4, firstName: 'Albert', lastName: 'xie', start: this._addDays(currentDate, 7), end: this._addDays(currentDate, 9), comments: 'Mock My Time Away Item 2', status: ApprovalStatus.Rejected }),
    ];
  }

  public set mormalWeekToggle(value: boolean) {
    this._mormalWeekToggle = value;
  }

  public get mormalWeekToggle(): boolean {
    return this._mormalWeekToggle;
  }
  public set period(value: TimePeriod) {
    this._period = value;
  }
  public getTimeAwayListItemEntityTypeFullName(): Promise<string> {
    return new Promise<string>((resolve) => {
      setTimeout(() => resolve("Mock Time Away List"), 500);
    });
  }


  public getMyTimeAwayItems(): Promise<IMyTimeAwayItem[]> {
    const items: IMyTimeAwayItem[] = lodash.clone(this._items);

    return new Promise<IMyTimeAwayItem[]>((resolve) => {
      setTimeout(() => resolve(items), 500);
    });
  }

  public createMyTimeAwayItem(item: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    const newItem = this._createMockMyTimeAwayItem(item);
    this._items = this._items.concat(newItem);
    return this.getMyTimeAwayItems();
  }

  public updateMyTimeAwayItem(itemUpdated: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    const index: number =
      lodash.findIndex(
        this._items,
        (item: IMyTimeAwayItem) => item.id === itemUpdated.id
      );

    if (index !== -1) {
      this._items[index] = itemUpdated;
      return this.getMyTimeAwayItems();
    }
    else {
      return Promise.reject(new Error(`Item to update doesn't exist.`));
    }
  }

  public deleteMyTimeAwayItem(itemDeleted: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]> {
    this._items = this._items.filter((item: IMyTimeAwayItem) => item.id !== itemDeleted.id);

    return this.getMyTimeAwayItems();
  }

  private _createMockMyTimeAwayItem(item: IMyTimeAwayItem): IMyTimeAwayItem {
    const mockMyTimeAwayItem: IMyTimeAwayItem = {
      id: this._idCounter++,
      start: item.start,
      end: item.end,
      comments: item.comments,
      status: item.status
    };
    return mockMyTimeAwayItem;
  }

  private _addDays(date: Date, days: number) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

   public checkTimeSlot(item: IMyTimeAwayItem): Promise<boolean>{
     return Promise.resolve(true);
   }
}
