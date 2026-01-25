import { expect, test } from '@playwright/test'

test('Welcome docs', async ({ page }) => {
  await page.goto('iframe.html?id=welcome--docs')
  const title = page.getByRole('heading', {
    name: 'Welcome to Storybook',
    level: 1,
  })
  await expect(title).toBeVisible()
})
