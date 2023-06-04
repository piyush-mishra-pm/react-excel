# React Excel

Analysing Excel sheet using React Frontend.

- Compare sheets. (*)
- Dropdown for Bidgely Presets (NBI Sheet, Reco Sheet, etc).
  - Tabs for present Test settings/Configs.
- fieldData.trim() on numeric values Will fail.
- Enummed Cells.
- Guard against Array out of bound exceptions (when column Number or sheetNumber not present).
- Range Unique checks: Particular value should only be present once in a region.
- Column combo checks: Combination of values in 2 columns used to decide the correct value for present cell, and then compare the cell value to the correct value.
- Timeout of unloadable images and hence their tests.
- Parallel Presence: Set of column values, should be present (only once) in multiple sheets.
  - Misses: Present in one but missing in other.
- Why automatic opening of Test results is not working.
- Dedup in 1 sheet: Combination of columns in same sheet should not repeat.
- Presence in 2 sheet: Certain Combination of columns in 1 sheet should be present as a Combination of columns in 2nd sheet.
- Schema: 
  - Beyond a fixed number of columns, we can relax the checks. If extra column put towards end of FOR_CUSTOMER_REVIEW sheet, it should be OK.
- 