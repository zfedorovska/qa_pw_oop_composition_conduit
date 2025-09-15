import { expect, request } from '@playwright/test';

export async function waitUntilArticleIndexed(page, title, timeout = 15_000) {
  const origin = new URL(page.url()).origin;
  const api = await request.newContext({ baseURL: origin });

  await expect
    .poll(async () => {
      const res = await api.get('/api/articles?limit=20&offset=0');
      if (!res.ok()) return 0;
      const data = await res.json();
      return data?.articles?.some(a => a.title === title) ? 1 : 0;
    }, { timeout })
    .toBe(1);

  await api.dispose();
}

export async function waitForArticleInFeedUI(page, title, timeout = 20_000) {
  await expect
    .poll(async () => {
      await page.reload({ waitUntil: 'domcontentloaded' });
      return page
        .locator('.article-preview h1')
        .filter({ hasText: title })
        .count();
    }, { timeout })
    .toBeGreaterThan(0);
}
