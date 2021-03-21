import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import React from "react";

import { ADDON_ID, PANEL_ID, INSPECT_ID } from "./constants";

// give a unique name for the panel
const XStateInspector = () => {
  return (
    <div
      style={{ width: "100%", height: "calc(100% - 4px)", border: 0 }}
      id={INSPECT_ID}
    />
  );
};

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "xState Inspector",
    render: ({ active, key }) => (
      <AddonPanel active={!!active} key={key}>
        <XStateInspector />
      </AddonPanel>
    ),
  });
});
