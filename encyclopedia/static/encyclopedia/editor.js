class Markdown extends String {
    constructor(str) {
        super(str)
        this.str = str
        this.sanitazed = false
        this.soiled = false
        // reveil escaped characters
        this.soil = () => {
            this.str = JSON.stringify(this.str).replace(/^"(.+)"$/, '$1').trim()
            this.soiled = true
        }
        // sanitaze from HTML tags
        this.sanitaze = () => {
            this.str = this.str.replace(/</g, '&lt').replace(/>/g, '&gt')
            this.sanitazed = true
        }
    }

    show = () => {
        return this.str
    }

    convert = () => {
        if (!this.soiled) {
            this.soil()
        }

        // code here

        if (!this.sanitazed) {
            this.sanitaze()
        }
        return this.str
    }
}

const onLoad = () => {        
    const textarea = document.getElementById('content')
    const preview = document.getElementById('detail')

    textarea.addEventListener('keyup', (e) => {
        const markdowner = new Markdown(e.target.value)
        preview.innerHTML = markdowner.convert()
    })
}

document.addEventListener('DOMContentLoaded', onLoad);