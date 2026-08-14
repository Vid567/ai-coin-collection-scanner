# AI Coin Collection Scanner — Browser Beta v3.1

AI Coin Collection Scanner helps collectors turn coin photographs into a structured, editable coin inventory in the browser.

## Browser Beta v3.1

This current release provides a browser-based inventory and research workflow with optional client-side OCR and curated public-reference support.

Features include:
- multiple photo uploads;
- browser-side coin detection and cropping with manual review;
- front/reverse pairing by consistent position, with low-confidence pairing rejected;
- structured, editable inventory records linked to source photos;
- optional client-side OCR used only as a reviewable visible-text clue;
- cautious public-reference matching and ambiguity handling;
- Further Research guidance and qualified research sources;
- Excel and CSV export with photo traceability.

Photos and inventory data stay in the browser. Google Analytics is present on the public pages, and public-reference links may lead to external websites.

The scanner is an inventory and research assistant. It does not guarantee identification, country, year or denomination recognition, accuracy, authenticity, rarity, grade or monetary value.

## Photo workflow

For grouped photos, keep every coin in the same position when turning the coins over. Use consistent group names such as `01a.jpg` and `01v.jpg`. This lets front and reverse crops be paired by reading order when the detected counts agree. Always verify the pairing manually.

## Public tester workbook

`docs/AI-Coin-Inventory-Empty-Beta.xlsx` is an empty template with instructions and a colour legend. Development test records and test photographs are not part of the public release.

## Tests

Run:

```bash
node --test tests/core.test.mjs tests/reference.test.mjs
```

## Public application and guides

- Application: https://vid567.github.io/ai-coin-collection-scanner/
- English landing page: https://vid567.github.io/ai-coin-collection-scanner/en/
- Browser scanner: https://vid567.github.io/ai-coin-collection-scanner/beta/
- English photo guide: https://vid567.github.io/ai-coin-collection-scanner/docs/en/photo-guide.html
- Dutch photo guide: https://vid567.github.io/ai-coin-collection-scanner/docs/nl/fotohandleiding.html
- Dutch infographic guide: https://vid567.github.io/ai-coin-collection-scanner/docs/infographic-handleiding-nl.html
