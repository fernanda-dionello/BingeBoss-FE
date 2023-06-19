import { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import "./CheckedButton.css"

export function CheckedButton({text, value, onClick, selected}) {
  const [checked, setChecked] = useState(false);

  return (
    <ToggleButton
      id={value}
      type="checkbox"
      variant="secondary"
      checked={checked || selected}
      className={(checked || selected) ? "checked-button" : "unchecked-button"}
      value={value}
      onChange={(e) => {
        setChecked((checked) ? false : true);
      }}
      onClick={(e) => onClick(value)}
    >
      {text}
    </ToggleButton>
  );
}
