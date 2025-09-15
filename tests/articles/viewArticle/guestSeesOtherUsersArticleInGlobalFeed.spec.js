import { test } from '../../_fixtures/fixtures';
import { ExternalHomePage } from '../../../src/ui/pages/home/ExternalHomePage';
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
  await waitUntilArticleIndexed(pages[0], articleWithoutTags.title);
});

test('Not logged in user can view the article created by other user in the Global Feed section', async ({
  pages,
  articleWithoutTags,
}) => {
  const page = pages[1];
  const guestHome = new ExternalHomePage(page, 2);

  await guestHome.open();
  await guestHome.globalFeed.open();

  await waitForArticleInFeedUI(page, articleWithoutTags.title);

  await guestHome.globalFeed.article(articleWithoutTags.title).assertVisible();
});
