module.exports = {
  apps : [{
    script    : "server1.js",
    instances : "max",
    exec_mode : "cluster"
  }]
}