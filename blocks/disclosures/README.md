# Disclosures

Keep homepage disclosures in a separate DA document, such as `/homepage-disclosures`. Set page Metadata `Disclosures` to that document path. The loader places its authored content after the global footer. The global footer document remains independent.

Use a two-column **Disclosures** table. `Introduction` rows hold introductory rich text. Numbered rows (`1`, `2`, and so on) hold the corresponding legal copy. An optional `Closing` row follows the numbered list. Blank rows and empty cells are skipped. Links, lists, and inline formatting remain authored; the block has no legal-copy fallback.

Numeric superscripts in the page content link to existing numbered entries. A comma-separated reference such as `5,9` becomes two links. References are left unchanged when any target is missing. Numbered items have stable `disclosure-N` IDs and can receive focus after anchor navigation.

A one-cell block containing a single document link also loads an authored disclosure document. Avoid using both inline disclosures and page Metadata to define duplicate entries. Update offer rates, dates, eligibility, tiers, and associated disclosure copy together.
