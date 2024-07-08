import { expect } from '@playwright/test';
import { E2EAdapterPlaywright, E2EBalDate, test } from '@baloise/ds-playwright';

test('has title', async ({ page }) => {
  await page.goto('/');
  await page.waitForChanges()

  expect(await page.locator('h1').innerText()).toContain('Welcome');
});


// test('check event', async ({ page }) => {
//   await page.goto('/');
//   const balChange = await page.locator('bal-date').spyOnEvent('balChange');

//   const dateEl = page.getByLabel('Date')
//   await dateEl.focus()
//   await page.keyboard.type('2.3.2024')
//   await page.keyboard.press('Escape');
//   await dateEl.blur()

//   await expect(dateEl).toHaveValue('02.03.2024')
//   await expect(balChange).toHaveReceivedEvent();
// });

test('select today', async ({ page }) => {
  await page.goto('/');

  const dateEl = page.getByLabel('Date')

  // await dateEl.fill('2.3.2024')
  await dateEl.focus()
  await page.keyboard.type('2.3.2024')

  await expect(dateEl).toHaveValue('02.03.2024')
});


// test('select today', async ({ page }) => {
//   const e2e = new E2EAdapterPlaywright(page)
//   const e2eDateEl = new E2EBalDate(e2e)

//   await e2e.goto('/')
//   await e2eDateEl.getByLabel('Date')
//   await e2eDateEl.setValue('2.3.2024')

//   await e2eDateEl.expectToHaveValue('02.03.2024')
// });

// test('a11y', async ({ page }) => {
//   const e2e = new E2EAdapterPlaywright(page)

//   await e2e.goto('/')
//   await e2e.expectA11y()
// });
