# AnnoTip - easy, flexible and fun annotation library for the web

## Usage

```js
var annoTip = new AnnoTip({
  onSelection: function (anno) {
    // anno.content = anno.selection.toUpperCase();
  },
  onAction: function (action, anno) {
    console.log("AnnoTip: onAction: " + action);
    if (action === 'edit') {
      // anno.content = anno.selection.toUpperCase();
      this.update(anno).getFrame().addClass('openned');
    }
    else
      this.discard();
  },
  onClose: function (anno) {
    console.log("AnnoTip: onClose");
  }
});

annoTip.attach(document.body);
```

Check the [example/test page](tests/dev.html).

Here is the [API](./API.md) for more detailed explanation of all settings.

## Credits

[Marker Pen icon](https://icons8.com/icons/set/marker-pen) by [Icons8](https://icons8.com)

[No Edit icon](https://icons8.com/icons/set/no-edit) by [Icons8](https://icons8.com)

[Task Completed icon](https://icons8.com/icons/set/task-completed) by [Icons8](https://icons8.com)

[Annotator project](http://annotatorjs.org) for the test page.



---

