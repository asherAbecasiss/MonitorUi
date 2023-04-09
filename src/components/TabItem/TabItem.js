import * as React from "react";
import { getInfo } from "../../redux/reducers/HostInfoSlice";
import { getPs } from "../../redux/reducers/PsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import RadialSeparators from "./RadialSeparators";
import "react-circular-progressbar/dist/styles.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Figure from "react-bootstrap/Figure";
import Image from "react-bootstrap/Image";
import img from "../../assets/59944.jpg";
import ProgressBar from "react-bootstrap/ProgressBar";
import { FaDocker, FaNetworkWired } from "react-icons/fa";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { BsArrowRepeat } from "react-icons/bs";
import {
  CircularProgressbarWithChildren,
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import styles from "./TabItem.module.css";

function TabItem() {
  const host = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { hostip } = useParams();
  const found = host.info.data.filter((obj) => {
    return obj.hostip === hostip;
  });
  useEffect(() => {
    dispatch(getInfo());
    dispatch(getPs());

    setShow(true);

    console.log("=======>", found);
  }, [show]);
  const handleClick = (event, hostip) => {
    // dispatch(getIp());
    dispatch(getPs());

    setShow(true);

    // navigate("/" + hostip);
  };
  return (
    <>
      <div className="container-fluid">
        {found.map((obj, index) => {
          return (
            <div className="row ">
              <div className="col-8 ">
                <div className={styles.container}>
                  <div className="row p-3">
                    <div className="col-2 ">
                      <Card.Img variant="top" src={img} />
                    </div>
                    <div className={`${styles.textOver} col`}>
                      <div className={styles.textIp}>
                        <h2>
                          <FaNetworkWired /> {obj.hostip}
                        </h2>
                      </div>
                      <div>Host : {obj.hostname}</div>

                      <div>{obj.uptime}</div>
                      <div>{obj.procs}</div>
                      <div>{obj.platform}</div>
                      <div>{obj.platformFamily}</div>
                      <div>{obj.kernelArch}</div>
                      <div>{obj.os}</div>
                      <br />

                      <div>
                        <div className="row">
                          <div className="col  p-1">
                            <ProgressBar
                              now={
                                Math.floor(obj.total / 1000000000) -
                                Math.floor(obj.free / 1000000000)
                              }
                              label={"Disk"}
                              max={Math.floor(obj.total / 1000000000)}
                              animated={true}
                            />
                            total: {(obj.total / 1000000000).toFixed(2)}{" "}
                            {obj.fstype}{" "}
                            <h3>Free: {(obj.free / 1000000000).toFixed(2)} </h3>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-2">
                      <CircularProgressbarWithChildren
                        value={obj.mempercent}
                        text={`${22}%`}
                        styles={buildStyles({
                          strokeLinecap: "butt",
                          textColor: "white",
                          //   pathColor: "blue",
                        })}
                      >
                        <RadialSeparators
                          count={12}
                          style={{
                            background: "#fff",
                            width: "2px",
                            // This needs to be equal to props.strokeWidth
                            height: `${10}%`,
                          }}
                        />
                      </CircularProgressbarWithChildren>

                      <p className="text-white">CPU</p>
                    </div>
                    <div className=" col-3">
                      <CircularProgressbarWithChildren
                        value={obj.mempercent}
                        text={`${obj.mempercent}%`}
                        styles={buildStyles({
                          strokeLinecap: "butt",
                          textColor: "f88",
                          // pathColor: "#f88",
                        })}
                      >
                        <RadialSeparators
                          count={12}
                          style={{
                            background: "#fff",
                            width: "2px",
                            // This needs to be equal to props.strokeWidth
                            height: `${10}%`,
                          }}
                        />
                      </CircularProgressbarWithChildren>
                      <p className="text-white">Memory</p>
                    </div>
                  </div>
                  
                </div>
              </div>
              <div className="col text-black">
                {/* <div className="container">
                <Button variant="primary" onClick={handleClick}>  <BsArrowRepeat /></Button>
                  {show && (
                <div className={styles.box}>
                
                    <table className="table text-black">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>Cpu Percent</th>
                        </tr>
                      </thead>

                      <tbody>
                        {host.ps.data.map((row, index) => (
                          <tr key={index}>
                            <td>{row.id}</td>
                            <td>{row.name}</td>
                            <td>{row.CpuPercent}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                 
                </div>
                 )}
              </div> */}
  
              </div>
              
            </div>
            
          );
        })}
      </div>
    </>
  );
}

export default TabItem;
