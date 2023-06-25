import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import "./DropdownList.css";
import { useState } from "react";

export function DropDownList(props) {
  const [selectedItem, setSelectedItem] = useState("My List");

  const statusOptions = [
    {
      id: 'myList',
      name: 'My List'
    },
    {
      id: 'watching',
      name: 'Watching'
    },
    {
      id: 'watched',
      name: 'Watched'
    },
    {
      id: 'abandoned',
      name: 'Abandoned'
    }
  ]
  const handleDropdownListSelect = (eventKey, event) => {
    setSelectedItem(eventKey);
    props.optionSelected(statusOptions.find((item) => item.name === eventKey).id);
  };

  const status = [];

  statusOptions.forEach(({key: optionKey, name}) => {
    status.push(
      <Dropdown.Item
        key={optionKey}
        eventKey={name}
      >{name}</Dropdown.Item>
    );
  })

  return (
    <DropdownButton
      className="dropdown-list-styled"
      id="dropdown-list-basic-button"
      title={selectedItem}
      size="sm"
      onSelect={handleDropdownListSelect}
    >
      {status}
    </DropdownButton>
  );
}
