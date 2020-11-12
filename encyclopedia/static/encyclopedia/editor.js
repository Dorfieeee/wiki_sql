import Markdown from './Markdown.js'


const onLoad = () => {
    const textarea = document.getElementById('content')
    const preview = document.getElementById('detail')
    const markdowner = new Markdown()

    if (textarea.value) {
        preview.innerHTML = markdowner.convert(textarea.value)
    }

    textarea.addEventListener('keyup', (e) => {
        const markdowner = new Markdown()
        preview.innerHTML = markdowner.convert(e.target.value)
    })
}

document.addEventListener('DOMContentLoaded', onLoad);