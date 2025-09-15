import { test } from '../../_fixtures/fixtures';
import { expect } from '@playwright/test';
import { ExternalHomePage } from '../../../src/ui/pages/home/ExternalHomePage';
import { ExternalViewArticlePage } from '../../../src/ui/pages/article/ExternalViewArticlePage';
import { createArticle } from '../../../src/ui/actions/articles/createArticle';
import { signUpUser } from '../../../src/ui/actions/auth/signUpUser';
import {
  waitUntilArticleIndexed,
  waitForArticleInFeedUI,
} from '../../../src/common/helpers/waiters/feedWaiters'

test.use({ contextsNumber: 2, usersNumber: 1 });

test.beforeEach(async ({ pages, users, articleWithoutTags }) => {
  await signUpUser(pages[0], users[0], 1);
  await createArticle(pages[0], articleWithoutTags, 1);
  await waitUntilArticleIndexed(pages[0], articleWithoutTags.title); // gate on backend readiness
});

// eslint-disable-next-line max-len
test('Not logged in user can open the article page created by other user from the Global Feed section', async ({
  pages,
  articleWithoutTags,
  users,
}) => {
  const page = pages[1];
  const guestHome = new ExternalHomePage(page, 2);

  await guestHome.open();
  await guestHome.globalFeed.open();

  await waitForArticleInFeedUI(page, articleWithoutTags.title); // UI-ready

  await guestHome.globalFeed.article(articleWithoutTags.title).open();

  const viewArticle = new ExternalViewArticlePage(page, 2);
  await viewArticle.article.assertTitleIsVisible(articleWithoutTags.title);
  await viewArticle.article.assertTextIsVisible(articleWithoutTags.text);
  await viewArticle.article.assertAuthorNameIsVisible(users[0].username);
});
