import { IMyTimeAwayItem } from "../models/timeAwayModel";
import { TimePeriod } from "../models/timeAwayModel";

export interface IMyTimeAwayDataProvider {

  updateWeekType(value: boolean);

  updatePeriod(value: TimePeriod);

  getTimeAwayListItemEntityTypeFullName(): Promise<string>;

  getMyTimeAwayItems(): Promise<IMyTimeAwayItem[]>;

  createMyTimeAwayItem(title: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]>;

  updateMyTimeAwayItem(itemUpdated: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]>;

  deleteMyTimeAwayItem(itemDeleted: IMyTimeAwayItem): Promise<IMyTimeAwayItem[]>;

  checkTimeSlot(item: IMyTimeAwayItem): Promise<boolean>;
}