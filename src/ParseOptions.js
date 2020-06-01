const ParseOptions = (userOptions, defaultOptions) => {
  let safeOptions = {}
  try {
    if (typeof userOptions === 'string') {
      safeOptions = JSON.parse(userOptions)
    } else if (typeof userOptions === 'object') {
      safeOptions = userOptions
    }
  } catch (e) {
    safeOptions = {}
  }

  return Object.assign({}, defaultOptions, safeOptions)
}

module.exports = ParseOptions
