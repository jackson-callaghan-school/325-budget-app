import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './Drawer.css';

const Drawer = ({ visible, onClose, onSubmit }) => {
  if (!visible) return null;
  return (
    <div id="drawerContainer" className="drawerContainer">
      <Tabs>
        <TabList className="tabPosition">
          <Tab variant="width">New Bucket</Tab>
          <Tab variant="width">New Expense</Tab>
        </TabList>

        <TabPanel>
          <div className="formSize">
            <form>
              <label>
                Bucket Name:
                <br />
                <input type="text" name="name" placeholder="Name" />
              </label>
              <br />
              <label>
                Bucket Allowance:
                <br />
                <input type="text" name="allowance" placeholder="$1000.00" />
              </label>
            </form>

          </div>
          <div id="circle" className="circle"></div>
        </TabPanel>
        <TabPanel>
          <div className="formSize">
            <form>
              <label>
                Expense Name:
                <br />
                <input type="text" name="name" placeholder="Name" />
              </label>
              <br />
              <label>
                Expense Cost:
                <br />
                <input type="text" name="allowance" placeholder="$1000.00" />
              </label>
            </form>
          </div>
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
