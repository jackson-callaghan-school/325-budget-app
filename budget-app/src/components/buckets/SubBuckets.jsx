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
    this.setState({amount: parseFloat(amount)});
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
    const name = this.state.name;
    const amount = this.state.amount < 9999999
      ? this.state.amount.toFixed(2)
      : abbreviate(this.state.amount, 5);
    const subExpenses = (
      this.state.subExpenses.map((subExpense, index) => {
        return <Expense key={index} title={subExpense.name} amount={subExpense.amount} color={subExpense.color} isSub={true} parentAmount={this.state.amount}/>
      })
    );
    const totalCostsList = this.state.subExpenses.map(
      (cost) => ({ name: cost.name, value: (cost.amount / this.state.amount) * 100, color: cost.color })
    );
    const unassignedFunds = (1 - this.getChildSum()) / amount * 100; // use for first progressbar
    return (
      <div className="subBucketContainer surface">
        <div className="subSummary" style={{borderColor: this.state.color || '#22a6b3'}}>
          <div className="titleContainer">
            {this.state.nameEdit && <input name="nameEdit" className="subBucketTitle" placeholder={name} onChange={(e) => this.setName(e.target.value)} />}
          {this.state.nameEdit && <span onClick={this.toggleNameEdit}>✓</span>}
          {!this.state.nameEdit && <span className="subBucketTitle" onClick={this.toggleNameEdit}>{name}</span>}
            {/* <span className="title subBucketTitle">{name}</span> */}
            {this.state.amountEdit && <input name="amountEdit" type="number" className="SubBucketAmount" placeholder={"$" + amount} onChange={(e) => this.setAmount(e.target.value)} />}
          {this.state.amountEdit && <span onClick={this.toggleAmountEdit}>✓</span>}
          {!this.state.amountEdit && <span className="SubBucketAmount" onClick={this.toggleAmountEdit}>${amount}</span>}
            {/* <span className="title subBucketAmount">${amount}</span> */}
          </div>
          <div className="progressContainer">
            {/* <div className="label net balance">Balance</div> */}
            <SegmentedProgressBar border={this.state.color} title='Balance' data={totalCostsList}/>
          </div>
        </div>
        <div className="subExpenseContainer">
          {/* <Expense title="inner1" amount={20} isSub={true}/>
          <Expense title="inner2" amount={20} isSub={true}/> */}
          {subExpenses}
        </div>
      </div>
    )
  }
}

export default SubBucket;
