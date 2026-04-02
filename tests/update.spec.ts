import { test, expect } from "@playwright/test";

test("顧客編集", async ({ page }) => {
  // テストデータを追加
  await page.goto(
    "http://dev.marathon.rplearn.net/momoka_yamazaki/customer/add.html",
  );
  await page.getByRole("textbox", { name: "会社名:" }).fill("テスト株式会社");
  await page.getByRole("textbox", { name: "業種:" }).fill("テスト");
  await page.getByRole("textbox", { name: "連絡先:" }).fill("098-9871-0987");
  await page.getByRole("textbox", { name: "所在地:" }).fill("テスト");
  await page.getByRole("button", { name: "送信" }).click();
  await page.getByRole("button", { name: "追加" }).click();
  await page.waitForURL("**/list.html");

  // 一覧で編集
  await page
    .getByRole("row", { name: "テスト株式会社" })
    .getByRole("link")
    .click();
  await page.getByRole("button", { name: "編集" }).click();
  await page.waitForURL("**/update.html**");
  await page.waitForLoadState("networkidle");
  await page.getByRole("textbox", { name: "会社名:" }).fill("テスト編集済み");
  await page.getByRole("button", { name: "更新" }).click();
  await page.waitForURL("**/detail.html**");
  await page.getByRole("button", { name: "リストに戻る" }).click();
  await page.waitForURL("**/list.html");

  // 編集後の名前が一覧に表示されていることを確認
  await expect(page.getByRole("link", { name: "テスト編集済み" })).toBeVisible();
});
