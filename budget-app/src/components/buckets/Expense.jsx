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
      color: this.props.color,
      nameEdit: false,
      amountEdit: false
    };

    this.toggleNameEdit = this.toggleNameEdit.bind(this);
    this.toggleAmountEdit = this.toggleAmountEdit.bind(this);
    this.setName = this.setName.bind(this);
    this.setAmount = this.setAmount.bind(this);
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
    this.setState({ amount: parseFloat(amount) });
  }

  toggleNameEdit() {
    this.setState({nameEdit: !this.state.nameEdit});
    if (this.state.amountEdit) {
      this.setState({amountEdit: false})
    }
  }

  toggleAmountEdit() {
    this.setState({amountEdit: !this.state.amountEdit});
    if (this.state.nameEdit) {
      this.setState({nameEdit: false})
    }
  }

  render() {
    const name = this.state.name,
      amount = this.state.amount < 9999999
        ? this.state.amount.toFixed(2)
        : abbreviate(this.state.amount, 5);
    const isSub = this.props.isSub;
    const level = (this.state.amount / this.props.parentAmount) * 100;
    return (
      <div className={isSub ? "" : "expenseContainer surface"}>
        <div className={isSub ? "sub expenseInner" : "expenseInner"}>
          {this.state.nameEdit && <input name="nameEdit" className="expenseName" placeholder={name} onChange={(e) => this.setName(e.target.value)} />}
          {this.state.nameEdit && <span onClick={this.toggleNameEdit}>✓</span>}
          {!this.state.nameEdit && <span className="expenseName" onClick={this.toggleNameEdit}>{name}</span>}
          {/* <span className="expenseAmount">${amount}</span> */}
          {this.state.amountEdit && <input name="amountEdit" type="number" className="expenseAmount" placeholder={"$" + amount} onChange={(e) => this.setAmount(e.target.value)} />}
          {this.state.amountEdit && <span onClick={this.toggleAmountEdit}>✓</span>}
          {!this.state.amountEdit && <span className="expenseAmount" onClick={this.toggleAmountEdit}>${amount}</span>}
          <SegmentedProgressBar className='progressPlaceholder' data={[{ name: this.state.name, value: level, color: this.state.color }]} />
        </div>
      </div>
    )
  }
}

export default Expense;
