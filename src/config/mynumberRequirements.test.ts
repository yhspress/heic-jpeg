import { describe, expect, it } from "vitest";
import { mynumberRequirements } from "./mynumberRequirements";

describe("マイナンバーカード申請用の設定", () => {
  it("JPEG・RGB・公式の範囲を持つ", () => {
    expect(mynumberRequirements.acceptedFormats).toEqual(["image/jpeg"]);
    expect(mynumberRequirements.colorMode).toBe("RGB");
    expect(mynumberRequirements.minBytes).toBe(20 * 1024);
    expect(mynumberRequirements.maxBytes).toBe(7 * 1024 * 1024);
    expect(mynumberRequirements.widthMin).toBe(480);
    expect(mynumberRequirements.widthMax).toBe(6000);
    expect(mynumberRequirements.officialSourceUrl).toMatch(/^https:\/\//);
  });
});
