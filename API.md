## Functions

<dl>
<dt><a href="#Anno">Anno(context, selection, range, event, element, reverseSelector)</a></dt>
<dd><p>The <code>element</code> represents the closest common ancesstor of the nodes
in <code>range</code>, which - in most cases - is limited to one element, anyways.</p>
</dd>
<dt><a href="#AnnoTip">AnnoTip(settings)</a> ⇒ <code><a href="#AnnoTip">AnnoTip</a></code></dt>
<dd><p>Initialize the annotation engine</p>
</dd>
</dl>

<a name="Anno"></a>

## Anno(context, selection, range, event, element, reverseSelector)
The `element` represents the closest common ancesstor of the nodes
in `range`, which - in most cases - is limited to one element, anyways.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> | The context, as being passed to AnnoTip with the settings |
| selection | <code>String</code> | The content (text) that is selected |
| range | <code>Range</code> | The DOM nodes range, that this selection occupies |
| event | <code>Event</code> | The DOM Event that triggered the annotation mechanism |
| element | <code>Element</code> | The DOM element, holding the selection |
| reverseSelector | <code>String</code> | The CSS selector string pointing the the exact element. |

<a name="AnnoTip"></a>

## AnnoTip(settings) ⇒ [<code>AnnoTip</code>](#AnnoTip)
Initialize the annotation engine

**Kind**: global function  
**Returns**: [<code>AnnoTip</code>](#AnnoTip) - The instance just created.  

| Param | Type | Description |
| --- | --- | --- |
| settings | <code>Object</code> | Custom settings for the annotation engine. |


* [AnnoTip(settings)](#AnnoTip) ⇒ [<code>AnnoTip</code>](#AnnoTip)
    * _instance_
        * [.attach(selector)](#AnnoTip+attach) ⇒ [<code>AnnoTip</code>](#AnnoTip)
        * [.applyAnnos(root, annos, handler)](#AnnoTip+applyAnnos) ⇒ [<code>AnnoTip</code>](#AnnoTip)
        * [.discard()](#AnnoTip+discard) ⇒ [<code>AnnoTip</code>](#AnnoTip)
        * [.update(anno)](#AnnoTip+update) ⇒ [<code>AnnoTip</code>](#AnnoTip)
        * [.detach()](#AnnoTip+detach) ⇒ [<code>AnnoTip</code>](#AnnoTip)
    * _static_
        * [.defaults](#AnnoTip.defaults)
            * [.context](#AnnoTip.defaults.context)
            * [.textSelection](#AnnoTip.defaults.textSelection)
            * [.elementSelection](#AnnoTip.defaults.elementSelection)
            * [.actionsHtml](#AnnoTip.defaults.actionsHtml)
            * [.classNames](#AnnoTip.defaults.classNames)
            * [.cssReverseOptions](#AnnoTip.defaults.cssReverseOptions)
            * [.tippySettings](#AnnoTip.defaults.tippySettings)
            * [.onSelection](#AnnoTip.defaults.onSelection)
            * [.onAction](#AnnoTip.defaults.onAction)
            * [.onClose](#AnnoTip.defaults.onClose)

<a name="AnnoTip+attach"></a>

### annoTip.attach(selector) ⇒ [<code>AnnoTip</code>](#AnnoTip)
This method can be invoked many times, with difference selectors.

**Kind**: instance method of [<code>AnnoTip</code>](#AnnoTip)  
**Returns**: [<code>AnnoTip</code>](#AnnoTip) - A self instance for chaining invocations.  

| Param | Type | Description |
| --- | --- | --- |
| selector | <code>String</code> | The jQuery selector to use for listing all elements to monitor. |

<a name="AnnoTip+applyAnnos"></a>

### annoTip.applyAnnos(root, annos, handler) ⇒ [<code>AnnoTip</code>](#AnnoTip)
The routine initially fills the `element` property of each annotation object, based
on the stored `reverseSelector` and then, if a handler is passed, invokes it with the anno object.

**Kind**: instance method of [<code>AnnoTip</code>](#AnnoTip)  
**Returns**: [<code>AnnoTip</code>](#AnnoTip) - A self instance for chaining invocations.  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>Element</code> | The base to be used for relative DOM paths stored in the annotations. |
| annos | [<code>Array.&lt;Anno&gt;</code>](#Anno) | List of annotations in the same format, as they were created. |
| handler | <code>function</code> | The handler to be invoked for each annotation and located element. The expected format is: `function (anno)`. |

<a name="AnnoTip+discard"></a>

### annoTip.discard() ⇒ [<code>AnnoTip</code>](#AnnoTip)
Close the annotation box, if it is openned at all.

**Kind**: instance method of [<code>AnnoTip</code>](#AnnoTip)  
**Returns**: [<code>AnnoTip</code>](#AnnoTip) - A self instance for chaining invocations.  
<a name="AnnoTip+update"></a>

### annoTip.update(anno) ⇒ [<code>AnnoTip</code>](#AnnoTip)
Update the content and actions lines of the annotation box,
based on the newly provided object.

**Kind**: instance method of [<code>AnnoTip</code>](#AnnoTip)  
**Returns**: [<code>AnnoTip</code>](#AnnoTip) - A self instance for chaining invocations.  

| Param | Type | Description |
| --- | --- | --- |
| anno | <code>Object</code> | The annotation object to be used for content resetting |

<a name="AnnoTip+detach"></a>

### annoTip.detach() ⇒ [<code>AnnoTip</code>](#AnnoTip)
Detach the AnnoTip from the page.

**Kind**: instance method of [<code>AnnoTip</code>](#AnnoTip)  
**Returns**: [<code>AnnoTip</code>](#AnnoTip) - A self instance for chaining invocations.  
<a name="AnnoTip.defaults"></a>

### AnnoTip.defaults
Default settings.

**Kind**: static property of [<code>AnnoTip</code>](#AnnoTip)  

* [.defaults](#AnnoTip.defaults)
    * [.context](#AnnoTip.defaults.context)
    * [.textSelection](#AnnoTip.defaults.textSelection)
    * [.elementSelection](#AnnoTip.defaults.elementSelection)
    * [.actionsHtml](#AnnoTip.defaults.actionsHtml)
    * [.classNames](#AnnoTip.defaults.classNames)
    * [.cssReverseOptions](#AnnoTip.defaults.cssReverseOptions)
    * [.tippySettings](#AnnoTip.defaults.tippySettings)
    * [.onSelection](#AnnoTip.defaults.onSelection)
    * [.onAction](#AnnoTip.defaults.onAction)
    * [.onClose](#AnnoTip.defaults.onClose)

<a name="AnnoTip.defaults.context"></a>

#### defaults.context
The user-provided context to be added to each [Anno](#Anno) created.

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.textSelection"></a>

#### defaults.textSelection
Whether to install text selection monitoring. [TextMonitor](TextMonitor).
Currently this is the only supported mode.

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.elementSelection"></a>

#### defaults.elementSelection
Whether to install element click/handling mointoring. Not supported.

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.actionsHtml"></a>

#### defaults.actionsHtml
A custom-provided HTML for action buttons, which are openned when a
selection is recognized.

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.classNames"></a>

#### defaults.classNames
Additional class-names to be applied to the annotation frame DOM element. 
Can be both array and string (with one or more class names).

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.cssReverseOptions"></a>

#### defaults.cssReverseOptions
Options for css reverse selector, builder, used to construct the [Anno](#Anno)
`reverseSelector` property. Check [https://www.npmjs.com/package/css-selector-generator](https://www.npmjs.com/package/css-selector-generator).

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.tippySettings"></a>

#### defaults.tippySettings
The settings to be passed to the underlying Tippy.js box engine.
[https://atomiks.github.io/tippyjs/](https://atomiks.github.io/tippyjs/).

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.onSelection"></a>

#### defaults.onSelection
Handler to be invoked when a selection is made. The constructed [Anno](#Anno) object
is passed.

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.onAction"></a>

#### defaults.onAction
Handler to be invoked on user action. The default actions are `edit`, `ok` and `cancel`.
The constructed [Anno](#Anno) object is passed.

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
<a name="AnnoTip.defaults.onClose"></a>

#### defaults.onClose
Handler to be invoked when the annotation box is about to be closed.
The constructed [Anno](#Anno) object is passed.

**Kind**: static property of [<code>defaults</code>](#AnnoTip.defaults)  
