import { test, expect } from '@playwright/test'

const REPO = 'repo-demo-pw'
const USER = 'sebastian-asm'

// se ejecuta siempre antes de cada test
test.beforeAll(async ({ request }) => {
  const result = await request.post('/user/repos', { data: { name: REPO } })
  expect(result.ok()).toBeTruthy()
})

// se ejecuta siempre después de cada test
test.afterAll(async ({ request }) => {
  const result = await request.delete(`/repos/${USER}/${REPO}`)
  expect(result.ok()).toBeTruthy()
})

test('Crear Issues en el repositorio', async ({ request }) => {
  const newIssue = await request.post(`/repos/${USER}/${REPO}/issues`, {
    data: {
      title: 'Issue de prueba',
      body: 'Este es un issue de prueba creado desde Playwright'
    }
  })
  expect(newIssue.status()).toBe(201)

  const issues = await request.get(`/repos/${USER}/${REPO}/issues`)
  expect(issues.ok()).toBeTruthy()
  expect(await issues.json()).toContainEqual([
    expect.objectContaining({
      title: 'Issue de prueba',
      body: 'Este es un issue de prueba creado desde Playwright'
    })
  ])
})
