const onLoad = () => {        
    const markup = document.getElementById('content')
    const preview = document.getElementById('detail')
    const getHeader = (e) => {
        const header = /(?:^#{1}|^\\"#{1})([\w\d\s:(),-]+)(?:#*\s*(?:\\")?$)/
        let raw = JSON.stringify(e.target.value)
        raw = raw.replaceAll('\"', '')
        let lines = raw.split('\\n')
        lines = lines.map(line => {
            if (header.test(line)) {
                cleaned = line.replaceAll('#', '').trim()
                return `<h1>${cleaned}</h1>`
            }
            cleaned = line.trim()
            return `<p>${cleaned}</p>`
        })
        preview.innerHTML = lines.join('')
    }
    markup.addEventListener('keyup', (e) => {
        
    })
}

document.addEventListener('DOMContentLoaded', onLoad);