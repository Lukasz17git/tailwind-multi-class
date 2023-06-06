type TwObjectArgument = {
   [key: string]: string | TwObjectArgument;
};

function nestedObjectVariant(valueAsObject: TwObjectArgument, parentVariant?: string) {
   let result = ''
   for (const variant in valueAsObject) {
      const value = valueAsObject[variant]
      const fullVariant = parentVariant ? `${parentVariant}:${variant}` : variant

      if (typeof value === 'object') {
         result += nestedObjectVariant(value, fullVariant)
         continue
      }

      if (!value || typeof value !== 'string') continue

      let splited = value.split(' ')

      if (splited[0]) result += `${fullVariant}:${splited[0]}`;

      for (let index = 1; index < splited.length; index++) {
         if (!splited[index]) continue
         result += ` ${fullVariant}:${splited[index]}`
      }
   }

   return result
}

export function tw(...args: Array<string | TwObjectArgument>) {
   if (!args.length || !args[0]) return ''

   let result = typeof args[0] === 'object' ? nestedObjectVariant(args[0]) : args[0]

   for (let index = 1; index < args.length; index++) {
      const value = args[index]
      if (!value) continue
      result += ` ${typeof value === 'object' ? nestedObjectVariant(value) : args[index]}`
   }

   return result
}

export default tw