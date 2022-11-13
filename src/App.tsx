/* eslint-disable jsx-a11y/anchor-is-valid */
import "./App.css";
import { useState } from "react";

import styled from "styled-components";
import UserForm from "./components/UserForm";
import { GannTable } from "./components/GannTechnique/GannTable";

function App() {
  const [showTab, setShowTab] = useState("shareAverageCalculator");

  return (
    <div className="container mt-2">
      <Navigation>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a
              className={`nav-link ${
                showTab === "shareAverageCalculator" ? "active" : ""
              }`}
              aria-current="page"
              href="#"
              onClick={() => {
                setShowTab("shareAverageCalculator");
              }}
            >
              Share Average Calculator
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${
                showTab === "gannCalculator" ? "active" : ""
              }`}
              aria-current="page"
              href="#"
              onClick={() => {
                setShowTab("gannCalculator");
              }}
            >
              Gann Calculator
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${showTab === "link" ? "active" : ""}`}
              aria-current="page"
              href="#"
              onClick={() => {
                setShowTab("link");
              }}
            >
              Link
            </a>
          </li>
        </ul>
      </Navigation>
      <hr />

      {showTab === "shareAverageCalculator" ? <UserForm /> : ""}
      {showTab === "gannCalculator" ? <GannTable /> : ""}
    </div>
  );
}

export default App;

const Navigation = styled.div`
  li {
    a {
      color: black;
    }
  }
`;
