import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto(
    "http://dev.marathon.rplearn.net/momoka_yamazaki/customer/add.html",
  );
  await page.getByRole("textbox", { name: "会社名:" }).click();
  await page.getByRole("textbox", { name: "会社名:" }).fill("テスト株式会社");
  await page.getByRole("textbox", { name: "会社名:" }).press("Enter");
  await page.getByRole("textbox", { name: "会社名:" }).fill("テスト株式会社");
  await page.getByRole("textbox", { name: "業種:" }).click();
  await page.getByRole("textbox", { name: "業種:" }).fill("テスト");
  await page.getByRole("textbox", { name: "業種:" }).fill("テスト");
  await page.getByRole("textbox", { name: "連絡先:" }).click();
  await page.getByRole("textbox", { name: "連絡先:" }).fill("098-9871-0987");
  await page.getByRole("textbox", { name: "所在地:" }).click();
  await page.getByRole("textbox", { name: "所在地:" }).fill("テスト");
  await page.getByRole("textbox", { name: "所在地:" }).fill("テスト");
  await page.getByRole("button", { name: "送信" }).click();
  await page.getByRole("button", { name: "追加" }).click();
});
