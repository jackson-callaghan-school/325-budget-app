import React, { useEffect } from 'react';
import { Card } from '../card/Card';
import { SegmentedProgressBar } from '../segmented-progress-bar/SegmentedProgressBar';
import './SuperBucket.css'
/**
 * Expects data in the form of:
 * data: {
 *    name: string, name of super bucket
 *    total: number, total amount of money available
 *    subBuckets: subBucket[], array of subBuckets
 *    expenses: expense[], array of expenses
 * }
 * 
 * subBucket: {
 *    name: string, name of sub bucket
 *    total: number, total amount of money available
 *    expenses: expense[], array of expenses
 *    color: string, color of sub bucket
 * }
 * 
 * expense: {
 *    name: string, name of expense
 *    total:  number, total amount of money spent on expense
 *    color: string, color of expense
 * }
 */


export const SuperBucket = ({ data, onClickAdd, children }) => {
  const totalCostsList = data.subBuckets.concat(data.expenses).map(
    (cost) => ({ name: cost.name, value: (cost.total / data.total) * 100, color: cost.color })
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
          <input name='total-available' placeholder={data.total} />
        </label>
        <SegmentedProgressBar title='Net Balance' data={totalCostsList} />
      </div>
      {data.subBuckets.map((subBucket, index) => {
        return null; // put subBucket component here
      })}
      <button className='fab pos-bottom-right' onClick={onClickAdd}>+</button>
    </Card>
  )
}