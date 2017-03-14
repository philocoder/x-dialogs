# x-Dialog
### A minimalistic but flexible yet powerful approach to web dialogs

* Simple API.
* All in 200 lines, no more (not minified, in a 10K JS file).
* No jQuery required.
* No CSS required. 
* Unstyled dialogs, for you to customize on your own, but with the basics covered.
* Supports to create dialogs from HTMLElement instances too.

Examples of usage:

* An alert dialog:

```javascript
xDialog.alert({
  message: "This is an alert",
  confirmMessage: "I see",
  onDone: function() {
    xDialog.alert({msg:"And this one, another one"});
  }
});
```

* A confirm dialog:

```javascript
xDialog.confirm({
  message: "This is a confirm dialog",
  confirmMessage: "You can confirm",
  denyMessage: "Or you can deny",
  onDone: function() {
    xDialog.alert({
      msg:"Cool, isn't it?",
      confirmMsg: "Absolutely"
    });
  }
});
```

* A prompt dialog:

```javascript
xDialog.prompt({
  message: "This is a prompt dialog",
  default: "You can type some text here",
  denyMessage: "Or you can deny",
  onDone: function(value) {
    xDialog.alert({
      msg: "Your answer was: " + value,
      confirmMsg: "Yes"
    });
  }
});
```

The parameters supported for each of these methods are:

Method name | xDialog.alert | xDialog.prompt | xDialog.confirm
----------- | ------------- | -------------- | ---------------
msg / message | Yes | Yes | Yes
confirmMsg / confirmMessage (text) | Yes | Yes | Yes
denyMsg / denyMessage (text) | - | - | Yes
onDone (function) | Yes | Yes | Yes
onConfirm (function) | Yes | Yes | Yes
onDeny (function) | - | - | Yes
default (text) | - | Yes | -



Custom dialogs are not yet supported, but they can be supported if anyone shows interest on it.






