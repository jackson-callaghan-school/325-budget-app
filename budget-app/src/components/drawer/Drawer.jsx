import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import 'react-tabs/style/react-tabs.css';
import './Drawer.css';

const Drawer = ({ visible, onClose, onSubmit, currentBucket }) => {
  const [color, setColor] = useState('#22a6b3');
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

  if (!visible) return null;
  return (
    <div id="drawerContainer" className="drawerContainer">
      <Tabs>
        <TabList className="tabPosition">
          <Tab variant="width">New Bucket</Tab>
          <Tab variant="width">New Expense</Tab>
        </TabList>

        <TabPanel className='bucketGrid'>
          <span className="formSize">
            <form>
              <label className="bucketDrawerLabel name">
                Bucket Name:
                <input type="text" name="name" placeholder="Name" className="bucketDrawerInput" />
              </label>
              <label className="bucketDrawerLabel allowance">
                Bucket Allowance:
                <input type="text" name="allowance" placeholder="$1000.00" className="bucketDrawerInput" />
              </label>
            </form>

          </span>
          <span className='colorGroup'>
            <button id="circle" className="circle" style={{ backgroundColor: color, borderColor: color }} onClick={() => { setColorPickerVisible(!colorPickerVisible) }}></button>
          </span>
        </TabPanel>
        <TabPanel className='bucketGrid'>
          <span className="formSize">
            <form>
              <label className="bucketDrawerLabel">
                Expense Name:
                <input type="text" name="name" placeholder="Name" className="bucketDrawerInput" />
              </label>
              <label className="bucketDrawerLabel">
                Expense Cost:
                <input type="text" name="allowance" placeholder="$1000.00" className="bucketDrawerInput" />
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
          onSubmit();
          setColorPickerVisible(false);
        }}
          style={{ fontSize: 40 }} />
      </div>
      {colorPickerVisible && <CirclePicker color={color} onChange={(color) => { setColor(color.hex) }} className="circlePicker surface" />}
    </div>
  )
}
export default Drawer;
