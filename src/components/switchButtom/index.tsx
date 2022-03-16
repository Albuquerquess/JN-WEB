import React from 'react';
import ReactSwitch from 'react-switch';

import { ISwitchProps } from '../../types/button';

const SwitchButtom: React.FC<ISwitchProps> = ({
  handleOnActivate,
  handleOnDisable,
  status,
}) => {
  const [checked, setChecked] = React.useState(status || false);
  function handle() {
    if (!checked) {
      if (handleOnActivate) handleOnActivate();
    } else if (handleOnDisable) handleOnDisable();

    setChecked(!checked);
  }
  return (
    <ReactSwitch
      checked={checked}
      onChange={() => {
        handle();
      }}
      offColor="#D5D5D5"
      offHandleColor="#ffffff"
      onColor="#00D84F"
      onHandleColor="#ffffff"
      height={50}
      width={118}
      borderRadius={5}
      handleDiameter={45}
      activeBoxShadow="box-shadow: 0px 3px 6px #00000029"
      uncheckedIcon={<div />}
      checkedIcon={<div />}
      uncheckedHandleIcon={<div />}
      checkedHandleIcon={<div />}
      className="react-switch"
      id="small-radius-switch"
    />
  );
};

export default SwitchButtom;
