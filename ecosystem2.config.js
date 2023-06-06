module.exports = {
  apps : [{
    script    : "server2.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}