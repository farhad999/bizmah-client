module.exports = {
  apps: [
    {
      port: 4000,
      name: 'client',
      exec_mode: 'cluster',
      instances: 1, // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start',
      watch: true,
      autorestart: true,
    }
  ]
};