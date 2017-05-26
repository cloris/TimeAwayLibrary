import {IMyTimeAwayDataProvider} from '../../dataProviders/IMyTimeAwayDataProvider';
import { TimePeriod } from "../../models/timeAwayModel";

export interface IMyTimeAwayContainerProps {
  period: TimePeriod;
  dataProvider: IMyTimeAwayDataProvider;
}
