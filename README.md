
# TAILWIND MULTI CLASS

Easy, performant and versatile way to write tailwind classes in multiples lines, either as strings or as object with keys as tailwind variants.


What you can:
 - Any ammount of arguments.
 - Accepts any type of arguments.
 - Accepts any type of expressions, like &&, ||, ?? and Ternary.
 - Accepts functions, equations, and so on.
 - Multiline support.
 - Nested variant key support.

Rules: 
 - Expresions have to be written between parentheses.
 - Cant use ternaries after ternaries (A ? B ? C : D).
 - Ternaries must return strings in both cases.
 - Using backticks inside ternaries is forbiden.
   - A ? B : C
   - B and C cant have backticks, neither cant be written with backticks.

