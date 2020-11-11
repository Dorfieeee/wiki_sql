class Markdown {
    // reveil escaped characters
    soil = (str) => {
        return JSON.stringify(str).trim().split('').slice(0,-1).join('')
    }
    // sanitaze from HTML tags
    sanitaze = (str) => {
        return (str
            .replace(/</g, '&lt')
            .replace(/>/g, '&gt')
            )
    }

    convert = (str) => {
        if (!str) {
            return str
        }

        str = this.soil(str)
    
        str = this.sanitaze(str)

        const ulist = /s/g
        // headers tags lookup $1 = prefix, $2 = content of header
        const header1Exp = /([^#])#{1}[^#]\s?([^\\\n]+)/g
        const header2Exp = /([^#])#{2}[^#]\s?([^\\\n]+)/g
        const header3Exp = /([^#])#{3}[^#]\s?([^\\\n]+)/g
        const header4Exp = /([^#])#{4}[^#]\s?([^\\\n]+)/g
        const header5Exp = /([^#])#{5}[^#]\s?([^\\\n]+)/g
        const header6Exp = /([^#])#{6}[^#]\s?([^\\\n]+)/g
        // anchor tag $1 = link placeholder, $2 = url
        const anchorsExp = /\[([\w]+\s*[^\]]*)\]\(((?:\b(https?|ftp|file):\/\/)?[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]*)\)/g
        // code tag $1 = code content
        const codeExp = /`{3}\s?(.+?)\s?`{3}/g
        // bold tag $1 = bold content
        const strongExp = /\*{2}(.+?)\*{2}/g

        const startTagExp = /^<([a-z0-9]+)>$/i
        const endTagExp = /^([<]\/[a-z0-9]+|\/)>$/i
        const elementExp = /^<([a-z0-9]+)\s*[^>]*>.+<\/\1>$|^<[a-z0-9]+\s*[^<>]*\/>$/i

        //replace(ulist, '<ul>?1</ul>')
        str = str.replace(codeExp, '<code>$1</code>')
        .replace(header6Exp, '$1<h6>$2</h6>')
        .replace(header5Exp, '$1<h5>$2</h5>')
        .replace(header4Exp, '$1<h4>$2</h4>')
        .replace(header3Exp, '$1<h3>$2</h3>')
        .replace(header2Exp, '$1<h2>$2</h2>')
        .replace(header1Exp, '$1<h1>$2</h1>')
        .replace(anchorsExp, '<a href="$2">$1</a>')
        .replace(strongExp, '<strong>$1</strong>')
        // remove " from the beggining
        .slice(1)
        .split('\\n')
        .filter(e => e != '')

        const result = []

        for (let i = 0; i < str.length;) {
            if (elementExp.test(str[i])) {
                result.push(str[i])
                  i++
                  continue
            }
              if (startTagExp.test(str[i])) {
                  let help = []
              while (!endTagExp.test(str[i])){
                help.push(str[i])
                      i++
              } 
                  help.push(str[i])
                  result.push(`<p>${help.join('')}</p>`)
                  i++
                  continue		
              }
                result.push(`<p>${str[i]}</p>`)
                  i++
          }

        return result.join('')
    }
}


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