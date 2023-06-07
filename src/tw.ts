type TwObjectArgument = {
   [key: string]: string | TwObjectArgument;
};

function nestedObjectVariant(valueAsObject: TwObjectArgument, parentVariant?: string) {
   let result = ''
   for (const variant in valueAsObject) {
      const value = valueAsObject[variant]
      const fullVariant = parentVariant ? `${parentVariant}:${variant}` : variant

      if (typeof value === 'object') {
         if (result) result += ' '
         result += nestedObjectVariant(value, fullVariant)
         continue
      }

      if (!value || typeof value !== 'string') continue

      let splited = value.split(' ')

      if (splited[0]) {
         if (result) result += ' '
         result += `${fullVariant}:${splited[0]}`
      }

      for (let index = 1; index < splited.length; index++) {
         if (!splited[index]) continue
         result += ` ${fullVariant}:${splited[index]}`
      }
   }

   return result
}

export function tw(...args: Array<string | TwObjectArgument | boolean | null | undefined | number>) {

   let result = ''

   if (!args.length || args.length === 1 && !args[0]) return result

   for (let index = 0; index < args.length; index++) {
      const value = args[index]

      if (!value) continue

      if (typeof value === 'string') {
         result += result ? ` ${value}` : value
      }

      if (typeof value === 'object') {
         const nestedResult = nestedObjectVariant(value)
         if (nestedResult) result += result ? ` ${nestedResult}` : nestedResult
      }
   }
   return result
}

export default tw