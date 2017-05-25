import {IMyTimeAwayDataProvider} from '../../dataProviders/IMyTimeAwayDataProvider';
import { TimePeriod } from "../../models/timeAwayModel";

export interface IMyTimeAwayPageProps {
  period: TimePeriod;
  dataProvider: IMyTimeAwayDataProvider;
}
