# E*TRADE homepage component migration record

Updated October 6, 2026. This record captures the homepage work in `gonsaje-vml/etrade-sandbox` so it can be repeated in the original E*TRADE repository. It separates implemented behavior, required Document Authoring (DA) changes, validation, and unfinished work. An implemented block is not necessarily a finished pixel match.

The starting code baseline was `c9b25b8` on `main`. The October 6 component changes are committed through `48fb921`; their references and remaining integration work are recorded below. Homepage and disclosure content were saved and previewed in DA; content publication is a separate step. This record is separate from the DA documents and is excluded from site delivery by `.hlxignore`.

## Sites and documents

| Purpose | Location |
| --- | --- |
| Working repository | `gonsaje-vml/etrade-sandbox`, local folder `etrade-local` |
| Destination for the later migration | Original E*TRADE repository, local folder `etrade` |
| Sandbox homepage preview | [Preview homepage](https://main--etrade-sandbox--gonsaje-vml.aem.page/home) |
| Production visual reference | [Production homepage](https://us.etrade.com/home) |
| Homepage authoring | [DA homepage](https://da.live/canvas#/gonsaje-vml/etrade-sandbox/home) |
| Header content | Separate `/nav` document, or the path selected by `Nav` metadata |
| Footer content | Separate `/footer` document, or the path selected by `Footer` metadata |
| Homepage disclosures | [DA disclosures](https://da.live/canvas#/gonsaje-vml/etrade-sandbox/homepage-disclosures) |
| Copyable homepage authoring example | `docs/home-authoring.html` |
| Copyable disclosure authoring example | `docs/homepage-disclosures-authoring.html` |
| Copyable footer authoring example | `docs/footer-authoring.html` |

The examples are transfer aids, not the current backend source. Re-read the destination's generated `.plain.html` and the current DA documents before applying content changes. The homepage example preserves the pricing introduction as an authored Columns block. It also prepares the savings video and separate Banner Offer for later activation; the active DA homepage retains the IPO hero for the presentation.

## Shared actions

**Files:** `scripts/actions.js`, `styles/actions.css`, and the import in `styles/styles.css`. Consumers include `hero-dark`, `widget-calculator`, `columns-feature`, `cards-pricing`, and `cards-product`; homepage default-content actions are grouped in `scripts/scripts.js`.

**Implemented:** Normalize standalone CTA paragraphs, remove imported `arrow_forward` text and duplicate arrow links, preserve authored destinations and tracking parameters, and supply decorative SVG arrows. Rich inline links and displayed URLs keep their normal treatment. Links retain native navigation semantics; new-tab links receive `noopener noreferrer`. Shared styles provide wrapping and visible focus.

**Authoring:** CTA labels and destinations stay in DA. First and subsequent actions receive their component's primary/secondary treatment; authors do not supply arrow text.

**October 6 update:** The shared helper supports outlined and text-only actions. Cards use outlined actions by default, or text links with `(text-links)`. Pricing-introduction Columns now group their authored CTAs. Button sizing and hover treatment are shared; awards links keep text-link styling.

**Commit:** `ffd6d20` introduced the helper and shared styles. `d8293b6` added card and feature consumers; `287c4f7` added homepage default-content grouping.

## Header

**Files:** `blocks/header/header.js`, `header.css`, and `README.md`; `icons/etrade-logo-dark.svg` and `icons/etrade-logo-light.svg`.

**Implemented:** Rounded prospect navigation, utility links, responsive mobile drawer with Back navigation, desktop dropdown animation, compact panels for fewer than three link columns, full-width panels for three or more columns, and hover/focus underlines. Local search, close, and chevron SVGs replace icon-font tokens. Desktop search retains the logo and account action. Mobile search uses the logo/login space while retaining the menu button. Customer support dropdown layering was corrected.

Buttons expose expanded state and controlled panels. Closed menus become inert and hidden from assistive technology. Escape restores focus, outside interaction closes menus, and reduced-motion preferences remove transitions.

**Authoring:** `/nav` supplies utility links, brand variants, menu columns, descriptions, promotions, and the account action. `Theme` selects a header palette; `Header Theme` overrides it for the header. `Header Logo Light` and `Header Logo Dark` can override authored logo images. `Nav Link Base` resolves root-relative destinations against an authored host while keeping the `/home` brand destination local. This sandbox uses `https://us.etrade.com` until its destination pages exist.

**Open:** Migrate `/nav` fully to explicit Login, Brand variants, Column, and Promo authoring, then remove legacy grouping/URL/logo fallbacks. Menu copy and promotions still need current-production authoring. Search autocomplete and signed-in navigation require separate services; the current header does not infer identity from cookies. The initial theme work was header-scoped; do not assume every block supports a page-level theme override.

**Validation:** October 6 deployed checks confirmed desktop logo visibility during search and the customer-support panel's placement. Mobile search behavior was compared with production. Earlier keyboard and reduced-motion work is documented in the block README.

**Commits:** `c3e0ff5`, `723d7ab`, `50eb50c`, `280ba87`, `97ea960`.

## Floating dock

**Files:** `blocks/floating-dock/` and its compatibility autoblock in `scripts/scripts.js`. Dedicated overlay-section handling also uses `scripts/section-layout.js` and `styles/styles.css`.

**Implemented:** Fixed desktop offer/login/account actions and a mobile account CTA with an expandable quick-links panel. Decorative tag/person icons, safe-area spacing, wrapping, and focus clearance around the dock are supported. Opening the mobile panel focuses its first link; Escape closes it and returns focus. Outside interaction closes the panel. Empty or omitted actions are handled defensively.

**Authoring:** A Floating Dock table uses `offer`, `login`, and `primary` rows with labelled links. Imported sticky-CTA markup remains supported through an autoblock. A page displays a dock when its content contains the block or matching imported markup; there is no global page-visibility registry. Login-state hiding is not implemented.

**Validation:** Earlier local checks covered opening, Escape, and focus restoration. Desktop and mobile rendering were checked on the deployed page on October 6.

**Commits:** `54f6618`, with later section integration in `287c4f7`.

## Widget calculator

**Files:** `blocks/widget-calculator/widget-calculator.js`, `widget-calculator.css`, `tiers.json`, `metadata.json`, and `README.md`; shared action helper and styles.

**Implemented:** Authored promo card and brokerage funding tiers, linked cash-credit/deposit outputs, desktop native range slider, and mobile custom combobox/listbox. Both controls share state. The combobox supports arrow keys, Home/End, typeahead, selection, cancellation, outside close, and a scrollable option list. Value text and a status region communicate funding and credit changes. Focus, unique IDs, associated labels, and reduced motion are supported.

**Authoring:** Named rows provide heading, description, promo code, CTAs, labels, and disclaimer. Numeric rows provide funding/credit pairs. Explicit authored amounts take precedence. `tiers.json` remains a legacy fallback for empty credit cells; migrate to complete authored tiers instead of relying on it. The homepage example has ten explicit funding/credit pairs and a final open-ended range. Offer eligibility, dates, and disclosures remain authored.

**Validation:** On the deployed mobile page, End then Enter selected `$5,000,000+`, updated the credit to `$10,000`, closed the popup, and kept focus on the combobox. Earlier local checks also covered desktop slider End, value announcements, and switching controls at breakpoints. No formal WCAG certification is implied by these checks.

**October 6 update:** Heading typography, superscript sizing, and secondary-link alignment were corrected. Section/wrapper rules now live in shared page CSS. Calculator behavior is unchanged and does not consume the bank-rate API described below.

**Commits:** `11d86d3`, `c548bd8`, `ffd6d20`.

## Hero dark

**Files:** `blocks/hero-dark/`, shared action helper/styles, and section/container rules in `styles/styles.css`.

**Implemented:** Authored heading and copy above full-width rounded media, desktop heading/copy columns, responsive wrapping CTAs, optional image/caption handling, preserved alternative text, and a solid dark surface when no image is supplied. The first-section image loads eagerly with high fetch priority. Imported CTA arrows are normalized. The imported isolated Home breadcrumb is hidden. The current layout does not overlay copy on media.

**Video support:** A Media row containing a clickable MP4 URL creates a muted, inline video with a 44px play/pause control. A Media description row supplies its accessible description. Automatic playback stops after two passes; reduced motion pauses near the final frame. Video media is hidden at widths of 768px or less. The existing image path and IPO spacing remain supported.

**Authoring:** Heading, campaign copy, rates, references, CTAs, and media belong in the Hero Dark table. A separate media cell can include a caption. Use H1 for the page title. Empty alt text is appropriate for decorative imagery.

**Open:** The IPO campaign remains active at the user’s request. A savings campaign with a separate Banner Offer is saved in the authoring example for later activation. The video URL and accessible description must be authored in DA; campaign-specific spacing applies only to video heroes.

**Commits:** `acdb707`, `3825e41`, `ffd6d20`, `287c4f7`. The earlier CSS cleanup `83379d1` is already in the original repository history.

## Banner Offer

**Files:** `blocks/banner-offer/`, shared action helpers/styles, and sibling-block spacing in `styles/styles.css`.

**Implemented:** Reuses the existing block for a separate promotional component. Cells are flattened into heading, optional image, rich-text copy, and standalone CTAs; inline links stay in copy. The `(light)` variant uses a white desktop row, outlined action, and stacked mobile content. Empty content hides the block and omitted imagery is supported.

**Authoring:** Supply heading, optional image/alt text, terms, and labelled links in a separate Banner Offer table. The homepage example authors `Banner Offer (light)` beside Hero Dark in the same dark EDS section; it is an independent block, not hero content. Copy, campaign rates, and destinations remain in DA.

**Status:** Prepared in the saved authoring example but inactive in the current IPO presentation homepage.

**Commit:** `ab78652`.

## Separator and EDS section layout

**Files:** `blocks/separator/`, `scripts/section-layout.js`, `scripts/scripts.js`, and `styles/styles.css`. The homepage FAQ gutter adjustment is in `blocks/accordion-faq/accordion-faq.css`.

**Implemented:** Decorative inline SVG with a rounded step, authored upper/lower colors, horizontal bend position, component height, optional mobile height, and optional line color. ResizeObserver redraws the geometry. Configuration is validated defensively; the SVG is hidden from assistive technology and has no focus targets. The misspelled `seprator` block was renamed to `separator`.

Real EDS section breaks remain responsible for grouping and Section Metadata. The shared helper identifies a dedicated separator section, removes its outer gutters/margins, and marks adjacent sections without merging or moving content. A separator sharing a section with other content retains that section's normal layout. Floating docks in dedicated sections are treated as overlays. Unstyled empty trailing sections are removed.

**Authoring:** Place a Separator table in its own section, with a real section break before and after it. Set neighboring section backgrounds through Section Metadata. Colors on the divider do not set neighboring section colors. Default heights are 81px desktop and 45px mobile; an authored Height applies at both sizes unless Mobile height overrides it. Matching colors get an outline by default.

**Page metadata:** `Template: homepage` selects homepage spacing, gutters, wrapper widths, and section-specific layout rules. Page `Theme` and block/section theme options are distinct controls. Component-specific overrides currently exist where documented; page-wide component theme styling remains unfinished.

**Validation:** The deployed page had no horizontal overflow at 320px. Earlier local checks covered widths 320, 390, 768, 1280, and 1440. Keep separator positions and colors in authoring when migrating.

**Commits:** `164ddb6` created the misspelled block; `d95abb5` renamed it; `287c4f7` integrated real EDS sections. Transfer the final `separator` directory, not both names.

## Feature columns

**Files:** `blocks/columns-feature/` and shared action helper/styles.

**Implemented:** Defensive image/copy cells, normalized standalone CTAs, image-right variation, mobile copy-before-media order, safe wrapping, and rounded surfaces. A block inherits dark from its section unless explicit `(light)` or `(dark)` authoring overrides it. This supports a dark brokerage card inside a light page section.

**Authoring:** Image, alt text, eyebrow, H2, body copy, and CTAs stay in the block table. Use `(image-right, dark)` for the right-image dark banner. Explicit component themes do not recolor neighboring sections.

**October 6 update:** Desktop copy/image proportions, heading wrapping, eyebrow weight, body leading, and the two-column tablet breakpoint were adjusted. Image cells can retain captions. `(band, outline)` supports the banking section. Banking copy, image/caption, and CTAs were updated in DA; the obsolete comparison reference was removed.

**Commit:** `d8293b6`.

## Pricing cards

**Files:** `blocks/cards-pricing/`, `scripts/card-content.js`, and shared action helper/styles.

**Implemented:** One row per card, additional cells merged in reading order, blank rows skipped, H3 title normalization, large numeric first paragraphs, retained rich text/legal references, responsive grid, and bottom-aligned outlined actions by default. Six homepage pricing/offer cards were combined into one authored table to share a grid.

**Authoring:** Start with a numeric paragraph where applicable, then H3, supporting paragraphs, and a standalone CTA. An offer card can begin with its heading. Values and destinations remain authored.

**October 6 update:** Numeric values use weight 600 with responsive size and vertical padding. Card spacing and outlined CTAs were corrected. The grid uses one column on mobile and three from 768px; heights remain content-driven. An authored H4 first title retains compact visual styling after semantic H3 normalization.

**Commit:** `d8293b6`.

## Product cards

**Files:** `blocks/cards-product/`, `scripts/card-content.js`, and shared action helper/styles.

**Implemented:** Authored product/rate/copy/action content, H3 normalization, explicit rate styling, safe wrapping, bottom-aligned actions, and a two-column grid from 768px. Empty rows are skipped.

**Authoring:** H3 product name, H4 rate, supporting paragraphs, and an optional standalone CTA. The homepage savings card distinguishes boosted APY from base APY; the CD card includes maximum APY and term information. Keep numeric references synchronized with disclosures.

**October 6 update:** Desktop product titles are 28px and rate headings are 18px. Body leading, padding, paragraph spacing, and outlined actions were corrected. Dynamic base/CD rates remain planned through the shared bank-rate integration; boosted promotional APY needs a separate supported source.

**Commit:** `d8293b6`.

## Award cards

**Files:** `blocks/cards-award/` and `icons/award.svg`.

**Implemented:** Authored image/icon and rich text per row, optional media, empty-row handling, H3 award headings under the section H2, and three columns from 768px. The local trophy is decorative beside its explanatory copy.

**Authoring:** Use `:award:` or an appropriate authored image. The homepage uses `:award:` so backend icon decoration can resolve the committed asset. Award titles, years, attribution, and legal references remain content.

**October 6 update:** View all awards is now authored below the cards in DA and receives shared text-link styling. Award-card code is unchanged in this commit group.

**Validation:** All three trophies loaded on the deployed page. No broken images were found during the October 6 scan.

**Commit:** `d8293b6`.

## Accordion FAQ

**Files:** `blocks/accordion-faq/` and the homepage gutter variable in `styles/styles.css`.

**Implemented:** Rounded question rows, chevrons, rich-text answers, Expand all/Collapse all, and production's single-question opening behavior. Native buttons expose expanded state and unique answer regions. Closed answers become inert and hidden from assistive technology immediately. A 300ms grid reveal, fade, and chevron rotation support reduced motion. Missing question/answer rows are skipped; extra answer cells retain reading order.

**Authoring:** A two-column question/answer table, an immediately preceding section heading, and an optional immediately following standalone FAQ link. Those adjacent elements move into the component for styling. Questions, answers, and destinations are not supplied by JavaScript. Tracking pixels were removed from the homepage DA content; the decorator still safely accommodates explicit imported 1×1 action pixels.

**Validation:** October 6 comparison found matching 86px collapsed desktop rows and close visual parity. Opening a second question closed the first in both versions. Earlier checks covered Enter activation, expanded-state updates, and focus behavior. The FAQ spacing concern raised during the initial scan was resolved by the direct comparison; it is not an outstanding issue.

**Commits:** `f6a3ffb`, with homepage gutter integration in `287c4f7`.

## Footer

**Files:** `blocks/footer/`, `scripts/privacy.js`, `icons/privacy-options.svg`, `icons/phone.svg`, and `icons/social-facebook.svg`, `social-twitter.svg`, `social-linkedin.svg`, `social-youtube.svg`, `social-instagram.svg`.

**Implemented:** Global loading from a separate footer document, authored Contact/Social/Column/Brand roles, flexible navigation columns, circular social icons, native links, visible focus, safe new-tab links, and mobile stacking. Authors choose social icons and supply accessible names; unnamed icon-only links are omitted. Empty content hides the block. There is no hardcoded company link list or telephone number.

**Authoring:** Put one Footer block in `/footer`, or select a different document with `Footer` metadata. Contact, Social, and repeated Column rows supply production's footer. Brand is optional. Telephone destinations use `tel:`. Place social icon tokens inside labelled links.

Only the Footer block is consumed from that document. Disclosures, legal notices, and copyright below it are a separate component/document.

**Open:** Connect and validate a real consent-management provider. The added hook calls an installed OneTrust provider or emits a cancelable `privacy:open` event. Until a provider handles it, the authored privacy URL remains the fallback.

**Validation:** Footer and social icons loaded; social links had accessible names. Extra paragraph spacing in link lists was removed and the authored privacy icon now appears within its link at 15px high. Live consent-manager behavior remains unverified.

**Commit:** `2940381`.

## Disclosures

**Files:** `blocks/disclosures/`, disclosure loading in `scripts/scripts.js`, numeric-reference linking in `scripts/section-layout.js`, and superscript styles in `styles/styles.css`. Content example: `docs/homepage-disclosures-authoring.html`.

**Implemented:** A separate authored disclosure document loaded after the global footer in an aside labelled Important disclosures. Introduction/numbered/Closing rows preserve rich text and links. A single linked cell can load a fragment. Missing content hides the component. Numbered items receive stable `disclosure-N` IDs; numeric and comma-separated page superscripts link only when all referenced targets exist. Hash navigation works after the disclosure fragment loads.

**Authoring:** Set `Disclosures: /homepage-disclosures` in page metadata. The homepage has 13 numbered entries. Their ordering differs from current production, so copy and references must be migrated together rather than copying production numbers alone. Rates, dates, terms, and offers stay authored and must be updated coherently.

The previewed DA document now has boxed investment/banking Notice rows, SIPC/FDIC icon assets, and an Equal Housing Lender image. Explicit Logo rows with accessible labels are prepared in the authoring example. Icon tokens resolve to committed assets, avoiding large SVG payloads in DA. Introduction, numbered items, and closing text stay centered at a maximum width of 1180px, while the light background spans the full page width and bottom padding.

**Open:** Apply the explicit Logo rows prepared in the authoring example for accessible logo labels, and finish checking the selected campaign’s disclosure presentation and reference meaning. Native disclosure links retain accessible labels and target focus.

**Validation:** Earlier local checks confirmed native disclosure-link navigation, focus on the target item, and loading after the footer. The deployed scan confirmed all numeric references had matching targets. Existence of a target does not establish that its legal content supports the associated claim; the feature-banner reference 9 remains an authoring issue.

**Commits:** `9b42184`; reference helper in `287c4f7`; examples in `c9b25b8`.

## Bank rate API integration planned

**Status:** Planned. No block currently calls this endpoint:

`https://us.etrade.com/phx/pros/apicontent/init/bankRates`

The supplied example describes a GET request without a request body. Its data is under `campaign.offer.productList`; products must be selected by `productType`, not their array positions.

| Product type | Product | Relevant fields | Potential consumers |
| --- | --- | --- | --- |
| `3100` | Premium Savings | Tier `advertisedAPY`, `disclosureAPY`, and balance ranges | Savings base-rate copy, product card, corresponding disclosures |
| `3500` | Certificate of Deposit | Term `disclosureAPY`, `durationCode`, `durationDescription`; `calculatedFields.maxDisclosureAPY` and min/max terms | CD card, bank campaign/hero when applicable, corresponding disclosures |
| `4240` | Max-Rate Checking | Tier APYs and balance ranges | Future checking components when authored |

Use a shared service under `/scripts/` and one reusable request result per page. A proposed authoring contract uses named rate placeholders within authored content; placeholder syntax has not been implemented or agreed yet. Validate numeric values, tier/term selection, and the response's `errors` before substituting values. Keep display APY distinct from `finalRate`.

The example supplies a 3.75% savings base APY and a 4.40% CD maximum. It does not supply the 4.25% boosted savings APY, savings cash-bonus tiers, or brokerage calculator credits. Production displayed a 4.75% CD maximum during the October 6 scan, so the pasted response must not become a current-rate fixture without fresh verification. The response also lacks a rate effective date; do not assume the browser's current date is the rate's as-of date.

Before implementation, confirm a fresh payload, cross-origin access from the AEM preview/live domains, the required campaign source, and an agreed failure fallback. If direct cross-origin reads are unsupported, use an approved server integration. Coordinate any dynamic disclosure values with their effective dates and terms. Endpoint retrieval failed during this review; live response and CORS remain unverified.

## Remaining homepage fixes

The initial scan’s pricing, feature, CTA, superscript, separator, and footer-spacing findings are addressed by the component commits below. Remaining work is:

| Priority | Component | Remaining work | Change type |
| --- | --- | --- | --- |
| High | Footer privacy choices | Connect and validate a real consent-management provider; the authored URL remains the fallback | Integration |
| Medium | Campaign activation | Activate the saved DA-authored video and independent Banner Offer when requested; the IPO hero remains active | DA |
| Medium | Disclosure logos | Apply prepared accessible Logo rows and review remaining legal presentation | DA and validation |
| Medium | Final visual review | Complete a fresh full-page comparison for the selected campaign after deployment | Validation |
| Planned | Bank rates | Shared API service and authoring bindings after endpoint/source verification | Integration and DA |
| Deferred | Header services | Full `/nav` migration, search autocomplete, and explicit authenticated-state support | Integration and DA |

## Migration procedure for the original repository

1. Inspect the destination branch, existing component implementations, and local changes. Compare the source commits before choosing individual commits or file-level updates; some work may already exist on feature branches. Preserve unrelated edits. The original repository already contains `83379d1`, so do not reapply that cleanup blindly.
2. Port shared helpers and their consumers together. `scripts/actions.js` requires `styles/actions.css` and its stylesheet import. Cards require `scripts/card-content.js`. Page section/disclosure behavior requires `scripts/section-layout.js`, the changes in `scripts/scripts.js`, and shared CSS. Transfer icons referenced by authoring. Never edit vendored `scripts/aem.js`.
3. Transfer each component's final JS, CSS, README, and metadata files where present. Use the final `separator` name. Keep block styles scoped to the block; section/container rules belong in shared page styles. Do not introduce cross-block imports other than the supported fragment loader.
4. Recreate or update `/home`, `/nav`, `/footer`, and `/homepage-disclosures` in the destination DA organization/repository. Adapt links, metadata, media references, and tracking to that destination. Keep section breaks around dedicated separators and author Section Metadata on the neighboring content sections.
5. Read generated `.plain.html` before debugging decoration; autoblocks run before individual blocks. Preview with the destination's AEM CLI configuration. Validate omitted cells, missing optional actions, legacy content, and newly authored tables.
6. Run `npm run lint` and `git diff --check`. Check desktop, tablet, and narrow mobile views, plus search/navigation, dock focus, calculator controls, FAQ transitions, and disclosure anchors. Verify no missing assets, horizontal overflow, empty controls, or failed block loading.
7. Organize commits by behavior and include the required destination branch-preview link in a PR. Code merge and DA preview/publication are separate operations; verify both. For the original repo, follow its required `{branch}--etrade--AdobeDrago.aem.page/{path}` preview-link convention.
8. Update this record with destination commit references, DA documents, verification outcomes, and any remaining differences. Move a finding out of the open list only after its code/content change and relevant validation are complete.

Suggested homepage metadata to adapt for the destination:

| Metadata | Sandbox value |
| --- | --- |
| Template | `homepage` |
| Theme | `light` |
| Header Theme | `dark` |
| Nav Link Base | `https://us.etrade.com` while target pages are unavailable |
| Disclosures | `/homepage-disclosures` |

Retain the destination's real title and description. `Nav` and `Footer` can override the default `/nav` and `/footer` document paths. Remove the sandbox link base when local destination pages are ready.

## Validation record

| Scope | Recorded result |
| --- | --- |
| Code baseline through `c9b25b8` | `npm run lint` and `git diff --check` passed before pushing; working tree was clean |
| Local homepage with previewed DA markup | Widths 320, 390, 768, 1280, and 1440 checked; no horizontal overflow or missing block assets recorded |
| Deployed October 6 scan | Blocks loaded, no broken images found, and no horizontal overflow at 320px |
| Mobile calculator | End/Enter selected the highest open-ended range and preserved combobox focus |
| FAQ | Collapsed row sizing and single-question behavior matched production in direct comparison |
| Header search | Desktop logo remained visible; mobile search used the expected logo/login space |
| Prior local accessibility checks | Dock Escape/focus restoration, FAQ Enter activation, disclosure target focus, slider value text, and dark secondary-link contrast of 6.48:1 checked |
| Limits | Visual and targeted keyboard checks; no full WCAG certification or fresh Lighthouse/Core Web Vitals audit |

## Commit reference

| Commit | Change |
| --- | --- |
| `54f6618` | Responsive floating dock and imported sticky-CTA conversion |
| `c3e0ff5` | Logo assets |
| `723d7ab` / `50eb50c` | Themed header and authoring documentation |
| `11d86d3` / `c548bd8` | Calculator behavior, tiers, and authoring/accessibility documentation |
| `83379d1` | CSS selector-order and duplicate-heading cleanup, already present in the original repo |
| `acdb707` / `3825e41` | Authored hero and documentation |
| `164ddb6` / `d95abb5` | Divider implementation and rename to Separator |
| `280ba87` | Preserve authored navigation descriptions |
| `2940381` | Authored footer and icon assets |
| `f6a3ffb` | FAQ styling and accessible transitions |
| `ffd6d20` | Shared CTA normalization |
| `d8293b6` | Card and feature layout/authoring improvements |
| `287c4f7` | Homepage section/separator integration |
| `9b42184` | Separate authored disclosures |
| `97ea960` | Authored navigation base URL |
| `c9b25b8` | Copyable DA authoring examples |

Commit titles describe the work at the time; the open findings above govern remaining parity work. Merge commits are omitted from this reference to make individual change sets easier to locate.

## Ongoing updates

For each future homepage component change, update its entry with the problem addressed, final behavior, affected files/shared dependencies, required DA changes, relevant validation, and commit reference once available. Keep planned integration separate from implemented behavior. Update the dated findings and validation record after another deployed scan. Record porting results here rather than creating a competing migration log.

## October 6 parity work — presentation checkpoint

The original authored IPO hero was restored to `/home` in DA and previewed at the user's request for an immediate presentation. Its image, heading, copy, and CTA destinations came from the saved pre-change DA document. The savings campaign remains saved in `docs/home-authoring.html` for later activation; its video URL is authored in a Media row, and its offer is an independent `Banner Offer (light)` table, not hero content.

Uncommitted parity work includes outlined/shared actions, pricing introduction decoration, exact desktop/tablet/mobile pricing card dimensions, product typography, feature proportions, superscript-link normalization, footer icon/consent-manager support, and disclosure notice/logo styling. Desktop pricing cards measured 395.1875px, tablet cards 447.1875px, and the first mobile card 347.09375px, matching production measurements. These checks do not yet constitute the final full-page validation. Further parity work and final commit organization remain pending after the presentation checkpoint.

DA preview currently uses the restored IPO hero with the updated banking content and awards link. Footer privacy icon authoring is previewed. The new explicit Logo rows prepared for disclosure accessibility remain saved in the authoring example and have not yet been previewed. The privacy choices hook supports an installed OneTrust provider or a cancelable `privacy:open` integration event; without a configured provider, the authored privacy URL is the fallback. Live CMP and bank-rates API integration remain unverified and planned.


## Local preview repair after the presentation checkpoint

The local review server at port 3004 was serving saved homepage/disclosure HTML while proxying newer component code from port 3001. It now proxies the current AEM preview for all page content and assets. The original saved fixtures remain available under `/tmp/homepage-review` as backups. This is a development setup repair, not a deployment or a new block dependency. Both local addresses now return identical homepage and disclosure markup.

Hero Dark's new campaign-specific mobile action proportions, desktop action spacing, and section top spacing now apply only when the block has an authored video. The original image-based IPO hero retains its previous spacing and mobile CTA arrangement; its primary CTA no longer wraps its label onto two lines at 390px. The savings video and independent Banner Offer example remain saved for later activation.

CSS rule ordering in Banner Offer and Columns Feature was corrected, and a redundant tablet feature rule was removed. Full JavaScript/CSS lint and `git diff --check` pass. Browser checks at 320px, 390px, 768px, and 1280px found no horizontal overflow or broken images. Mobile keyboard selection updated the calculator to a $5,000 deposit and $150 credit; Enter opened and closed an FAQ with matching expanded state. The initial separator check measured wrapper width; the later artwork check below found and fixed a desktop width regression. The footer and original hero were visually checked. These checks validate the local repair, not completion of every remaining pixel-parity or accessibility audit item.

This checkpoint preceded commit organization; the final component commit group is recorded below.


## Separator desktop regression correction

**Problem:** The newer desktop homepage content-gutter rule also applied to dedicated separator wrappers. At a 1280px browser width, the actual separator artwork was only 1180px wide with a 10px left offset, despite the page content viewport being 1265px wide. This clipped the full-width transition and shifted the authored bend.

**Code:** Both homepage content-wrapper rules in `styles/styles.css` now exclude sections with `data-section-kind`. Dedicated Separator and Floating Dock sections keep the full-width layout supplied by `scripts/section-layout.js` and the existing special-section rules. The separator's authored height, bend location, 16px corners, and decorative accessibility behavior remain unchanged. No edits to the vendored EDS runtime were needed.

**DA:** Updated only the banking separator's First section color from `dark` to `#1c1a1e` in `gonsaje-vml/etrade-sandbox/home`; its 70% bend location remains authored. This matches the banking section's background and removes the visible color seam. Preview was updated; the IPO hero remains active. `docs/home-authoring.html` carries the same color correction for future transfer.

**Validation:** All four actual SVG/block bounds start at x=0 and equal the page content width at 390px, 768px, and 1280px browser widths. SVG viewBoxes match the rendered block width, and authored mobile/desktop heights are 45px/81px. Every first surface matches the preceding section. Full JavaScript/CSS lint and `git diff --check` pass. Screenshot proof records the first full-width transition. This check preceded the final component commit group recorded below.


## October 6 component commit group

| Commit | Scope |
| --- | --- |
| `49081ec` | Shared outlined/text CTA variants and sizing |
| `ba9498a` | Responsive card/feature/calculator layouts, pricing Columns, and full-width separators |
| `83d6a03` | DA-authored hero video, accessible description, and motion/playback controls |
| `ab78652` | Independent responsive Banner Offer light variant |
| `70fae51` | Full-width disclosure surface, notice/logo support, assets, and superscript-link normalization |
| `48fb921` | Footer spacing, authored privacy icon, and consent-manager hook |

The accompanying documentation commit includes the three readable DA examples, this migration record, and the AGENTS.md maintenance requirement. Formatting the HTML examples preserved their parsed content and attributes. Code and content deployment remain separate: the savings campaign example is saved but inactive, and the original IPO hero remains in the previewed homepage.

**Disclosure background validation:** On the 1280px local preview, the light disclosure surface starts at x=0 and spans the full 1265px content viewport. Introduction, numbered items, and closing wrappers remain capped at 1180px. No horizontal overflow was found. Full JavaScript/CSS lint and whitespace checks pass for the complete component changes.
