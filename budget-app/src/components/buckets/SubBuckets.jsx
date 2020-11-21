import React from "react";
import './SubBuckets.css';
import './Expense.css';
import Expense from './Expense';
import abbreviate from 'number-abbreviate';
import { SegmentedProgressBar } from "../segmented-progress-bar/SegmentedProgressBar";

export class SubBucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.title || "",
      amount: this.props.amount || 0,
      subExpenses: this.props.subExpenses,
      color: this.props.color,
      nameEdit: false,
      amountEdit: false
    };

    this.toggleNameEdit = this.toggleNameEdit.bind(this);
    this.toggleAmountEdit = this.toggleAmountEdit.bind(this);
    this.setName = this.setName.bind(this);
    this.setAmount = this.setAmount.bind(this);
  }

  getChildSum() {
    return this.props.subExpenses.length > 0
      ? this.props.subExpenses.reduce((a, c) => {
        return {amount: a.amount + c.amount};
      }).amount
      : 0;
  }

  getName() {
    return this.props.name;
  }

  setName(name) {
    this.setState({ name: name });
  }

  getAmount() {
    return this.props.amount;
  }

  setAmount(amount) {
    this.setState({ amount: parseFloat(amount) });
  }

  getSubExpenses() {
    return this.props.subExpenses;
  }

  getSubExpense(name) {
    const result = this.props.subExpenses.filter(expense => expense.name === name);
    return result.length > 0 ? result[0] : false;
  }

  addSubExpense(name, amount) {
    const updatedArray = this.props.subExpenses.concat({ name, amount });
    this.setState({ subExpenses: updatedArray });
  }

  updateSubExpense(name, newValue, updateName = false) {
    const updatedExpense = this.getSubExpense(name);
    if (!updatedExpense) {
      return false; // expense not found
    }
    updateName
      ? (updatedExpense.name = newValue)
      : (updatedExpense.amount = newValue);

    const updatedArray = this.props.subExpenses.filter(expense => expense.name !== name);
    updatedArray.push(updatedExpense);

    this.setState({ subExpenses: updatedArray });

    return true;
  }

  removeSubExpense(name) {
    const updatedArray = this.props.subExpenses.filter(expense => expense.name !== name);
    this.setState({ subExpenses: updatedArray });
  }

  clearSubExpense() {
    this.setState({ subExpenses: [] });
  }

  toggleNameEdit() {
    this.setState({ nameEdit: !this.state.nameEdit });
    if (this.state.amountEdit) {
      this.setState({ amountEdit: false })
    }
  }

  toggleAmountEdit() {
    this.setState({ amountEdit: !this.state.amountEdit });
    if (this.state.nameEdit) {
      this.setState({ nameEdit: false })
    }
  }

  render() {
    const name = this.state.name;
    // const amount = this.state.amount < 9999999
    //   ? this.state.amount.toFixed(2)
    //   : abbreviate(this.state.amount, 5);
    const subExpenses = (
      this.props.subExpenses.map((subExpense, index) => {
        return <Expense key={index} title={subExpense.name} amount={subExpense.amount} color={subExpense.color} isSub={true} parentAmount={this.state.amount} />
      })
    );
    const totalCostsList = this.props.subExpenses.map(
      (cost) => ({ name: cost.name, value: (cost.amount / this.props.amount) * 100, color: cost.color })
    );
    const unassignedFunds = this.props.amount - this.getChildSum(); // use for first progressbar
    return (
      <div className="subBucketContainer surface">
        <div className="subSummary" style={{ borderBottom: this.props.subExpenses.length > 0 ? 'solid 1px #ddd' : 'none' }}>
          <div className="titleContainer">
            {this.state.nameEdit && <input name="nameEdit" className="subBucketTitle" placeholder={name} onChange={(e) => this.setName(e.target.value)} />}
            {this.state.nameEdit && <span onClick={this.toggleNameEdit}>✓</span>}
            {!this.state.nameEdit && <span className="subBucketTitle" onClick={this.toggleNameEdit}>
              {name}
              <div style={{
                width: 14, height: 14,
                backgroundColor: this.props.color,
                borderRadius: '50%',
                marginLeft: 5,
              }}
              />
            </span>}
            {/* <span className="title subBucketTitle">{name}</span> */}
            {this.state.amountEdit && <input name="amountEdit" type="number" className="SubBucketAmount" placeholder={"$" + this.props.amount.toFixed(2)} onChange={(e) => this.setAmount(e.target.value)} />}
            {this.state.amountEdit && <span onClick={this.toggleAmountEdit}>✓</span>}
            {!this.state.amountEdit && <span className="SubBucketAmount" onClick={this.toggleAmountEdit}>${this.props.amount.toFixed(2)}</span>}
            {/* <span className="title subBucketAmount">${amount}</span> */}
          </div>
          <div className="progressContainer">
            <SegmentedProgressBar title={`Balance – $${unassignedFunds.toFixed(2)} Remaining`} data={totalCostsList} />
          </div>
        </div>
        <div className="subExpenseContainer">
          {subExpenses}
        </div>
        <div className="addExpenseContainer" onClick={() => {this.props.addSubBucketExpense(this.props.index)}}>+</div>
      </div>
    )
  }
}

export default SubBucket;
