import style from "./NodeList.module.css";
import { getInfo } from "../../redux/reducers/HostInfoSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

function HostList() {
  const host = useSelector((state) => state.info);
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (stats.data != "undefined") {
      setShow(true);
    }
  }, [show]);
  const stats = useSelector((state) => state.stats);
  const handleClick = (event, hostip) => {
    // dispatch(getIp());
    dispatch(getInfo());
    console.log(hostip);
    navigate("Node/" + hostip);
  };
  return (
    <>
      <table className={`${style.tablestriped} table text-1 table-sm ${style.text1}`}>
        <thead>
          <tr>
            <th>Host Name</th>
            <th>IP</th>
            <th>OS</th>
            <th>RAM</th>
            <th>CPU</th>
          </tr>
        </thead>
        <tbody>
          {host.data.map((row, index) => (
            <tr onClick={(event) => handleClick(event, row.hostip)} key={index}>
              <td>{row.hostname}</td>
              <td>{row.hostip}</td>
              <td>{row.os}</td>
              <td>
                <ProgressBar
                  now={row.mempercent}
                  label={`${row.mempercent}%`}
                />
              </td>
              <td>{row.mempercent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default HostList;
