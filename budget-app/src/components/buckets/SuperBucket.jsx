import React, { useEffect, useState } from 'react';
import { Card } from '../card/Card';
// import Drawer from '../drawer/Drawer';
import { SegmentedProgressBar } from '../segmented-progress-bar/SegmentedProgressBar';
import Expense from './Expense';
import SubBucket from './SubBuckets';
import './SuperBucket.css'
/**
 * Expects data in the form of:
 * data: {
 *    name: string, name of super bucket
 *    amount: number, total amount of money available
 *    subBuckets: subBucket[], array of subBuckets
 *    subExpenses: expense[], array of expenses
 * }
 * 
 * subBucket: {
 *    name: string, name of sub bucket
 *    amount: number, total amount of money available
 *    subExpenses: expense[], array of expenses
 *    color: string, color of sub bucket
 * }
 * 
 * expense: {
 *    name: string, name of expense
 *    total:  number, total amount of money spent on expense
 *    color: string, color of expense
 * }total
 */


export const SuperBucket = ({ data, onClickAdd }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const totalCostsList = data.subBuckets.concat(data.subExpenses).map(
    (cost) => ({ name: cost.name, value: (cost.amount / data.amount) * 100, color: cost.color })
  );
  // called everytime data changes
  useEffect(() => {

  }, [data])

  return (
    <Card title={data.name}>
      <div className='super-bucket-overview surface'>
        <div className='super-bucket-title'>Overview</div>
        <label>
          Total Available
          <input name='total-available' placeholder={data.amount} />
        </label>
        <SegmentedProgressBar title='Net Balance' data={totalCostsList} />
      </div>
      {data.subBuckets.map((subBucket, index) => {
        return <SubBucket
          key={index}
          title={subBucket.name}
          amount={subBucket.amount}
          color={subBucket.color}
          subExpenses={subBucket.subExpenses}
        />;
      })}
      {data.subExpenses.map((subExpense, index) => {
        return <Expense
          key={index}
          title={subExpense.name}
          amount={subExpense.amount}
          color={subExpense.color}
          parentAmount={data.amount}
        />
      })}
      <button className='fab pos-bottom-right' onClick={onClickAdd}>+</button>
    </Card>
  )
}