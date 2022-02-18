const statisticsMock = {
    lastTracking: new Date(),
    languages: [
      { 
        lan: 'JS',
        fileName: 'HelloWorld.js',
        workspace: 'preprocessors',
        os: 'windows',
        time: 150, 
        stamps: {
          start: new Date(),
          end: new Date()
        } 
      },
      { 
        lan: 'PHP', 
        fileName: 'HelloWorld.php',
        workspace: 'preprocessors',
        os: 'windows',
        time: 125, 
        stamps: {
          start: new Date(),
          end: new Date()
        } 
      },
      { 
        lan: 'html', 
        fileName: 'index.html',
        workspace: 'preprocessors',
        os: 'windows',
        time: 800, 
        stamps: {
          start: new Date(),
          end: new Date()
        } 
      },
      { 
        lan: 'css', 
        fileName: 'styles.css',
        workspace: 'preprocessors',
        os: 'windows',
        time: 500, 
        stamps: {
          start: new Date(),
          end: new Date()
        } 
      },
      { 
        lan: 'py', 
        fileName: 'main.py',
        workspace: 'preprocessors',
        os: 'windows',
        time: 753, 
        stamps: {
          start: new Date(),
          end: new Date()
        } 
      },
      { 
        lan: 'py', 
        fileName: 'data.py',
        workspace: 'preprocessors',
        os: 'windows',
        time: 900, 
        stamps: {
          start: new Date(),
          end: new Date()
        } 
      }
    ],
    development: { totalTime: 0 },
    os: [ ]
}


module.exports = { statisticsMock }

