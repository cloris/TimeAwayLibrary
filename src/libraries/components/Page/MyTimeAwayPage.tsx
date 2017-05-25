import * as React from 'react';
import { CommandButton, Label, css } from 'office-ui-fabric-react';
import styles from './MyTimeAwayPage.module.scss';
import {IMyTimeAwayPageProps} from './IMyTimeAwayPageProps';
import IMyTimeAwayPageState from './IMyTimeAwayPageState';
import MyTimeAwayTab from '../Tab/MyTimeAwayTab';
import DeleteDialog from '../DeleteDialog/MyTimeAwayDeleteDailog';
import TimeAwayCreateDialog from "../CreateDialog/TimeAwayCreateDialog";
import { IMyTimeAwayItem, TimeAwayDialogType, TimePeriod } from "../../models/timeAwayModel";

export class MyTimeAwayPage extends React.Component<IMyTimeAwayPageProps, IMyTimeAwayPageState>{
  private _selectMyTimeAwayItem: IMyTimeAwayItem;

  constructor(props: IMyTimeAwayPageProps) {
    super(props);
    this.state = { showDialogType: TimeAwayDialogType.Hidden, period: this.props.period, items: [] };
  }

  //web part 5days change
  public componentWillReceiveProps(props: IMyTimeAwayPageProps) {
    this.props.dataProvider.getMyTimeAwayItems().then(
      (items: IMyTimeAwayItem[]) => {
        this.setState({ items: items });
      });
  }

  public componentDidMount() {
    this.props.dataProvider.getMyTimeAwayItems().then(
      (items: IMyTimeAwayItem[]) => {
        this.setState({ items: items });
      });
  }

  public render() {
    const classBoldWeightFont: string = css(
      'ms-fontSize-l',
      'ms-fontWeight-semibold'
    );
    return (
      <div className={styles.page}>
        <MyTimeAwayTab
          period={this.state.period}
          items={this.state.items}
          tabOperationClickCallback={this._tabOperationClickCallback.bind(this)}
          itemDeleteIconClickCallback={this._itemDeleteIconClickCallback.bind(this)}
          itemEditIconClickCallback={this._itemEditIconClickCallback.bind(this)}
        />
        <CommandButton
          data-automation-id='AddMyTimeAway'
          iconProps={{ iconName: 'Add' }}
          text={'Add New Time Away'}
          onClick={this._addNewMyTimeAwayItemClick.bind(this)} />
        <DeleteDialog showDialog={this.state.showDialogType == TimeAwayDialogType.ConfirmDelete}
          itemDeleteConfirmOperationCallback={this._itemDeleteConfirmOperationCallback.bind(this)} />
        <TimeAwayCreateDialog item={this._selectMyTimeAwayItem}
          isOpen={this.state.showDialogType == TimeAwayDialogType.Create}
          itemSaveOperationCallback={this._itemSaveOperationCallback.bind(this)}
          itemValidOperationCallback={this._itemValidOperationCallback.bind(this)} />
      </div>
    );
  }

  //click edit icon call back to show edit dialog 
  private _itemEditIconClickCallback(item: IMyTimeAwayItem) {
    this._selectMyTimeAwayItem = item;
    this.setState({ showDialogType: TimeAwayDialogType.Create });
  }

  //click delete icon call back to show confirm dialog 
  private _itemDeleteIconClickCallback(item: IMyTimeAwayItem): void {
    this._selectMyTimeAwayItem = item;
    this.setState({ showDialogType: TimeAwayDialogType.ConfirmDelete });
  }

  //click add a new item button to show create dialog
  private _addNewMyTimeAwayItemClick(event: React.MouseEvent<HTMLButtonElement>) {
    this._selectMyTimeAwayItem = null;
    this.setState({ showDialogType: TimeAwayDialogType.Create });
    event.preventDefault();
  }

  //edite or create item callback from dialog to update provider item
  private _itemSaveOperationCallback(item: IMyTimeAwayItem): Promise<any> {
    if (item.id != null && item.id > 0) {
      return this.props.dataProvider.updateMyTimeAwayItem(item).then(
        (items: IMyTimeAwayItem[]) => {
          this.setState({ items: items, showDialogType: TimeAwayDialogType.Hidden });
          return;
        });
    }
    else {
      return this.props.dataProvider.createMyTimeAwayItem(item).then(
        (items: IMyTimeAwayItem[]) => {
          this.setState({ items: items, showDialogType: TimeAwayDialogType.Hidden });
          return;
        });
    }

  }

  //Valid item is valid or not
  private _itemValidOperationCallback(item: IMyTimeAwayItem): Promise<Boolean> {
    return this.props.dataProvider.checkTimeSlot(item)
      .then((isValid:boolean) => {
        return Promise.resolve(isValid);
      });
  }


  //click yes, delete item
  private _itemDeleteConfirmOperationCallback(event: React.MouseEvent<HTMLButtonElement>): Promise<any> {
    return this.props.dataProvider.deleteMyTimeAwayItem(this._selectMyTimeAwayItem).then(
      (items: IMyTimeAwayItem[]) => {
        this.setState({ items: items, showDialogType: TimeAwayDialogType.Hidden });
      });
  }

  // select tab call back
  private _tabOperationClickCallback(period: TimePeriod): void {
    this.props.dataProvider.period = period;
    this.props.dataProvider.getMyTimeAwayItems().then(
      (items: IMyTimeAwayItem[]) => {
        this.setState({ items: items, period: period });
      });
  }
}