import assert from "node:assert/strict";
import test from "node:test";
import { outcomes, samples } from "./samples.js";

for (const [name, sample] of Object.entries(samples)) {
  test(name + " reconciles coverage, outcomes and evidence", () => {
    const ids = new Map(sample.comments.map((row) => [row[0], row]));
    assert.equal(ids.size, sample.comments.length);
    assert(ids.size > 0);
    for (const [, outcome, text] of ids.values()) {
      assert(outcomes.includes(outcome));
      assert(text.trim().length > 0);
    }
    const excluded = Object.values(sample.excluded);
    assert(excluded.every((value) => Number.isInteger(value) && value >= 0));
    assert(ids.size + excluded.reduce((sum, value) => sum + value, 0) <= 75);
    const findings = [...sample.themes, ...sample.questions];
    assert.equal(new Set(findings.map((finding) => finding.id)).size, findings.length);
    for (const finding of findings) {
      assert.equal(new Set(finding.support).size, finding.support.length);
      assert(finding.support.every((id) => ids.has(id)));
    }
    for (const theme of sample.themes) assert(theme.support.length >= 3);
    for (const question of sample.questions) {
      assert(question.support.includes(question.representative));
      assert(ids.get(question.representative)[2].includes(question.label));
    }
  });
}
