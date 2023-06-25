import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./Dropdown.css";
import { useState } from "react";

export function DropDown(props) {
  const [selectedItem, setSelectedItem] = useState("Season 1");

  const handleDropdownSelect = (eventKey, event) => {
    setSelectedItem(eventKey);
    props.optionSelected(eventKey);
  };

  const seasonsNumber = [];

  for (let i = 1; i <= props.number_of_seasons; i++) {
    seasonsNumber.push(
      <Dropdown.Item
        key={`Season ${i}`}
        eventKey={`Season ${i}`}
      >{`Season ${i}`}</Dropdown.Item>
    );
  }

  return (
    <DropdownButton
      className="dropdown-styled"
      id="dropdown-basic-button"
      title={selectedItem}
      size="sm"
      onSelect={handleDropdownSelect}
    >
      {seasonsNumber}
    </DropdownButton>
  );
}
