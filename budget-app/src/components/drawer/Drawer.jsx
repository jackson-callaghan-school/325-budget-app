import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
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

        <TabPanel>
          <span className="formSize">
            <form>
              <label className="bucketDrawerLabel">
                Bucket Name:
              </label>
                <br />
                <input type="text" name="name" placeholder="Name" className="bucketDrawerInput" />
              <br />
              <label className="bucketDrawerLabel">
                Bucket Allowance:
              </label>
                <br />
                <input type="text" name="allowance" placeholder="$1000.00" className="bucketDrawerInput"  />
            </form>

          </span>
          <span className='colorGroup'>
            <button id="circle" className="circle" style={{ backgroundColor: color }} onClick={() => {setColorPickerVisible(!colorPickerVisible)}}></button>
            {colorPickerVisible && <BlockPicker color={color} onChange={(color) => { setColor(color.hex) }} className="blockPicker" />}
          </span>
        </TabPanel>
        <TabPanel>
          <span className="formSize">
            <form>
              <label className="bucketDrawerLabel">
                Expense Name:
              </label>
                <br />
                <input type="text" name="name" placeholder="Name" className="bucketDrawerInput"  />
              <br />
              <label className="bucketDrawerLabel">
                Expense Cost:
              </label>
                <br />
                <input type="text" name="allowance" placeholder="$1000.00" className="bucketDrawerInput"  />
            </form>
          </span>
          <span className='colorGroup'>
            <button id="circle" className="circle" style={{ backgroundColor: color }} onClick={() => {setColorPickerVisible(!colorPickerVisible)}}></button>
            {colorPickerVisible && <BlockPicker color={color} onChange={(color) => { setColor(color.hex) }} className="blockPicker" />}
          </span>
        </TabPanel>
      </Tabs>

      <div className="xBox">
        <span id="x" onClick={onClose}>X</span>
      </div>
      <div className="check"></div>
    </div>
  )
}
export default Drawer;
