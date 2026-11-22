# Comment report portfolio demo

An interactive report preview with two original fictional examples. Switch samples, inspect the five sentiment outcomes, and expand any theme or question to see its supporting comments.

The public demo is a static site built with HTML, CSS and JavaScript. Its evidence and labels are authored for illustration. The separate local application uses Next.js, FastAPI, SQLite and CPU inference to process up to 75 newest top-level comments from a video. The public demo contains only static sample data.

## Run locally

Serve this directory over HTTP, then open the printed local URL. For example:

```text
python -m http.server 4173 --bind 127.0.0.1
```

Run `npm test` to verify the sample data. The demo has no install step.
