import React from "react";
import './Expense.css';
import abbreviate from 'number-abbreviate';
import { SegmentedProgressBar } from "../segmented-progress-bar/SegmentedProgressBar";

export class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.title || "",
      amount: this.props.amount || 0,
      color: this.props.color
    };
  }

  getName() {
    return this.state.expenseName;
  }

  setName(name) {
    this.setState({ name: name });
  }

  getAmount() {
    return this.state.expenseAmount;
  }

  setAmount(amount) {
    this.setState({ amount: amount });
  }

  render() {
    const name = this.state.name,
      amount = this.state.amount < 9999999
        ? this.state.amount.toFixed(2)
        : abbreviate(this.state.amount, 5);
    const isSub = this.props.isSub;
    const level = (this.state.amount / this.props.parentAmount) * 100;
    // console.log(this.state.amount/this.props.parentAmount * 100);
    console.log(level);
    // TODO pass info to progressbar
    return (
      <div className={isSub ? "" : "expenseContainer" + " surface"}>
        <div className={isSub ? "sub expenseInner" : "expenseInner"}>
          <span className="expenseName">{name}</span>
          <span className="expenseAmount">${amount}</span>
          <SegmentedProgressBar className='progressPlaceholder' data={[{ name: this.state.name, value: level, color: this.state.color }]} />
        </div>
      </div>
    )
  }
}

export default Expense;
