import { BaseArticleContentBlock } from './BaseArticleContentBlock';
import { expect } from '@playwright/test';

export class AuthorsArticleContentBlock extends BaseArticleContentBlock {
  get #header() { return this.container.locator('.banner .container'); }
  get #meta()   { return this.#header.locator('.article-meta').first(); }
  get #title()  { return this.#header.locator('h1'); }

  get #editBtn()   { return this.#meta.getByRole('link',   { name: /Edit Article/i }); }
  get #deleteBtn() { return this.#meta.getByRole('button', { name: /Delete Article/i }); }

  async assertTitleIs(text) {
    await this.step('Assert article title', async () => {
      await expect(this.#title).toHaveText(text);
    });
  }

  async assertEditButtonVisible() {
    await this.step('Assert Edit button visible (banner meta)', async () => {
      await expect(this.#editBtn).toBeVisible();
    });
  }

  async clickEditButton() {
    await this.step('Click Edit button (banner meta)', async () => {
      await this.#editBtn.click();
    });
  }

  async assertDeleteButtonVisible() {
    await this.step('Assert Delete button visible (banner meta)', async () => {
      await expect(this.#deleteBtn).toBeVisible();
    });
  }

  async clickDeleteButton() {
    await this.step('Click Delete button (banner meta)', async () => {
      await this.#deleteBtn.click();
    });
  }

  async assertAuthorControlsNotVisible() {
    await this.step('Assert no author controls in banner meta', async () => {
      await expect(this.#editBtn).toHaveCount(0);
      await expect(this.#deleteBtn).toHaveCount(0);
    });
  }

  async assertAuthorIs(username) {
    await this.step('Assert author name in banner meta', async () => {
      await expect(this.#meta.locator('.info .author')).toHaveText(username);
    });
  }
}
