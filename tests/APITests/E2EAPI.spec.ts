import { expect, test } from '@playwright/test'

const REPO = 'repo-demo-pw'
const USER = 'sebastian-asm'

// el contexto de la solicitud es reutilizado en todos los tests
let apiContext: any

test.beforeAll(async ({ playwright }) => {
  apiContext = await playwright.request.newContext({
    baseURL: 'https://api.github.com',
    extraHTTPHeaders: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      Authorization: `Bearer _`
    }
  })
})

test.afterAll(async () => await apiContext.dispose())

test('El útlimo issue creado es el primero en la lista', async ({ page }) => {
  const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: 'Issue de prueba',
      body: 'Este es un issue de prueba creado desde Playwright'
    }
  })
  expect(newIssue.ok()).toBeTruthy()

  await page.goto(`https://github.com/${USER}/${REPO}/issues`)
  const firstIssue = page.getByTestId('issue-pr-title-link').first()
  await expect(firstIssue).toHaveText('Issue de prueba')
})
