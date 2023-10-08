const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path
const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')

const CONVERT_TO = "ogg"
const files = fs.readdirSync('./audioFiles')

ffmpeg.setFfmpegPath(ffmpegPath)

files.forEach(file => {
    console.log(`Converting ${file} to ${CONVERT_TO}`)

    ffmpeg()
        .input(`./audioFiles/${file}`)
        .audioQuality(320)
        .toFormat(CONVERT_TO)
        .on('error', error => console.log(`Encoding Error: ${error.message}`))
        .on('exit', () => console.log('Audio recorder exited'))
        .on('close', () => console.log('Audio recorder closed'))
        .on('end', () => console.log('Audio Transcoding succeeded !'))
        .pipe(fs.createWriteStream(`./output/${file.split('.')[0]}.${CONVERT_TO}`), { end: true })
})