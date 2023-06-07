// REGEX DEFINITIONS //
const anyLeftParenthesisWithWithoutSpace = /\w*[\s(]*/
const anyRightParenthesisWithWithoutSpace = /[\s)]*/
const anyFunction = /(\w+\([^)]*\))*/
const wordWithPosibleNegation = /!*\w*/
const anySpace = /\s*/
const andOrNullish = /(&&|\|{2}|\?{2})/
const questionMark = /\?/
const leftTernaryMatch = /(?<quote1>['"`])(?<letfContent>.*?)\k<quote1>/
const rigthTernaryMatch = /(?<quote2>['"`])(?<rightContent>.*?)\k<quote2>/
const doubleQuoteTernary = /\s*:\s*/

const regexPatternToRemoveAndOrNullish = new RegExp(
   anyFunction.source +
   anyLeftParenthesisWithWithoutSpace.source +
   wordWithPosibleNegation.source +
   anyRightParenthesisWithWithoutSpace.source +
   anySpace.source +
   andOrNullish.source,
   "gis")

const regexPatternToRemoveTernary = new RegExp(
   anyFunction.source +
   anyLeftParenthesisWithWithoutSpace.source +
   wordWithPosibleNegation.source +
   anyRightParenthesisWithWithoutSpace.source +
   anySpace.source +
   questionMark.source +
   anySpace.source +
   leftTernaryMatch.source +
   doubleQuoteTernary.source +
   rigthTernaryMatch.source,
   "gis")

// TW TRANSFORM //
export const twTransform = (classNameFunction: (...args: any[]) => string, functionName = classNameFunction.name) => (content: string) => {

   const regexPatternToFindTheFunctionInFiles = new RegExp(`(?<![a-zA-Z])${functionName}\\((?!\\))`, "gis") //perfect?

   const matches = [...content.matchAll(regexPatternToFindTheFunctionInFiles)]

   //transform all the content of the matched files to make it parseable for tailwind
   const contentWithParsedMatches = matches.reduce((parsedContent, matchedValue) => {

      const startingArgumentIndex = matchedValue.index as number + matchedValue[0].length;

      const extractedArgument = extractArgument(startingArgumentIndex, matchedValue.input as string)
      const argumentWithoutTemplateVariables = removeTemplateVariables(extractedArgument)
      const argumentWithoutAndOrNullish = removeAndOrNullish(argumentWithoutTemplateVariables)
      const argumentWithoutTernaryAndOrNullish = removeTernaries(argumentWithoutAndOrNullish)
      //add a function to remove comments?

      try {
         const viableTailwindOutput = classNameFunction.apply(null, eval(`[${argumentWithoutTernaryAndOrNullish}]`));
         const replacedContent = parsedContent.replace(extractedArgument, `'${viableTailwindOutput}'`)
         return replacedContent

      } catch (errorParsing) {
         console.error(`There is an error in the arguments provided to "${functionName}": ' + ${extractedArgument}`)
         return parsedContent;
      }
   }, content);

   return contentWithParsedMatches
};

const extractArgument = (initialIndex: number, content: string) => {
   let numberOfAdditionalNestedParentheses = 0

   for (let endIndex = initialIndex; endIndex < content.length; endIndex++) {
      const currentCharacter = content[endIndex]

      if (currentCharacter === ')') {
         if (!numberOfAdditionalNestedParentheses) return content.slice(initialIndex, endIndex)
         numberOfAdditionalNestedParentheses--
         continue
      }

      if (currentCharacter === '(') {
         numberOfAdditionalNestedParentheses++
         continue
      }
   }

   return content.slice(initialIndex, content.length)
}

const regexPatternToRemoveVariablesInTemplateLiterals = /\${.*?}/gis


const removeTemplateVariables = (extractedArgument: string) => extractedArgument.replace(regexPatternToRemoveVariablesInTemplateLiterals, '').trim()

const removeAndOrNullish = (extractedArgument: string) => extractedArgument.replace(regexPatternToRemoveAndOrNullish, '').trim()

const removeTernaries = (argumentWithoutAndOrNullish: string) => {
   let withoutTernaries = argumentWithoutAndOrNullish
   if (argumentWithoutAndOrNullish.length > 4 && argumentWithoutAndOrNullish.includes('?') && argumentWithoutAndOrNullish.includes(':')) {
      withoutTernaries = argumentWithoutAndOrNullish.replace(regexPatternToRemoveTernary, '`$<letfContent> $<rightContent>`').trim()
   }
   return withoutTernaries
}