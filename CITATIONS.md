# Citation Standard

How a quotation is presented in this library. The pattern is not invented here
— it is the one already used throughout
[Quotes_regarding_sabbath_change_catholic_and_protestant.md](Quotes_regarding_sabbath_change_catholic_and_protestant.md),
written down so the rest of the library can be measured against it and so a
script can check conformance.

The governing principle: **a reader must be able to check the claim without
taking the author's word for it.** Everything below follows from that.

---

## The five parts

An entry has five parts. Only the first three are always required.

### 1. The work, identified precisely

Author, title, edition, date, and the internal locus — chapter, question,
article, canon, section — not just a page number. A page number alone breaks
the moment someone consults a different printing.

```markdown
3. **St. Thomas Aquinas, *Summa Theologica***, II-II, Q. 122, Art. 4,
   Reply to Objection 4
```

### 2. The quotation, verbatim

In quotation marks, word for word, spelling and punctuation as printed.

- Mark every omission with an ellipsis. Never let an ellipsis remove a
  qualification.
- Bold may be used for emphasis **within** a quote, but the emphasis must be
  disclosed as the author's if it is not in the original.
- If the passage is long, quote the whole relevant sentence rather than a
  fragment that reads differently in isolation.

```markdown
- **Quote**: "In the New Law the observance of the Lord's day took the place
  of the observance of the Sabbath, **not by virtue of the precept** but by
  the institution of the Church and the custom of Christian people."
```

### 3. The source document link

A link to the file that settles it, with a `#page=` anchor and, where the PDF
has a text layer, a `&search=` term so the viewer highlights the passage on
arrival.

```markdown
- 📄 **Source Document**: [View Original — The Catholic Mirror, 23 Dec 1893](Supporting%20Documents/Quote_1-The_Christian_Sabbath_The_Catholic_Mirror_23_Dec_1893.pdf#page=31&search=changed%20the%20day%20from%20Saturday%20to%20Sunday)
```

Rules:

- `#page=` is the **PDF page**, not the printed page number. Scans usually
  differ; the anchor must land the reader on the passage.
- URL-encode the path. Spaces become `%20`.
- The `search=` term must be a short, distinctive phrase that actually appears
  in the text layer. Verify it — OCR often mangles long strings.
- Files above ~60 MB live in `EXTERNAL_SOURCE_DOCS` in `assets/app.js` and
  are linked from Google Drive instead. See `.gitignore`.

### 4. Significance — kept separate from the quote

What the quotation establishes, in its own labelled field, so interpretation is
never mistaken for the source's own words.

```markdown
- **Significance**: The most authoritative theologian in Catholic history
  states that Sunday replaced the Sabbath "not by virtue of the precept" —
  that is, not by any divine command.
```

### 5. Note — where the source is weak, wrong, or cuts against us

**This field is what makes the collection defensible.** Use it whenever:

- the source contains a factual error, even one that helps the argument
- the source qualifies or limits the claim
- the attribution is contested, or the text is disputed
- the quotation is commonly circulated in a form that does not match the
  original

```markdown
- **Note**: The catechism incorrectly dates the Council of Laodicea to
  336 CE; the actual date was approximately 363-364 CE. This historical error
  in the Catholic source does not change the admission that the Church, not
  Scripture, changed the Sabbath.
```

The existing quotes document also does this by quoting onward past the useful
sentence — the Aquinas entry continues into "the prohibition to work on the
Lord's day is **not so strict**", which weakens a strict-parallel reading. That
is the standard: **quote the clause that costs you something.** A collection
that only ever quotes helpful halves is not evidence, and a reader who finds
the missing half elsewhere stops trusting everything around it.

---

## Scripture and Ellen White

Both have a lookup built into the site, so they need a reference rather than a
source link.

- **Scripture** — book, chapter and verse in the running text. The reader
  clicks any bold reference to compare 31 translations offline.
- **Ellen White** — standard abbreviation and page, e.g. `GC 578`. Rendered as
  a clickable citation that opens the page from this site's own copy.

State the translation when the wording carries the argument.

---

## What does not count as a source

- A quotation attributed only to a person, with no work named.
- A work named with no page, canon, or section.
- A secondary source quoting a primary one, where the primary is available.
  Cite the primary; the whole point of `Supporting Documents/` is that we hold
  it.
- A page number with no accompanying quotation — a claim about what a source
  says, without the words.
- A widely-repeated quotation whose original cannot be located. If it cannot
  be traced, it does not go in, however often it is cited elsewhere.

---

## Checking conformance

`scripts/verify_citations.py` extracts every quotation with its claimed source
and page, searches the PDFs in `Supporting Documents/`, and sorts the results:

| Verdict | Meaning |
|---|---|
| `confirmed` | phrase found on the cited page |
| `wrong-page` | phrase found in the file, on a different page |
| `not-found` | phrase not in the file's text layer |
| `no-source` | quotation carries no source link to check |

`not-found` is not proof of error — the scans are OCR'd and matching is
imperfect. It means *a human has to look*. Run it after editing any document
that cites a source document:

```
python scripts/verify_citations.py            # whole library
python scripts/verify_citations.py --doc Commandments.md
```
