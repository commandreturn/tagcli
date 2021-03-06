#!/usr/bin/env node

var program = require('commander')
var path = require('path')
var tagcliPackage = require(path.join(__dirname, '../', 'package.json'))

/* commands */
var loadCommand = function (cmd) {
  var self = this
  return function () {
    require('../lib/commands/' + cmd)
      .apply(self, arguments)
  }
}

program
  .version(tagcliPackage.version)
  .description(tagcliPackage.description)

program
  .command('host <path>')
  .description('Host experience locally')
  .action(loadCommand('host'))

program
  .command('compile <path>')
  .description('Create <path>.compiled.html for pasting into Adobe Test & Target')
  .action(loadCommand('compile'))

// Show help if no arguments are passed
if (!process.argv.slice(2).length) {
  program._name = process.argv[1]
  program._name = program._name.substr(program._name.lastIndexOf('/') + 1)
  program.outputHelp()
}

program.parse(process.argv)
