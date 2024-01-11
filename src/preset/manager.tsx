import { addons, types } from "@storybook/addons";
import { AddonPanel } from "@storybook/components";
import * as React from "react";

import { ADDON_ID, PANEL_ID } from "./constants";
import { XStateInspectorPanel } from "./InspectorPanel";

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "xState Inspector",
    paramKey: "xstate",
    render: ({ active }) => (
      <AddonPanel active={!!active}>
        <XStateInspectorPanel />
      </AddonPanel>
    ),
  });
});
