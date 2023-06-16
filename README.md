# React Excel

Analysing Excel sheet using React Frontend.

- Compare sheets. (*)
- Dropdown for Bidgely Presets (NBI Sheet, Reco Sheet, etc).
  - Tabs for present Test settings/Configs.
- fieldData.trim() on numeric values Will fail.
- Enummed Cells.
- Guard against Array out of bound exceptions (when column Number or sheetNumber not present).
- Column combo checks: Combination of values in 2 columns used to decide the correct value for present cell, and then compare the cell value to the correct value.
- Timeout of unloadable images and hence their tests.
- Schema: 
  - Beyond a fixed number of columns, we can relax the checks. If extra column put towards end of FOR_CUSTOMER_REVIEW sheet, it should be OK.
- Spinner when Test initiated and test results tabe not enabled yet.
- Ready the configs for generic pilots.
- Check pending Todos.
- Add conditions from Reco Front sheet.
- Show Sheet Name instead of Sheet 0, 1, 2, etc.
- Case insensitive Column Title comparison (Check code if necessary).
- Empty rows (until row end).
- Foldable test result sections. (Schema, Single Sheet, Across Sheet).