# AI Coin Collection Scanner — Browser Beta v1.8

AI Coin Collection Scanner helps collectors turn coin photographs into a structured, editable coin inventory in the browser.

## Browser Beta v1.8

This consolidated release retains the strongest verified functionality from development versions v1.3, v1.5 and v1.7 and adds country/type-specific research sources from the later deployment build.

Features include:
- multiple photo uploads and front/reverse pairing by consistent position;
- browser-side coin detection/cropping with manual review;
- expanded public coin references, including Dutch and euro references;
- cautious public-reference matching and ambiguity handling;
- Interesting / Possibly interesting / Normal research priority;
- up to three qualified research sources appropriate to country/currency;
- Excel and CSV export with photo traceability;
- colour-coded Excel research priority and public-reference worksheet.

The scanner is an inventory and research assistant. It does not guarantee identification, authenticity, rarity or monetary value.

## Photo workflow

For grouped photos, keep every coin in the same position when turning the coins over. Use consistent group names such as `01a.jpg` and `01v.jpg`. This lets the front and reverse crops be paired by reading order when the detected counts agree. Always verify the pairing manually.

## Public tester workbook

`docs/AI-Coin-Inventory-Empty-Beta.xlsx` is an empty template with instructions and a colour legend. Development test records and test photographs are not part of the public release.

## Tests

Run:

```bash
node --test tests/core.test.mjs tests/reference.test.mjs
```

## User guide

The Dutch infographic guide is published separately under `docs/infographic-handleiding-nl.html` and is preserved during this release.
