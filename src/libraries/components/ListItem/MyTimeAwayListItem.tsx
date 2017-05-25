import * as React from 'react';
import * as moment from 'moment';
import { Label, Button, ButtonType, List, FocusZone, FocusZoneDirection, css, Link } from 'office-ui-fabric-react';
import IMyTimeAwayListItemProps from './IMyTimeAwayListItemProps';
import { ApprovalStatus } from "../../models/timeAwayModel";

export default class MyTimeAwayListItem extends React.Component<IMyTimeAwayListItemProps, {}> {
  private _computedTitle: string;

  constructor(props: IMyTimeAwayListItemProps) {
    super(props);
    this.state = { showConfirmDialog: false };

    this._computedTitle = `${moment(this.props.item.start).format('dddd, M/D ha')} to ${moment(this.props.item.end).format('dddd, M/D ha')}`;
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
  }
  public render(): JSX.Element {
    const classMyAwayListItem: string = css(
      'ms-Grid',
      'ms-u-slideDownIn20'
    );

    let statusElement = null;
    if (this.props.item.status != null) {
      if (this.props.item.status == ApprovalStatus.Approved) {
        statusElement = <span className={css('ms-fontColor-green', 'ms-Label')}>  (Approved)</span>;
      }
      else if (this.props.item.status == ApprovalStatus.Rejected) {
        statusElement = <a className={css('ms-fontColor-red', 'ms-Link')} href={this.props.item.link} target='_blank'>  (Rejected)</a>;
      }
    }
    return (
      <div
        role='row'
        className={classMyAwayListItem}
        data-is-focusable={false}>
        <FocusZone direction={FocusZoneDirection.vertical}>
          <div className={css('ms-Grid-row')}>
            <Label>
              <span className={'ms-Label'}>{this._computedTitle}</span>
              {statusElement}
            </Label>
            <Button 
              buttonType={ButtonType.icon}
              icon='Edit'
              onClick={this._handleEditClick} />

            <Button 
              buttonType={ButtonType.icon}
              icon='Cancel'
              onClick={this._handleDeleteClick} />
          </div>
        </FocusZone>
      </div>
    );
  }
  private _handleEditClick(event: React.MouseEvent<HTMLButtonElement>) {
    this.props.itemEditIconClickCallback(this.props.item);
    event.preventDefault();
  }

  private _handleDeleteClick(event: React.MouseEvent<HTMLButtonElement>) {
    this.props.itemDeleteIconClickCallback(this.props.item);
    event.preventDefault();
  }
}