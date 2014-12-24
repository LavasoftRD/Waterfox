/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

const { Cc, Ci, Cu } = require("chrome");

const { SimulatorProcess } = require("./simulator-process");
const { Promise: promise } = Cu.import("resource://gre/modules/Promise.jsm", {});
const { Simulator } = Cu.import("resource://gre/modules/devtools/Simulator.jsm");
const { AddonManager } = Cu.import("resource://gre/modules/AddonManager.jsm", {});

let process;

function launch({ port }) {
  // Close already opened simulation
  if (process) {
    return close().then(launch.bind(null, { port: port }));
  }

  process = SimulatorProcess();
  process.remoteDebuggerPort = port;
  process.run();

  return promise.resolve();
}

function close() {
  if (!process) {
    return promise.resolve();
  }
  let p = process;
  process = null;
  return p.kill();
}

let appinfo = {};

AddonManager.getAddonByID(require("addon").id, function (addon) {
  appinfo.label = addon.name.replace(" Simulator", "");

  Simulator.register(appinfo.label, {
    appinfo: appinfo,
    launch: launch,
    close: close
  });
});

exports.shutdown = function () {
  Simulator.unregister(appinfo.label);
  close();
}
