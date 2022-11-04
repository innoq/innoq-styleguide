## Navbar V2

This version of the INNOQ navbar has been built from the ground up with
accessibility in mind. The HTML structure for the navigation bar was tested
with a screenreader before the actual implementation with HTML, CSS and
JavaScript was begun.

The tests for the navbar can be found
[here](https://joyheron.com/a11y-playground/navbar.html).
Many thanks to Andreas Maier for his support with the testing.

This navbar was built using progressive enhancement. Each layer adds specific
functionality and improves the component without removing necessary
functionality. The following sections describe the design decisions that were
made in each layer.

### HTML: Providing the base functionality

The navigation consists of an unordered list (`<ul>`) of elements containing
either a link (`<a>`) to a page or a `<details>` disclosure widget containing
an unordered list of links representing the submenu for that specific topic.
At the HTML layer, we also add a
[skip link] before the navigation
region in order to allow a keyboard user to spring directly to the main content
area. For the INNOQ logo image and search icon, we add a `<span>` including a
textual label to ensure that these links are usable even when CSS is not
available.

We also have tried to ensure that the order of the items is intuitive when
navigating with the keyboard. For instance, the main navigation topics preceed
the list of links for changing the language within the HTML DOM. If and when
the logical order of the navigational items differs from the visual order
prescribed by the design, we can change the order using CSS in the next step.

[skip link]: https://webaim.org/techniques/skipnav/

The first version of the INNOQ Navbar included
_both_ a link to a topic page _and_ a toggle button which disclosed a submenu
of options. The content of the topic page was virtually identical to the list
of links provided by the submenu. In accessibility testing, this construct was
found to be confusing because both the link and the toggle button appear as
interactive elements in the accessibility tree (with almost identical
functionality). This finding was in alignment with other user feedback -- when
clicking on a link in the navbar, users expected a submenu dropdown to open and
were surprised when they instead navigated to a completely different page. For
these reasons, the link to the topic page was completely removed from the
navbar.

The decision to wrap the submenu links inside of a `<details>` disclosure
widget is unconventional because usually a
[Disclosure Navigation Menu](https://www.w3.org/WAI/ARIA/apg/example-index/disclosure/disclosure-navigation.html)
is implemented using HTML `<button>` elements with an `aria-expanded`
attribute corresponding to whether or not the submenu is expanded or collapsed.
However, the `<details>` element provides a similar functionality
out-of-the-box and is also exposed to assistive technologies in a way that is
intuitive to use.

Moreover, using the `<details>` element provides a valuable function to users
who do not have `JavaScript` activated or for whom
[JavaScript does not work](https://adamsilver.io/blog/javascript-isnt-always-available-and-its-not-the-users-fault/),
namely it hides a (theoretically) long submenu until the user has indicated
that they are interested in viewing it. This also should improve the usability
of the HTML only version of the site for users with cognitive difficulties
by making it easier to find the actual content of the page (the user no longer
has to scroll past a large list of links in order to reach the main content)
and by reducing the amount of visible information on a page that the user needs
to process before making a decision about what they want to do.

At the HTML layer, we also add a few ARIA roles and attributes in order to
improve the accessibility of the component. These include:

* Each unordered list of links has an `aria-label` attribute to let assistive
  technologies know what the list contains (e.g. the list of links for the
  submenu "Services" will be labelled `Services submenu`).
* The link to the current page in the navigation is marked with an
  `aria-current="page"` attribute.
* The link to the current language that is selected for the site is marked with
  an `aria-current="true"` attribute.
* We add a `role="list"` attribute to all navigation lists. This actually
  duplicates the default role of the list, but it is a fix to ensure that the
  list is still exposed as a list to assistive technologies even when we remove
  the list styling and change the `display` property.
  See: https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html

### CSS: Adding the design

The CSS layer adds the INNOQ corporate design on top of the HTML bones of the
navbar. The navbar was developed using a mobile-first approach to ensure that
it works for any given viewport and device.

We hide the [skip link] using CSS but ensure that it is shown to keyboard users
by disclosing it upon focus. We also visually hide the `<span>` labels that we
added to the INNOQ logo and search icons.

We ensure the navbar is accessible for **keyboard users** by adding clear focus
styles to the interactive elements. This is always the default, although we do
use the absense of the [focus-visible](https://caniuse.com/css-focus-visible)
pseudo-class where supported to identify user agents which do not require a
focus ring (e.g. when a user is navigating using a mouse) and then remove the
focus style.

We also ensure that the navbar is accessible for user agents with a
[**forced-colors**](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors)
mode. Our focus style uses a combination of the `border` and `outline` property
in order to draw a two-colored ring around an interactive element. In order to
reduce layout shift, all interactive elements have a transparent `border` by
default, but we remove it when `forced-colors` are active so that it doesn't
show up everywhere. We also add a small margin around the interactive elements
to ensure that the focus ring is correctly shown. We also determined that the
search icon and INNOQ logo are not consistently shown when a `forced-colors`
mode is activated, because we no longer control the color of the background of
the navbar. For this reason, we display the `<span>` labels for these images
when `forced-colors` mode is activated, even though these are visually hidden
for other user agents.

### JavaScript: Adding enhancements

The navbar includes two JavaScript components for enhancing the navbar.

By default, on smaller viewports the main navigation topics will always be
visible and vertically stacked. When JavaScript is activated, the
`<menu-toggle>` component will reveal a toggle button that can be used to
expand and collapse the navbar. The non-JavaScript version does take up some
vertical real estate, but because the desired layout differs quite a bit from
what a `<details>` element offers and because the main navigation only
includes six main navigation items, the extra JavaScript that would have been
required to progressively enhance the `<details>` element wasn't deemed to be
worth it.

The `<sub-menu>` component wraps around the `<details>` element containing the
submenu and progressively enhances it to replace the `<details>` element with
the more "conventional" toggle button which then expands and collapses the
menu. This enhancement is primarily because we then have more control over the
HTML DOM and can expand the menu on larger viewports when hovering over the
toggle button which is a behavior that users will expect. It also makes it
possible to add an animation for collapsing and expanding the menus.

Both of these toggle components use
[the same approach](https://nemzes.net/posts/animating-height-auto/) for
animating the collapsing and expanding of the content. However, since animation
on websites can trigger discomfort for certain user groups, we only activate
the animations if the user has specified no preference for
[**prefers-reduced-motion**](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).
