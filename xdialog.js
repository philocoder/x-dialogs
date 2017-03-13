/* Licensed under: YOU CAN EMBED THIS SOFTWARE WHEREVER YOU WANT WITHOUT PERMISSION, OR EXTEND IT, NO PROBLEM */
/* Examples can be found at https://github.com/philocoder/x-dialogs/example.html */

xDialog = (function() {
    
    var xDialog = {};

    xDialog.dialogsOpened = [];

    xDialog._findClosest = function getClosest(elem, selector) {
        while(elem !== document.body) {
            elem = elem.parentElement;
            if (elem.matches(selector)) {
                return elem;
            }
        }
    };

    xDialog.closeAllDialogs = function() {
        var dialogs = xDialog.dialogsOpened;
        for(var a = 0; a < dialogs.length; a++) {
            var dialog = dialogs[a];
            dialog.remove();
        }
    };

    xDialog.createDialogHTML = function(contents, isHTML, className, callback, callbackParams) {
        var html = document.createElement("div");
        html.className = "xdialog";
        html.style.display = "block";
        html.style.position = "fixed";
        html.style.top = "0px";
        html.style.bottom = "0px";
        html.style.left = "0px";
        html.style.right = "0px";
        html.style.backgroundColor = "rgba(0,0,0,0.7)";
        html.style.color = "white";
        html.style.zIndex = "9999";
        var htmlContainer = document.createElement("div");
        htmlContainer.className = "xdialog-container";
        htmlContainer.style.display = "table";
        htmlContainer.style.width = "100%";
        htmlContainer.style.height = "100%";
        var htmlContentsWrapper = document.createElement("div");
        htmlContentsWrapper.className = "xdialog-contents-wrapper";
        htmlContentsWrapper.style.display = "table-cell";
        htmlContentsWrapper.style.width = "100%";
        htmlContentsWrapper.style.height = "100%";
        htmlContentsWrapper.style.verticalAlign = "middle";
        htmlContentsWrapper.style.textAlign = "center";
        var htmlContents = document.createElement("div");
        htmlContents.className = (arguments.length > 2 ? " " + className : "");
        if(typeof contents === "string") {
            if(isHTML) {
                htmlContents.innerHTML = contents;
            } else {
                htmlContents.textContent = contents;
            }
        } else if(contents instanceof HTMLElement) {
            htmlContents = contents;
        }
        htmlContentsWrapper.appendChild(htmlContents);
        htmlContainer.appendChild(htmlContentsWrapper);
        html.appendChild(htmlContainer);
        if(arguments.length > 4) {
            callback.apply(html, [html].concat(callbackParams));
        } else if(arguments.length > 3) {
            callback.apply(html, [html]);
        }
        xDialog.dialogsOpened.push(html);
        document.body.appendChild(html);
        return html;
    };

    xDialog.confirm = function(params) {
        var params = (arguments.length > 0 ? arguments[0] : {});
        var msg = params.message || params.msg || "Are you sure?";
        var msgConfirm = params.confirmMessage || params.confirmMsg || "Yes";
        var msgDeny = params.denyMessage || params.denyMsg || "No";
        var fnConfirm = params.onConfirm || function() {};
        var fnDeny = params.onDeny || function() {};
        var fnDone = params.onDone || function() {};
        var htmlContents = document.createElement("div");
        var htmlContentsInner = document.createElement("div");
        var htmlMessage = document.createElement("div");
        var htmlMessageConfirm = document.createElement("button");
        var htmlMessageDeny = document.createElement("button");
        htmlContents.style.width = "100%";
        htmlContents.style.height = "auto";
        htmlContentsInner.style.width = "100%";
        htmlContentsInner.style.height = "auto";
        htmlMessage.innerHTML = msg;
        htmlMessage.style.marginBottom = "10px";
        htmlMessageConfirm.textContent = msgConfirm;
        htmlMessageConfirm.className = "default-option";
        htmlMessageDeny.textContent = msgDeny;
        htmlMessageDeny.addEventListener("click", closeSelfDialog);
        htmlMessageDeny.addEventListener("click", fnDeny);
        htmlMessageConfirm.addEventListener("click", fnDone);
        htmlContents.appendChild(htmlContentsInner);
        htmlContentsInner.appendChild(htmlMessage);
        htmlContentsInner.appendChild(htmlMessageConfirm);
        htmlContentsInner.appendChild(htmlMessageDeny);
        var htmlDialog = xDialog.createDialogHTML(htmlContents, null, "confirm-dialog");
        htmlMessageConfirm.addEventListener("click", function(ev) {htmlDialog.remove();});
        htmlMessageConfirm.addEventListener("click", fnConfirm);
        htmlMessageConfirm.addEventListener("click", fnDone);
        htmlDialog.querySelectorAll(".default-option")[0].focus();
        return htmlDialog;
    };

    xDialog.alert = function() {
        var params = (arguments.length > 0 ? arguments[0] : {});
        var msg = params.message || params.msg || "This is an alert. But the developer whould put some text in 'message' property.";
        var msgConfirm = params.confirmMessage || params.confirmMsg || "Okay";
        var fnConfirm = params.onConfirm || function() {};
        var fnDone = params.onDone || function() {};
       	var htmlContents = document.createElement("div");
        var htmlContentsInner = document.createElement("div");
        var htmlMessage = document.createElement("div");
        var htmlMessageConfirm = document.createElement("button");
        htmlContents.style.width = "100%";
        htmlContents.style.height = "auto";
        htmlContentsInner.style.width = "100%";
        htmlContentsInner.style.height = "auto";
        htmlMessage.innerHTML = msg;
        htmlMessage.style.marginBottom = "10px";
        htmlMessageConfirm.textContent = msgConfirm;
        htmlMessageConfirm.className = "default-option";
        htmlContents.appendChild(htmlContentsInner);
        htmlContentsInner.appendChild(htmlMessage);
        htmlContentsInner.appendChild(htmlMessageConfirm);
        var htmlDialog = xDialog.createDialogHTML(htmlContents, null, "alert-dialog");
        htmlMessageConfirm.addEventListener("click", function(ev) {htmlDialog.remove();});
        htmlMessageConfirm.addEventListener("click", fnConfirm);
        htmlMessageConfirm.addEventListener("click", fnDone);
        htmlDialog.querySelectorAll(".default-option")[0].focus();
        return htmlDialog;
    };

    xDialog.prompt = function(params) {
        var params = (arguments.length > 0 ? arguments[0] : {});
        var msg = params.message || params.msg || "This is a prompt. You can put text here.";
        var fnConfirm = params.onConfirm || function() {};
        var fnDone = params.onDone || function() {};
        var htmlContents = document.createElement("div");
        var htmlContentsInner = document.createElement("div");
        var htmlMessage = document.createElement("div");
        var htmlMessageInput = document.createElement("input");
        var htmlBtnOk = document.createElement("button");
        htmlContents.style.width = "100%";
        htmlContents.style.height = "auto";
        htmlContentsInner.style.width = "100%";
        htmlContentsInner.style.height = "auto";
        htmlMessage.innerHTML = msg;
        htmlMessage.style.marginBottom = "10px";
        htmlMessageInput.className = "input-prompt";
        htmlBtnOk.textContent = "Ok";
        htmlContents.appendChild(htmlContentsInner);
        htmlContentsInner.appendChild(htmlMessage);
        htmlContentsInner.appendChild(htmlMessageInput);
        htmlContentsInner.appendChild(htmlBtnOk);
        var htmlDialog = xDialog.createDialogHTML(htmlContents, null, "prompt-dialog");
        htmlDialog.querySelectorAll(".input-prompt")[0].focus();
        var fnDialogClosed = function() {
            htmlDialog.remove();
            setTimeout(function() {
                fnConfirm(htmlMessageInput.value);
                fnDone(htmlMessageInput.value);
            }, 1);
        };
        htmlMessageInput.addEventListener("keydown", function(ev) {
            if(ev.keyCode === 13) {
            	fnDialogClosed();
            }
        });
        htmlBtnOk.onclick = function() {
			fnDialogClosed();
        }
        return htmlDialog;
    };

    return xDialog;

})();
