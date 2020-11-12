import React from "react";
import './SubBuckets.css';
import './Expense.css';
import Expense from './Expense';
import abbreviate from 'number-abbreviate';

export class SubBucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.title || "",
      amount: this.props.amount || 0,
      subExpenses: []
    };
  }

  getChildSum() {
    return this.state.subExpenses.length > 0
      ? this.state.subExpenses.reduce((a, c) => {
          return a + c.amount;
        })
      : 0;
  }

  getName() {
    return this.state.name;
  }

  setName(name) {
    this.setState({name: name});
  }

  getAmount() {
    return this.state.amount;
  }

  setAmount(amount) {
    this.setState({amount: amount});
  }

  getSubExpenses() {
    return this.state.subExpenses;
  }

  getSubExpense(name) {
    const result = this.state.subExpenses.filter(expense =>  expense.name === name );
    return result.length > 0 ? result[0] : false;
  }

  addSubExpense(name, amount) {
    const updatedArray = this.state.subExpenses.concat({name, amount});
    this.setState({subExpenses: updatedArray});
  }

  updateSubExpense(name, newValue, updateName = false) {
    const updatedExpense = this.getSubExpense(name);
    if (!updatedExpense) {
      return false; // expense not found
    }
    updateName
      ? (updatedExpense.name = newValue)
      : (updatedExpense.amount = newValue);

    const updatedArray = this.state.subExpenses.filter(expense => expense.name !== name);
    updatedArray.push(updatedExpense);

    this.setState({subExpenses: updatedArray});

    return true;
  }

  removeSubExpense(name) {
    const updatedArray = this.state.subExpenses.filter(expense => expense.name !== name);
    this.setState({subExpenses: updatedArray});
  }

  clearSubExpense() {
    this.setState({subExpenses: []});
  }

  render() {
    const name = this.state.name;
    const amount = this.state.amount < 9999999
      ? this.state.amount.toFixed(2)
      : abbreviate(this.state.amount, 5);
    const subExpenses = (
      this.state.subExpenses.map((subExpense, index) => {
        return <Expense key={index} title={subExpense.name} amount={subExpense.amount} isSub={true} parentAmount={amount}/>
      })
    );
    const unassignedFunds = (1 - this.getChildSum()) / amount * 100; // use for first progressbar
    // TODO pass info to first progressbar
    // TODO pass required information to multicolor progressbar
    return (
      <div className="subBucketContainer">
        <div className="subSummary">
          <div className="titleContainer">
            <span className="title subBucketTitle">{name}</span>
            <span className="title subBucketAmount">${amount}</span>
          </div>
          <div className="progressContainer">
            <div className="label unassigned">Unassigned Money</div>
            <div className="summaryProgressPlaceholder"></div>
          </div>
          <div className="progressContainer">
            <div className="label net balance">Balance</div>
            <div className="summaryProgressPlaceholder"></div>
          </div>
        </div>
        <div className="subExpenseContainer">
          <Expense title="inner1" amount={20} isSub={true}/>
          <Expense title="inner2" amount={20} isSub={true}/>
          {subExpenses}
        </div>
      </div>
    )
  }
}

export default SubBucket;
