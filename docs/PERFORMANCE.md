Slot performance is currently slow because of JSON.stringify / JSON.parse for children. Compiling is now faster due to 1-pass bottom up.

It is possible to resolve slots, but it might require 2-pass pre-compilation to properly link the slots. We would then copy the nodes from usage point and replace the slot before actually building the page.

Estimate under realistic conditions (small to medium page/component trees):

### 1. Bottom-up with `JSON.parse(slot)` at runtime:

* **Compile**: 1–2 ms
* **Runtime per slot**: 0.02–0.1 ms per `JSON.parse` (typical 0.5–2 KB HTML)
* **Total runtime cost**: \~1–5 ms for 50–100 slots

### 2. Two-pass with direct string injection:

* **Compile**: 3–10 ms (depending on tree depth and slot tracking)
* **Runtime per slot**: 0 ms (already resolved string)
* **Total runtime cost**: near-zero

### Tradeoff summary:

| Pass Type | Compile Time | Runtime Cost | Notes                     |
| --------- | ------------ | ------------ | ------------------------- |
| 1-pass    | Low          | Medium       | Simpler, slower execution |
| 2-pass    | Higher       | Near-zero    | More complex, faster use  |

For most UIs: difference is minor (<10 ms total). Only relevant if you’re compiling very large trees frequently or need high runtime throughput (e.g., server-side pre-rendering at scale).
