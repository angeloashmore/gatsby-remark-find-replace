import visit from 'unist-util-visit'

const escapeRegExp = str =>
  str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&')

export default ({ markdownAST }, { definitions, prefix = 'MD_' }) => {
  const SCOPED_ABBR_RE = RegExp(
    '\\((' +
      Object.keys(definitions)
        .map(key => escapeRegExp(key))
        .join('|') +
      ')\\)',
    'g',
  )

  const replaceFn = (match, name) => definitions[name.toLowerCase()]

  visit(markdownAST, 'text', node => {
    const processedText = node.value.replace(SCOPED_ABBR_RE, replaceFn)
    node.value = processedText
  })

  return markdownAST
}
