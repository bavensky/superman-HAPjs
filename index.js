const path = require('path')
const HAP = require('hap-nodejs')
const {uuid, Bridge, Accessory} = HAP
const pkgHap = require('./node_modules/hap-nodejs/package.json')
const accessoryLoader = require('./node_modules/hap-nodejs/lib/AccessoryLoader')
const pkg = require('./package.json')
const log = require('yalm')
const fetch = require('node-fetch')

/*
 * Config Section
 */

const bridgeName = 'superman Siri Bridge'
const accessoriesDir = path.join(__dirname, 'accessories')



log.setLevel('verbose')
log(pkg.name + ' ' + pkg.version + ' is starting')
log.info(`using ${pkgHap.name} version ${pkgHap.version}`)

HAP.init()

const bridge = new Bridge(bridgeName, uuid.generate(bridgeName))
const accessories = accessoryLoader.loadDirectory(accessoriesDir)
accessories.forEach(accessory => bridge.addBridgedAccessory(accessory))

bridge.on('identify', (paired, callback) => {
  console.log('Node Bridge identify')
  callback() // success
})

// Publish the Bridge on the local network.
bridge.publish({
  username: 'CC:22:3D:E3:CE:F6',
  port: 51826,
  pincode: '999-98-001',
  category: Accessory.Categories.BRIDGE
})

