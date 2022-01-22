const projectsMock = {
    userId: new ObjectID(userId),
    projects: [
      {
        id: 0,
        name: 'Best project',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vulputate lorem in pellentesque imperdiet. Sed euismod vel tortor at tincidunt.',
        link: 'link',
        time: 500,
        languages: [Array],
        os: 'linux'
      },
      {
        id: 1,
        name: 'GraphiCal',
        description: 'First technical text of Platzi Master; the creation of a basic graphing calculator',
        link: 'https://github.com/IrvingJuarez/GraphiCal',
        time: 500,
        lenguages: [Array],
        os: 'Linux'
      },
      {
        id: 2,
        name: 'equation-solver',
        description: 'Program able to solve one-variable linear equations',
        link: 'https://github.com/IrvingJuarez/equation-solver',
        time: 250,
        lenguages: [Array],
        os: 'Linux'
      },
      {
        id: 3,
        name: 'Pacman',
        description: 'The classical Arcade Game made out of html, css and plain js',
        link: 'https://github.com/IrvingJuarez/Pacman',
        time: 120,
        lenguages: [Array],
        os: 'Linux'
      },
      {
        id: 4,
        name: 'spelling-trainer',
        description: "Program to enhance english students's spelling skills",
        link: 'https://github.com/IrvingJuarez/spelling-trainer',
        time: 720,
        lenguages: [Array],
        os: 'Linux'
      }
    ]
}

module.exports = { projectsMock }