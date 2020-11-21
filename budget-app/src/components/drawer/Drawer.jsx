import React, { useEffect, useState } from 'react';
import { CirclePicker } from 'react-color';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import 'react-tabs/style/react-tabs.css';
import './Drawer.css';

const Drawer = ({ visible, onClose, onSubmit, expenseOnly }) => {
  const [currTab, setCurrTab] = useState(0);
  const [bucketName, setBucketName] = useState('');
  const [bucketAmount, setBucketAmount] = useState(0);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [color, setColor] = useState('#22a6b3');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  useEffect(() => {
    setBucketName('');
    setBucketAmount(0);
    setExpenseName('');
    setExpenseAmount(0);
    setColorPickerVisible(false);
  }, [visible])

  if (!visible) return null;
  return (
    <div id="drawerContainer" className="drawerContainer">
      <Tabs onSelect={(index) => { setCurrTab(index) }}>
        <TabList className="tabPosition">
          {!expenseOnly && <Tab variant="width">New Bucket</Tab>}
          <Tab variant="width">New Expense</Tab>
        </TabList>

        {!expenseOnly && <TabPanel className='bucketGrid'>
          <span className="formSize">
            <form>
              <label className="bucketDrawerLabel name">
                Bucket Name:
                <input type="text" name="name" placeholder="Name" className="bucketDrawerInput" value={bucketName} onChange={(e) => { setBucketName(e.currentTarget.value) }} />
              </label>
              <label className="bucketDrawerLabel allowance">
                Bucket Allowance:
                <input type="text" name="allowance" placeholder="$1000.00" className="bucketDrawerInput" value={bucketAmount} onChange={(e) => { setBucketAmount(e.currentTarget.value) }} />
              </label>
            </form>
          </span>
          <span className='colorGroup'>
            <button id="circle" className="circle" style={{ backgroundColor: color, borderColor: color }} onClick={() => { setColorPickerVisible(!colorPickerVisible) }}></button>
          </span>
        </TabPanel>}
        <TabPanel className='bucketGrid'>
          <span className="formSize">
            <form>
              <label className="bucketDrawerLabel">
                Expense Name:
                <input type="text" name="name" placeholder="Name" className="bucketDrawerInput" value={expenseName} onChange={(e) => { setExpenseName(e.currentTarget.value) }} />
              </label>
              <label className="bucketDrawerLabel">
                Expense Cost:
                <input type="text" name="allowance" placeholder="$1000.00" className="bucketDrawerInput" value={expenseAmount} onChange={(e) => { setExpenseAmount(e.currentTarget.value) }} />
              </label>
            </form>
          </span>
          <span className='colorGroup'>
            <button id="circle" className="circle" style={{ backgroundColor: color, borderColor: color }} onClick={() => { setColorPickerVisible(!colorPickerVisible) }}></button>
          </span>
        </TabPanel>
      </Tabs>

      <div className="xBox">
        <CloseIcon onClick={() => {
          onClose();
          setColorPickerVisible(false);
        }}
          style={{ fontSize: 40 }}
        />
      </div>
      <div className="check">
        <CheckIcon onClick={() => {
          setColorPickerVisible(false);
          if (currTab === 0 && !expenseOnly) {
            onSubmit(currTab, { name: bucketName, amount: parseFloat(bucketAmount), color: color, subExpenses: [] });
          } else if (currTab === 1) {
            onSubmit(currTab, { name: expenseName, amount: parseFloat(expenseAmount), color: color });
          } else if (expenseOnly) {
            onSubmit(2, { name: expenseName, amount: parseFloat(expenseAmount), color: color });
          }
        }}
          style={{ fontSize: 40 }} />
      </div>
      {colorPickerVisible && <CirclePicker color={color} onChange={(color) => { setColor(color.hex) }} className="circlePicker surface" />}
    </div>
  )
}
export default Drawer;
