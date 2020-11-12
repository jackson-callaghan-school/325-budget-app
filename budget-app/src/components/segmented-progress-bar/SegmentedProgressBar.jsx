import React from 'react';
import './SegmentedProgressBar.css';

/**
 * Expects a data array passed to with each object following:
 * item : {
 *    name: string, name of the item
 *    value: number, percentage of the bucket/bar it take up
 *    color?: string, hex code for the color of this object (defaults to #22a6b3)
 * }
 * 
 */

/**
 * Segmented progress bar component
 */
export const SegmentedProgressBar = ({ data, title, className, border }) => {
  const bars = data && data.length && data.map((item, i) => {
    // wont display is value is less than 0 (can be changed)
    if (item.value > 0) {
      return (
        <div className='bar' key={i} style={{ backgroundColor: item.color || '#22a6b3', width: item.value + '%' }} />
      )
    }
  })


  return (
    <div className={'segmented-progress-bar ' + className}>
      {title && <div className="title">{title}</div>}
      <div className='bars '  style={{border: border ? '2px solid ' + border : 'none'}}>
        {bars === '' ? '' : bars}
      </div>
    </div>
  )
}