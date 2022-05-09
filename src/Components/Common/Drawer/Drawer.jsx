import React from "react";
import Drawer from "@material-ui/core/Drawer";

function CustomDrawer({ state, setState, position, label, children }) {
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      {[position].map((anchor) => (
        <React.Fragment key={anchor}>
          <p onClick={toggleDrawer(anchor, true)}>{label}</p>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {children}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}

export default CustomDrawer;
