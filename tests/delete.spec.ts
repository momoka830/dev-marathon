import { test, expect } from "@playwright/test";

test("顧客削除", async ({ page }) => {
  await page.goto(
    "http://dev.marathon.rplearn.net/momoka_yamazaki/customer/list.html",
  );
  await page.getByRole("link", { name: "テスト株式会社" }).click();
  page.once("dialog", (dialog) => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.accept().catch(() => {});
  });
  await page.getByRole("button", { name: "顧客情報を削除" }).click();
  // 一覧に戻ったことを確認
  await expect(page).toHaveURL(/list\.html/);
  // 削除した顧客が一覧から消えていることを確認
  await expect(
    page.getByRole("link", { name: "テスト株式会社" }),
  ).not.toBeVisible();
});
