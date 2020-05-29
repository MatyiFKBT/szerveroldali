const fs = require('fs')

fs.readdir('./in', (err, files) => {
    // if (err) throw new Error(err);
    let data = []
    files.forEach(filename => {
        fs.readFile(`./in/${filename}`, 'utf-8', (err, file) => {
            // console.log(file.toString())
            data.push(file)
            if (data.length === files.length) {
                const output = data.join('\n')
                fs.writeFile('./out.txt', output, (err) => {
                    console.log('Vége')
                })
            }
        })
    })
});