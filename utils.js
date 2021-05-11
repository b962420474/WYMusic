const fs = require('fs')
const path = require('path')

const findSync = function (startPath) {
  const result = []
  const files = fs.readdirSync(startPath)
  files.forEach(file => {
    const f = path.join(startPath, file)
    const stat = fs.statSync(f)
    if (stat.isDirectory()) {
      result.push([...findSync(path.resolve(__dirname, f))])
    } else {
      result.push(f)
    }
  })
  return result
}

module.exports = (mockFolder, app) => {
  findSync(mockFolder).forEach(file => require(file)(app))
}
