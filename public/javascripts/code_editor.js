// 
const langmode = document.querySelector("#lang_type");
const theme = document.querySelector("#theme-type");
const fonts = document.querySelector("#editor-fonts");
const apply = document.querySelector("#apply_settings");



// to make editor
const editorx = CodeMirror.fromTextArea(document.querySelector("#editor"),
    {
        mode: "text/x-python",
        lineNumbers: true,
        styleActiveLine: true,
        theme: 'seti',
        autoCloseBrackets: true,

    })


// popup-settings

function popup_onoff(popup_id) {


    let popup = document.getElementById(popup_id)

    if (window.getComputedStyle(popup).display == "block") {
        popup.style.display = "none"
    }
    else {
        popup.style.display = "block"
    }

}

function changeFontSize(size) {
    const cmElement = document.querySelector('.CodeMirror');

    cmElement.style.fontSize = size + 'rem';
    editorx.refresh()
}




apply.addEventListener("click", () => {


    popup_onoff("popup-settings")

    switch (langmode.value) {
        case "python":
            editorx.setOption("mode", "text/x-python")
            break;
        case "c_cpp":
            editorx.setOption("mode", "text/x-c++src")
            break;

        default:
            console.log("selection falure : code type");
            break;
    }

    switch (theme.value) {
        case "seti":
            editorx.setOption("theme", "seti")
            break;
        case "monokai":
            editorx.setOption("theme", "monokai")
            break;
        case "dracula":
            editorx.setOption("theme", "dracula")
            break;
        case "duotone-light":
            editorx.setOption("theme", "duotone-light")
            break;
        default:
            console.log("selection falure : theme {set to default seti}");
            editorx.setOption("theme", "seti")
            break;
    }

    switch (fonts.value) {
        case "s":
            changeFontSize(1)
            break;
        case "n":

            changeFontSize(1.2)
            break;
        case "m":
            changeFontSize(1.4)

            break;
        case "r":
            changeFontSize(1.6)

            break;
        case "h":
            changeFontSize(1.8)

            break;
        default:
            console.log("selection falure : theme {set to default seti}");
            editorx.setOption("theme", "seti")
            break;
    }

})


