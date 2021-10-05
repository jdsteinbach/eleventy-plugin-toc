const ParseOptions = require('./ParseOptions')

const defaults = {
  tags: ['h2', 'h3', 'h4'],
  wrapper: 'nav',
  wrapperClass: 'toc',
  wrapperLabel: undefined,
  ul: false,
  flat: false,
}

const overrides = [
  {
    key: 'tags',
    value: ['h2', 'h3'],
    expected: {
      tags: ['h2', 'h3'],
      wrapper: 'nav',
      wrapperClass: 'toc',
      wrapperLabel: undefined,
      ul: false,
      flat: false,
    },
  },
  {
    key: 'wrapper',
    value: 'div',
    expected: {
      tags: ['h2', 'h3', 'h4'],
      wrapper: 'div',
      wrapperClass: 'toc',
      wrapperLabel: undefined,
      ul: false,
      flat: false,
    },
  },
  {
    key: 'wrapperClass',
    value: 'contents',
    expected: {
      tags: ['h2', 'h3', 'h4'],
      wrapper: 'nav',
      wrapperClass: 'contents',
      wrapperLabel: undefined,
      ul: false,
      flat: false,
    },
  },
  {
    key: 'wrapperLabel',
    value: 'Table of Contents',
    expected: {
      tags: ['h2', 'h3', 'h4'],
      wrapper: 'nav',
      wrapperClass: 'toc',
      wrapperLabel: 'Table of Contents',
      ul: false,
      flat: false,
    },
  },
  {
    key: 'ul',
    value: true,
    expected: {
      tags: ['h2', 'h3', 'h4'],
      wrapper: 'nav',
      wrapperClass: 'toc',
      wrapperLabel: undefined,
      ul: true,
      flat: false,
    },
  },
  {
    key: 'flat',
    value: true,
    expected: {
      tags: ['h2', 'h3', 'h4'],
      wrapper: 'nav',
      wrapperClass: 'toc',
      wrapperLabel: undefined,
      ul: false,
      flat: true,
    },
  },
]

overrides.forEach(o => {
  const {key, value, expected} = o
  test(`override ${key}`, () => {
    expect(
      ParseOptions(
        {
          [key]: value,
        },
        defaults
      )
    ).toStrictEqual(expected)
  })
})
