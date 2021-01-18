const fsPromises = require('fs').promises
const fse = require('fs-extra')
const gitRev = require('git-rev-sync')
const rfg = require('rfg-api').init()
const utils = require('../utils')

const API_KEY = 'eabf77c98d6bd1eea81fb58be7895c42dafc2b21'

const faviconOptions = {
  design: {
    ios: {
      pictureAspect: 'noChange',
      assets: {
        ios6AndPriorIcons: false,
        ios7AndLaterIcons: false,
        precomposedIcons: false,
        declareOnlyDefaultIcon: true
      }
    },
    desktopBrowser: {
      design: 'raw'
    },
    windows: {
      pictureAspect: 'noChange',
      backgroundColor: '#2b5797',
      onConflict: 'override',
      assets: {
        windows80Ie10Tile: false,
        windows10Ie11EdgeTiles: {
          small: false,
          medium: true,
          big: false,
          rectangle: false
        }
      }
    },
    androidChrome: {
      pictureAspect: 'noChange',
      themeColor: '#ffffff',
      manifest: {
        display: 'browser',
        orientation: 'notSet',
        onConflict: 'override',
        declared: true
      },
      assets: {
        legacyIcon: false,
        lowResolutionIcons: false
      }
    },
    safariPinnedTab: {
      pictureAspect: 'blackAndWhite',
      threshold: 50,
      themeColor: '#6d6d6d'
    }
  },
  settings: {
    compression: 2,
    scalingAlgorithm: 'Mitchell',
    errorOnImageTooSmall: false,
    readmeFile: false,
    htmlCodeFile: true,
    usePathAsIs: false
  },
  versioning: {
    paramName: 'v',
    paramValue: gitRev.short()
  }
}

function generateFaviconsPromise (localConf) {
  return new Promise((resolve, reject) => {
    const request = rfg.createRequest({
      apiKey: API_KEY,
      masterPicture: `${localConf.FAVICONS_SRC}${localConf.FAVICON_MASTER_PICTURE}`,
      iconsPath: localConf.FAVICON_PATH,
      design: faviconOptions.design,
      settings: faviconOptions.settings,
      versioning: faviconOptions.versioning
    })

    rfg.generateFavicon(request, localConf.FAVICONS_DIST, function (error, data) {
      if (error) {
        utils.errLogFn(error.message, { functionName: 'generateFaviconsPromise', newPromise: true })
        reject(error)
      } else {
        resolve(data)
      }
    })
  })
}

async function generateFavicons (localConf) {
  try {
    const timeStart = utils.start('generateFavicons', 'blue')

    const data = await generateFaviconsPromise(localConf)

    await fse.ensureDir(`${localConf.TEMP}`)
    await fsPromises.writeFile(`${localConf.TEMP}faviconData.json`, JSON.stringify(data))
    await fsPromises.rename(`${localConf.FAVICONS_DIST}html_code.html`, `${localConf.FAVICONS_DIST}Favicons.html`)

    utils.boxEnd({ functionName: 'generateFavicons', timeStart: timeStart, endColor: 'blue' })
  } catch (error) {
    utils.errLogFn(error, { functionName: 'generateFavicons' })
  }
}

exports.generateFavicons = generateFavicons
