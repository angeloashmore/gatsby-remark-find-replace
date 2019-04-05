import visit from 'unist-util-visit'
import escapeStringRegexp from 'escape-string-regexp'

module.exports = ({ markdownAST }, { replacements = {}, prefix = '%' }) => {
  // Attaches prefix to the start of the string.
  const attachPrefix = str => (prefix || '') + str

  // Removes prefix from the start of the string.
  const stripPrefix = str =>
    prefix ? str.replace(RegExp(`^${prefix}`), '') : str

  // RegExp to find any replacement keys.
  const regexp = RegExp(
    '(' +
      Object.keys(replacements)
        .map(key => escapeStringRegexp(attachPrefix(key)))
        .join('|') +
      ')',
    'g',
  )

  const replacer = (_match, name) => replacements[stripPrefix(name)]

  visit(markdownAST, 'text', node => {
    const processedText = node.value.replace(regexp, replacer)
    node.value = processedText
  })

  return markdownAST
}
