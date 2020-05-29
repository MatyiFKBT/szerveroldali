const fs = require('fs')
const { promisify } = require('util')

const pReadDir = promisify(fs.readdir)
const pReadFile = promisify(fs.readFile)
const pWriteFile = promisify(fs.writeFile)

async function joinFiles() {
    const files = await pReadDir('./in')
        // const promises = files.map(filename => pReadFile(`./in/${filename}`, 'utf-8'))
        // const datas = await Promise.all(promises)
    const datas = []
    for (const filename of files) {
        const data = await pReadFile(`./in/${filename}`, 'utf-8')
        datas.push(data)
    }
    const output = datas.join('\n')
    await pWriteFile('./out.txt', output)
    console.log('Vége')
}
joinFiles()

/*
pReadDir('./in')
    .then(files => {
        const promises = files.map(filename => pReadFile(`./in/${filename}`, 'utf-8'))
        return Promise.all(promises)
    })
    .then(datas => datas.join('\n'))
    .then(output => pWriteFile('./out.txt', output))
    .then(() => console.log('Vége'))
    .catch(err => console.log(err))
*/
/*
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
*/