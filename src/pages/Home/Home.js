import NodeList from "../../components/NodeList/NodeList";
import { getInfo } from "../../redux/reducers/HostInfoSlice";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";



function Home() {
  const info = useSelector((state) => state.info);
  const dispatch = useDispatch();

  React.useEffect(() => {
    //running the api call on first render/refresh
    dispatch(getInfo());
    //running the api call every one minute
    const interval = setInterval(() => {
      dispatch(getInfo());
    }, 6000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div className="container-fluid ">
        <div className="row ml-auto  ">
          <div className="col-sm border border-dark  ">
            <NodeList />
          </div>
          <div className="col-sm ">
            <h1>dd</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
