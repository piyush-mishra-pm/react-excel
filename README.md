# React Excel

Analysing Excel sheet using React Frontend.

- Compare sheets. (*)
- Dropdown for Bidgely Presets (NBI Sheet, Reco Sheet, etc).
- Tabs for present Test settings/Configs.
- fieldData.trim() on numeric values Will fail.
- Enummed Cells.
- Schema checks.
- Guard against Array out of bound exceptions (when column Number or sheetNumber not present).
- Range Unique checks: Particular value should only be present once in a region.
- Column combo checks: Combination of values in 2 columns used to decide the correct value for present cell, and then compare the cell value to the correct value.
- Timeout of unloadable images and hence their tests.