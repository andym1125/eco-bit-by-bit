import React, { useState } from "react";
import "./Textbox.css";

interface InputBoxProps {
  onDelete: (value: string) => void;
}

const InputBox: React.FC<InputBoxProps> = ({ onDelete }) => {
  const [inputValues, setInputValues] = useState<string[]>([""]);
  const [copied, setCopied] = useState<boolean[]>([false]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = e.target.value;
    setInputValues(newInputValues);
  };

  const handleInputBoxDelete = (index: number) => {
    const deletedValue = inputValues[index];
    const newInputValues = inputValues.filter((_, i) => i !== index);
    setDeletedValues((prevState) => [...prevState, deletedValue]);
    const newCopied = [...copied];
    newCopied.splice(index, 1);
    setCopied(newCopied);
    setInputValues(newInputValues);
    onDelete(deletedValue);
  };

  const addInputBox = () => {
    if (inputValues.length < 10) {
      setInputValues([...inputValues, ""]);
      setCopied([...copied, false]);
    }
  };

  const [deletedValues, setDeletedValues] = useState<string[]>([]);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    const newCopied = [...copied];
    newCopied[index] = true;
    setCopied(newCopied);
    setTimeout(() => {
      const newCopied = [...copied];
      newCopied[index] = false;
      setCopied(newCopied);
    }, 2000);
  };

  return (
    <div className="container">
      {inputValues.map((value, index) => (
        <div key={index} className="input-box-container">
          <input
            type="text"
            value={value}
            onChange={(e) => handleInputChange(e, index)}
            className="input-box"
          />
          <button
            className="copy-button"
            onClick={() => copyToClipboard(value, index)}
          >
            {copied[index] ? "Copied!" : "Copy"}
          </button>
          <button
            className="delete-button"
            onClick={() => handleInputBoxDelete(index)}
          >
            Delete
          </button>
        </div>
      ))}
      <button onClick={addInputBox} className="add-box-button">
        Add Input Box
      </button>
    </div>
  );
};

export default InputBox;
