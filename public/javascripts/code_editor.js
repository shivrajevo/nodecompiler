// 
const langmode = document.querySelector("#lang_type");
const theme = document.querySelector("#theme-type");
const fonts = document.querySelector("#editor-fonts");
const apply = document.querySelector("#apply_settings");
const run_btn = document.querySelector("#runcode")
const message = document.querySelector("#popup-infobox>p")

// select terminals

const output_term = document.querySelector("#output")
const input_term = document.querySelector("#input")




// to make editor
const editorx = CodeMirror.fromTextArea(document.querySelector("#editor"),
    {
        extraKeys: { "Alt": "autocomplete" },
        mode: "text/x-python",
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        keyMap: "sublime",
        theme: 'seti',
        lineWrapping: true,
        autoCloseBrackets: true,

    })

// popup-settings

function popup_onoff(popup_id, bool = false) {


    let popup = document.getElementById(popup_id)

    if (window.getComputedStyle(popup).display == "block") {

        if (bool) {
            popup.style.display = "block";
        }
        else {

            popup.style.display = "none"
        }
    }
    else {
        popup.style.display = "block"
    }

}




function infobox(info, bool = true, time = 0) {

    message.innerHTML = info
    let infobox = document.querySelector("#popup-infobox")

    if (bool) {

        infobox.style.display = "block"
    }
    else {
        infobox.style.display = "none"

    }

    if (time > 0) {

        setTimeout(() => {

            infobox.style.display = "none"


        }, time * 1000);

    }

}



function changeFontSize(size) {
    const cmElement = document.querySelector('.CodeMirror');

    cmElement.style.fontSize = size + 'rem';
    editorx.refresh()
}

changeFontSize(1.6)


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
        case "o":
            changeFontSize(1.6)
            break
        case "s":
            changeFontSize(1)
            break;
        case "n":

            changeFontSize(1.2)
            break;
        case "m":
            changeFontSize(1.4)

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


run_btn.addEventListener("click", async function () {

    infobox("your program is exe")


    codeXdata = {
        code: editorx.getValue(),
        input: input_term.value,
        langmode: langmode.value
    }


    let from_api = await fetch("/compile", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(codeXdata)

    })

    let data = await from_api.json()



    if (data.output) {

        output_term.value = data.output

        infobox("", false)


    }
    else {
        output_term.value = data.error
        infobox("error in code", true, 1)
    }


    popup_onoff('popup-terminals', true)


    // console.log(data)


})
