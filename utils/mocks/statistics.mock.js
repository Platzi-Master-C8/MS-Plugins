const statisticsMock = {
    lastTracking: new Date(),
    languages: [
      { name: 'JS', time: 12.5 },
      { name: 'Rust', time: 25 },
      { name: 'php', time: 25 },
      { name: 'Java', time: 12.5 },
      { name: 'Python', time: 25 }
    ],
    development: { totalTime: 52545 },
    os: [
      { name: 'windows', time: 545 },
      { name: 'linux', time: 545 },
      { name: 'mac', time: 545 }
    ]
}


module.exports = { statisticsMock }