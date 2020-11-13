import Markdown from './Markdown.js'


const onLoad = () => {
    const textarea = document.getElementById('editor__raw--content');
    const preview = document.getElementById('editor__preview--content');
    const editor = document.getElementById('editor');
    const previewToggler = document.getElementById('preview-toggler');
    const markdowner = new Markdown();

    const togglePreview = () => {
        
    };

    if (textarea.value) {
        preview.innerHTML = markdowner.convert(textarea.value);
    };

    textarea.addEventListener('keyup', (e) => {
        const markdowner = new Markdown();
        preview.innerHTML = markdowner.convert(e.target.value);
    });

    previewToggler.addEventListener('click', () => {
        editor.classList.toggle('raw-hiden');
    })

    window.addEventListener('resize', () => {
        if (window.innerWidth >= 992) {
            editor.classList.remove('raw-hiden')
        }
    })
}

document.addEventListener('DOMContentLoaded', onLoad);