import './base.scss'
import RabbitImg from 'src/images/test-image.png'

function ready(fn) {
    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        fn()
    } else {
        document.addEventListener('DOMContentLoaded', fn)
    }
}

ready(() => {
    let testImage = document.createElement('img')
    testImage.setAttribute('class', 'test-image')
    testImage.setAttribute('alt', 'Test image')
    testImage.setAttribute('src', RabbitImg)
    document.body.appendChild(testImage)
})

// eslint-disable-next-line no-console
console.log('Base bundle loaded')
