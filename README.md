# 2E2 Testing con Playwright

Hay herramientas que permiten probar de principio a fin los flujos de usuarios de manera rápida y robusta (por ejemplo, un login, checkout de un carrito, etc). **Playwright** permite testear todo en uno, desde la UX hasta la capa de integracion sin necesidad de herramientas externas.

### Beneficios

![Beneficios](public/images/beneficios.png)

### Desafíos

![Desafíos](public/images/desafios.png)

## Locators (Selectores)

- `getByRole`: buscar por rol, ideal para botones, enlaces, encabezados y más.
- `getByText`: seleccionar un elemento web por su contenido textual (podría presentar problemas en tener texto repetido).
- `getByLabel`: busca elementos asociados a una etiqueta `<label>`.
- `getByPlaceholder`: busca por el placeholder en los elementos `<input>`. Tanto `getByLabel` como este son utiles para seleccionar campos de formularios.
- `getByAltText`: buscar por el atributo _alt_ en una imagen.
- `getByTitle`: buscar por el atributo _title_ en una etiqueta.
- `getByTestId`: enfocado directamente para el testing, permite buscar por el atributo _data-testid_ por ejemplo: `<button data-testid="botonDemoId">Botón</button>`
- `locator (css y xpath)`: selector no recomendado

## Filtros

- `exact`: permite buscar una expresión de forma exacta, por ejemplo: `page.getByText('mensaje de prueba', { exact: true })`
- `.filter()`: filtrar varios elementos para que de ese filtrado obtener una específico, por ejemplo:

```js
page.getByRole('listitem).filter({ hasText: 'Producto 1' }).getByRole('button', { name: 'Agregar al carrito' }).click()
```

Tambíen, este filtro permite buscar por otro locator, por ejemplo:

```js
page.getByRole('listitem).filter({ has: page.getByRole('heading', { name: 'Título' }) }).getByRole('button', { name: 'Agregar al carrito' }).click()
```
