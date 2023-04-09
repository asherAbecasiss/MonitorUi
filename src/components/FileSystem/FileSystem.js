import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import FileEditor from '../FileEditor/FileEditor';

import Modal from 'react-bootstrap/Modal';
import {
  FileActionHandler,
  ChonkyActions,
  FileBrowser,
  FullFileBrowser,
  FileList,
  FileNavbar,
  FileToolbar,
} from "chonky";
import { getFs } from "../../redux/reducers/FsSlice";
import Button from "react-bootstrap/Button";

function FileSystem() {
  const [searches, setSearches] = useState([
    { id: "xcvzz", name: "/", isDir: true },
  ]);
  const [path, setPath] = useState("/");
  const folderChain = [{ id: "xcv", name: "/", isDir: true }];
  const fs = useSelector((state) => state.fs);
  const dispatch = useDispatch();
  const fileBrowserRef = React.useRef(null);
    const [show, setShow] = useState(false);

 const [modalShow, setModalShow] = React.useState(false);

  React.useEffect(() => {
    //running the api call on first render/refresh
      dispatch(getFs({path:"/",isDir:true}));
    console.log("79", "/");
    //running the api call every one minute
    console.log("90909", fs);
  }, []);
  const myFileActions = [
    ChonkyActions.UploadFiles,
    ChonkyActions.DownloadFiles,
    ChonkyActions.MouseClickFile,
  ];
  const handleClickBack = (event) => {
    // dispatch(getIp());

    var t = fs.data.path.substring(fs.data.path.lastIndexOf("/"));
    var z = fs.data.path.replace(t, "");
    console.log(z);
    setPath(z);
    if(z != '')
    {
       dispatch(getFs({path:z,isDir:true}));
    }
    

    // if (event.payload.file != null) {
    //   setSearches((searches) => (searches.slice(0,-1)));
    //   console.log("788", searches);
    //   dispatch(getFs(fs.data.path + "/" + event.payload.file.name));
    // }

    // navigate("/" + hostip);
  };
  const handleClick = (event) => {
    // dispatch(getIp());

    if (event.payload.file != null) {
       var t = fs.data.path + "/" + event.payload.file.name;
      if (event.payload.file.isDir) {
        setSearches((searches) => [...searches, event.payload.file]);
        console.log("78", searches);
       
        dispatch(getFs({path:t,isDir:true}));
      }
      else{
        console.log("file->",event.payload.file.name);
          dispatch(getFs({path:t,isDir:false}));
          setModalShow(true);
      }
    }
    setPath(fs.data.path);

    // navigate("/" + hostip);
  };

  return (
    <>
      <div style={{ height: 600 }}>
        <div className="container-fluid text-primary">
          <div class="row m-2 p-2">
            {" "}
            <Button variant="outline-secondary" onClick={handleClickBack}>
              Back
            </Button>
            <Button variant="outline-secondary">Secondary</Button>
            <p> {path} </p>
          </div>
        </div>

        <FileBrowser
          onFileAction={handleClick}
          files={fs.data.fileInfo}
          fileActions={myFileActions}
          folderChain={searches}
        >
          <FileToolbar />
          <FileList />
        </FileBrowser>
      </div>
      
    <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}



function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Centered Modal</h4>
       <FileEditor/>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FileSystem;
