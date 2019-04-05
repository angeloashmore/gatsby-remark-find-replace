# gatsby-remark-find-replace

Gatsby remark plugin to find and replace text.

## Install

```sh
npm install --save gatsby-remark-find-replace
```

## How to use

```js
// In your gatsby-config.js
plugins: [
  'gatsby-plugin-sharp',
  {
    resolve: 'gatsby-transformer-remark',
    options: {
      plugins: [
        {
          resolve: 'gatsby-remark-find-replace',
          options: {
            // List your find and replace values. Both values must be strings.
            // This is required.
            replacements: {
              COMPANY: 'My Company',
              COPYRIGHT: `Copyright ${new Date().getFullYear()} My Company`,
            },

            // By default, find values are prefixed to reduce the chances of
            // conflicting with real content. You can change, or disable, the
            // prefix here.
            prefix: '$MD_',
          },
        },
      ],
    },
  },
]
```

## Example

```md
# My Special Blog Post

Welcome to \$MD_COMPANY's new blog! Please do not copy this post.

\$MD_COPYRIGHT
```

Turns into…

```md
# My Special Blog Post

Welcome to My Company's new blog! Please do not copy this post.

Copyright 2019 My Company
```
