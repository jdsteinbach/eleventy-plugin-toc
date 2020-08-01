const ParseOptions = (userOptions, defaultOptions) => {
  let safeOptions = {}
  try {
    safeOptions = JSON.parse(userOptions)
  } catch (e) {
    safeOptions = {}
  }

  return Object.assign({}, defaultOptions, safeOptions)
}

module.exports = ParseOptions
