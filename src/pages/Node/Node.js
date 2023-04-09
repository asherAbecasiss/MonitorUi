import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import TabItem from "../../components/TabItem/TabItem";
import FileSystem from "../../components/FileSystem/FileSystem";

function Node() {

  return (
    <>

      <Tabs
        defaultActiveKey="profile"
        id="uncontrolled-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="System Info">
          <TabItem />
        </Tab>
        <Tab eventKey="profile" title="File System">
        <FileSystem/>
        </Tab>
        <Tab eventKey="contact" title="Contact"></Tab>
      </Tabs>
    </>
  );
}

export default Node;
