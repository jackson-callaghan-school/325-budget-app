import React from "react";
import './Expense.css';
import abbreviate from 'number-abbreviate';

export class Expense extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.title || "",
            amount: this.props.amount || 0
        };
    }

    getName() {
        return this.state.expenseName;
    }

    setName(name) {
        this.setState({name: name});
    }

    getAmount() {
        return this.state.expenseAmount;
    }

    setAmount(amount) {
        this.setState({amount: amount});
    }

    render() {
        const name = this.state.name,
          amount = this.state.amount < 9999999
            ? this.state.amount.toFixed(2)
            : abbreviate(this.state.amount, 5);
        const isSub = this.props.isSub;
        const level = (amount / this.props.parentAmount) * 100;
        // TODO pass info to progressbar
        return (
            <div className={isSub ? "" : "expenseContainer"}>
                <div className={isSub ? "sub expenseInner" : "expenseInner"}>
                    <span className="expenseName">{name}</span>
                    <span className="expenseAmount">${amount}</span>
                    <span className="progressPlaceholder"></span>
                </div>
            </div>
        )
    }
}

export default Expense;
