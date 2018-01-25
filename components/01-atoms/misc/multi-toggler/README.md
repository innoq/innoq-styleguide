Toggles a class on elements.

Expects arguments:

- `data-target`: Selector for Elements which shall be toggled upon
- `data-target-next`: Add next sibling element to targets
- `data-toggle-class`: the className which shall be toggled on targets
- `data-toggle-on-init`: Toggle targets on init
- `data-init-class`: add this class initially to targets

- `data-toggle-self-class`: the className which shall be toggled on the toggler itself
- `data-init-self-class`: a className this toggler should get on itself on init

Example:

```html
<multi-toggler data-target=".one-thing, .other-thing" data-toggle-class="toggled">
</multi-toggler>
```
