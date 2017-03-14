import React, { Component, PropTypes } from 'react';
import { TextField } from 'material-ui';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn,
  TableFooter
} from 'material-ui/Table';

const defaultStyle = {
  margin: '0 20px'
};

class MainSection extends Component {

  handleEditItemCount = (evt) => {
    this.props.actions.editItemCount(evt.target.id, evt.target.value);
  }

  handleNormalizeItemCount = (evt) => {
    this.props.actions.normalizeItemCount(evt.target.id, evt.target.value);
  }

  render() {
    const { items, actions } = this.props;

    const itemDiscount = item => item.everyNthFree === 0 ?
      0 : Math.floor(item.count / item.everyNthFree) * item.price;
    const formatMoney = cents => (cents / 100) + ' €';
    const formatDiscount = discount => discount === 0 ? 'None' : formatMoney(discount);

    const procItems = items.map((item) => {
        const discount = itemDiscount(item);
        return {
          ...item,
          discount,
          totalPrice: (item.price * item.count) - discount
        }
    });

    return (
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn>Item</TableHeaderColumn>
            <TableHeaderColumn>Price per item</TableHeaderColumn>
            <TableHeaderColumn>Count</TableHeaderColumn>
            <TableHeaderColumn>Discount</TableHeaderColumn>
            <TableHeaderColumn>Price</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          {
            procItems.map((item) => {
              const discount = itemDiscount(item);
              const priceForItems = (item.price * item.count) - discount;
              return (
                <TableRow key={item.id}>
                  <TableRowColumn>{item.name}</TableRowColumn>
                  <TableRowColumn>{formatMoney(item.price)}</TableRowColumn>
                  <TableRowColumn>
                    <TextField id={item.id.toString()} type="number" value={item.count}
                      onChange={this.handleEditItemCount}
                      onBlur={this.handleNormalizeItemCount}
                      errorText={item.count > -1 ? "" : "This field is required"}
                    />
                  </TableRowColumn>
                  <TableRowColumn>{formatDiscount(item.discount)}</TableRowColumn>
                  <TableRowColumn>{formatMoney(item.totalPrice)}</TableRowColumn>
                </TableRow>
              )
            })
          }
        </TableBody>
        <TableFooter adjustForCheckbox={false}>
          <TableRow>
            <TableRowColumn colSpan="5" style={{textAlign: "center"}}>
              Summarization
            </TableRowColumn>
          </TableRow>
          <TableRow style={{fontWeight: 800}}>
            <TableRowColumn colSpan="4" style={{textAlign: "right"}}>Total price</TableRowColumn>
            <TableRowColumn>{formatMoney(
                procItems.reduce((sum, item) => sum + item.totalPrice, 0)
            )}</TableRowColumn>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }
}

MainSection.propTypes = {
  items: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default MainSection;
