

// to make editor

window.editorx = CodeMirror.fromTextArea(document.querySelector("#editor"), 
{
    mode:"text/x-python",
    lineNumbers: true,
    styleActiveLine: true,
    theme: 'dracula',
    autoCloseBrackets: true,

})