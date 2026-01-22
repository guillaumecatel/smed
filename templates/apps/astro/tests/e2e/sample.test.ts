import { expect, test } from '@playwright/test'

import config from '@/config'

test('has title', async ({ page }) => {
  await page.goto('')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(new RegExp(config.name))
})

test('get about link', async ({ page }) => {
  await page.goto('')

  // Click the about link.
  await page.getByRole('link', { name: 'About' }).click()

  // Expects page to have a heading with the name of About us page.
  await expect(page.getByRole('heading', { name: 'About us' })).toBeVisible()
})
