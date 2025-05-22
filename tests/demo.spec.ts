import { test, expect } from '@playwright/test'

test.describe('', () => {
  const sections = [
    { name: 'Cursos', url: '/cursos', title: 'Cursos' },
    { name: 'Udemy', url: '/udemy', title: 'Udemy' },
    { name: 'Recursos', url: '/recursos', title: 'Recursos' }
  ]

  for (const section of sections) {
    test(`Validar la redicción a la sección: ${section.name}`, async ({ page }) => {
      await test.step('Estando en la página de inicio', async () => {
        await page.goto('https://www.freerangetesters.com/')
        await expect(page).toHaveTitle('Free Range Testers')
      })

      await test.step(`Haciendo click en: ${section.name}`, async () => {
        page.locator('#page_header').getByRole('link', { name: section.name, exact: true }).click()
        await page.waitForURL(`**${section.url}`)
      })

      await test.step(`Validando el título: ${section.title}`, async () => {
        await expect(page).toHaveTitle(section.title)
      })
    })
  }
})
