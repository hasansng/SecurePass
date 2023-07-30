import React, { useState } from "react";
import { Col, InputNumber, Slider } from "antd";
import toast, { Toaster } from "react-hot-toast";

//CSS
import style from "./App.module.css";

const App = () => {
  const [inputValue, setInputValue] = useState(8);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState(false);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const onChange = (newValue) => {
    setInputValue(newValue);
  };

  const notify = () => {
    navigator.clipboard.writeText(password);
    setCopy((copy) => !copy);
    toast("The password was copied", { icon: "✅" });
    setTimeout(() => {
      setCopy((copy) => !copy);
    }, 4000);
  };
  const generatePassword = () => {
    let charset = "";
    if (useUppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (useLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useNumbers) charset += "0123456789";
    if (useSymbols) charset += "!@#$%^&*";

    let password = "";
    for (let i = 0; i < inputValue; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(password);
  };
  return (
    <div className={style.app}>
      <Toaster />
      <div className={style.container}>
        <img src="/assets/img/logo.png" alt="LOGO | PASSWORD" width={270} />
        <p className={style.title}>
          <strong>Secure</strong>Pass
        </p>
        <div className={style.pass}>
          <p>{password}</p>
          <button type="button" onClick={notify}>
            {copy ? "Copied!" : "Copy"}
          </button>
        </div>
        <div className={style.length}>
          <label>Password length</label>
          <div className={style.range}>
            <Col span={12}>
              <Slider
                min={1}
                max={20}
                onChange={onChange}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
            </Col>
            <InputNumber
              min={5}
              max={20}
              style={{
                margin: "0 16px",
              }}
              value={inputValue}
              onChange={onChange}
            />
          </div>
        </div>
        <button type="button" className={style.btn} onClick={generatePassword}>
          GENERATE
        </button>
      </div>
    </div>
  );
};

export default App;
