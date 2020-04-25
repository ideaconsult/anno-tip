## Functions

<dl>
<dt><a href="#Anno">Anno(context, selection, range, event, element)</a></dt>
<dd><p>The <code>element</code> represents the closest common ancesstor of the nodes
in <code>range</code>, which - in most cases - is limited to one element, anyways.</p>
</dd>
<dt><a href="#AnnoTip">AnnoTip(settings)</a> ⇒ <code><a href="#AnnoTip">AnnoTip</a></code></dt>
<dd><p>Initialize the annotation engine</p>
</dd>
<dt><a href="#TextSelection">TextSelection(content, event, ranges)</a></dt>
<dd><p>A wrapper of relevant selection data, to be passed to <a href="#AnnoTip">AnnoTip</a>.</p>
</dd>
<dt><a href="#TextMonitor">TextMonitor(element, settings)</a></dt>
<dd><p>Initializes a text selection monitoring mechanis.about-content</p>
</dd>
</dl>

<a name="Anno"></a>

## Anno(context, selection, range, event, element)
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
        * [.applyAnnos(annos)](#AnnoTip+applyAnnos) ⇒ [<code>AnnoTip</code>](#AnnoTip)
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

### annoTip.applyAnnos(annos) ⇒ [<code>AnnoTip</code>](#AnnoTip)
Apply the list of annotatons to the page, so that they can be edited later.

**Kind**: instance method of [<code>AnnoTip</code>](#AnnoTip)  
**Returns**: [<code>AnnoTip</code>](#AnnoTip) - A self instance for chaining invocations.  

| Param | Type | Description |
| --- | --- | --- |
| annos | <code>Array.&lt;Object&gt;</code> | List of annotations in the same format, as they were created. |

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
Whether to install text selection monitoring. [TextMonitor](#TextMonitor).
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
<a name="TextSelection"></a>

## TextSelection(content, event, ranges)
A wrapper of relevant selection data, to be passed to [AnnoTip](#AnnoTip).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> | The plain text version of the selected content |
| event | <code>Event</code> | The event that triggered the selection (mouseup) |
| ranges | <code>Array.&lt;Range&gt;</code> | The array of ranges, that this selection occupies |


* [TextSelection(content, event, ranges)](#TextSelection)
    * [.getElement()](#TextSelection+getElement) ⇒ <code>Element</code>
    * [.getBoundingRect()](#TextSelection+getBoundingRect) ⇒ <code>DOMRect</code>
    * [.discard()](#TextSelection+discard) ⇒ [<code>TextSelection</code>](#TextSelection)

<a name="TextSelection+getElement"></a>

### textSelection.getElement() ⇒ <code>Element</code>
Returns the DOM element that wrapps the selection.

**Kind**: instance method of [<code>TextSelection</code>](#TextSelection)  
**Returns**: <code>Element</code> - The DOM element containing the entire selection.  
<a name="TextSelection+getBoundingRect"></a>

### textSelection.getBoundingRect() ⇒ <code>DOMRect</code>
Returns the bounding box of the selection.

**Kind**: instance method of [<code>TextSelection</code>](#TextSelection)  
**Returns**: <code>DOMRect</code> - The rectangle containing all elements & nodes of the selection.  
<a name="TextSelection+discard"></a>

### textSelection.discard() ⇒ [<code>TextSelection</code>](#TextSelection)
Discards the selection, i.e. - deselect.

**Kind**: instance method of [<code>TextSelection</code>](#TextSelection)  
**Returns**: [<code>TextSelection</code>](#TextSelection) - For chaining calls.  
<a name="TextMonitor"></a>

## TextMonitor(element, settings)
Initializes a text selection monitoring mechanis.about-content

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| element | <code>Element</code> | The parent DOM element to attach the whole text selection monitoring mechanism to. |
| settings | <code>Object</code> | Settings for monitoring. Check [defaults](#TextMonitor.defaults). |


* [TextMonitor(element, settings)](#TextMonitor)
    * _instance_
        * [.detach()](#TextMonitor+detach) ⇒ [<code>TextMonitor</code>](#TextMonitor)
    * _static_
        * [.defaults](#TextMonitor.defaults)
            * [.multipleNodes](#TextMonitor.defaults.multipleNodes)
            * [.onSelection](#TextMonitor.defaults.onSelection)

<a name="TextMonitor+detach"></a>

### textMonitor.detach() ⇒ [<code>TextMonitor</code>](#TextMonitor)
Detach the text selection monitoring mechanism.

**Kind**: instance method of [<code>TextMonitor</code>](#TextMonitor)  
**Returns**: [<code>TextMonitor</code>](#TextMonitor) - For chaining calls.  
<a name="TextMonitor.defaults"></a>

### TextMonitor.defaults
Default options.

**Kind**: static property of [<code>TextMonitor</code>](#TextMonitor)  

* [.defaults](#TextMonitor.defaults)
    * [.multipleNodes](#TextMonitor.defaults.multipleNodes)
    * [.onSelection](#TextMonitor.defaults.onSelection)

<a name="TextMonitor.defaults.multipleNodes"></a>

#### defaults.multipleNodes
Whether selections over more than one DOM element are allowed.

**Kind**: static property of [<code>defaults</code>](#TextMonitor.defaults)  
<a name="TextMonitor.defaults.onSelection"></a>

#### defaults.onSelection
Handler when a selection is detected. `function (TextSelection)`.

**Kind**: static property of [<code>defaults</code>](#TextMonitor.defaults)  
