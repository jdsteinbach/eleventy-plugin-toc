const ParseOptions = (userOptions, defaultOptions) => {
  let safeDefaultOptions = {}
  let safeUserOptions = {}

  if (defaultOptions && defaultOptions.constructor === {}.constructor) {
    safeDefaultOptions = defaultOptions
  }

  if (userOptions && typeof userOptions === 'string') {
    try {
      safeUserOptions = JSON.parse(userOptions)
    } catch (e) {} // eslint-disable-line
  } else if (userOptions && userOptions.constructor === {}.constructor) {
    safeUserOptions = userOptions
  }

  return Object.assign({}, safeDefaultOptions, safeUserOptions)
}

module.exports = ParseOptions
