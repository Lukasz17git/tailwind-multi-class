
# TAILWIND MULTI CLASS

**Easy, performant** and **versatile.**

An easy way to write Tailwind CSS classes in multiples lines, either as strings or as object with keys as tailwind variants.

### Advantages

- Accepts any ammount of arguments.
- Accepts any type of arguments.
- Accepts any type of expressions, like:
  - &&, ||, ??, Ternary Operator
- Supports Single quotes, Double quotes and Backticks.
- Accepts functions, equations, and so on.
- Multiline support.
- Nested variant key support.

### Rules

- Expresions have to be written between parentheses.
- Cant use ternaries after ternaries (A ? B ? C : D).
- Ternaries must return strings in both cases.
- Using backticks inside ternaries is forbiden.
  - A ? B : C
  - B and C cant have backticks, neither cant be written with backticks.

### Usecase example

```jsx
<div
   className={tw(
      'rounded-md w-40 h-10 p-4',
      !index && 'bg-opacity-50',
      (pageIndex === index) ? 'bg-pink-500' : 'bg-orange-500',
      { dark: (pageIndex === index) ? 'bg-pink-300' : 'bg-orange-300' }
   )}
/>
// Injected classes: rounded-md w-40 h-10 p-4 bg-opacity-50 bg-pink-500 bg-orange-500 bg-pink-300 bg-orange-300
```

### Setup

```js
// file = tailwind.config.js
import { tw, twTransform } from 'tailwind-multi-class'

export default {
   content: {
      files: ["./index.html","./src/**/*.{js,ts,jsx,tsx}",], //your usual path for tailwind
      transform: {
         DEFAULT: twTransform(tw)
      }
   },
   /** REST OF YOUR TAILWIND CONFIG */
}
```
