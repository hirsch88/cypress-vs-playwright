import type { Page, TestInfo } from '@playwright/test';
import { E2EPageOptions } from '../playwright-declarations';
import { waitForChanges } from './wait-for-changes';

/**
 * This is an extended version of Playwright's
 * page.goto method. In addition to performing
 * the normal page.goto work, this code also
 * automatically waits for the Stencil components
 * to be hydrated before proceeding with the test.
 */
export const goto = async (
  page: Page,
  url: string,
  testInfo: TestInfo,
  originalFn: typeof page.goto,
  options?: E2EPageOptions
) => {
  const gotoResult = await originalFn(url, options)

  await waitForChanges(page)

  await page.waitForFunction(
    (selector: string) => {
      const element = document.querySelector(selector);
      return element && element.getAttribute('ready') !== null;
    },
    'bal-app',
    { timeout: 10000 }
  );


  await page.waitForFunction(
    () => {
      return window.BaloiseDesignSystem !== null;
    },
    { timeout: 10000 }
  );

  await page.evaluate(() => {
    window.BaloiseDesignSystem.config.logger.event = true
    window.BaloiseDesignSystem.config.logger.components = []
  })

  return gotoResult;
};
