# Contributing

Thank you for your time to contributing this project!

Any contribution are welcome, whether it's just a small code changes or just
giving a star to the repository.

Here are some contribution you can do:

- Add new theme
- Improve code quality
- Improve website UI
- Improve README or Fix Typos

See [How to Contribute](#how-to-contribute) section to guide you how to
contribute this project.

## Add New Theme

There is some theme that are already available:

- [Rosé Pine](https://rosepinetheme.com/) (main and Dawn theme)
- [Catppuccin](https://github.com/catppuccin) (Mocha theme)
- [Dracula](https://draculatheme.com/)

To add a new theme, copy the
[default theme in JSON](assets/themes/default.json) and change the file name
to the exact theme name like `catppuccin-mocha.json` for example. And then
change the hex color code inside JSON to your color theme with the
appropriate key.

In `index.html`, add new theme option in `select` element, it's grouped between
dark and light theme, so you need to place the right color theme. And add `value`
attribute with the value of the file name. For example, if the file name of
the theme is `catppuccin-mocha.json`, then the value of `value` attribute
is `catppuccin-mocha`. So make sure the value of `value` attribute is the exact
same as the file name (without `.json`).

Here is the example:

```html
<select id="themes">
  <optgroup label="Dark Theme">
    <option value="default" selected>Default</option>
    <option value="rose-pine">Rose Pine</option>
    <option value="catppuccin-mocha">Catppuccin Mocha</option>
    <! -- Add your new dark theme here -->
  </optgroup>
  <optgroup label="Light Theme">
    <option value="rose-pine-dawn">Rose Pine Dawn</option>
    <! -- Add your new light theme here -->
  </optgroup>
</select>
```

## Improve Code Quality

The code is really messy. Since lack of knowledge, it's just "works".
Any improvement for code quality are very appreciated to making a cleaner,
minimal, and readable code.

## Improve Website UI

By now, the UI are just a copy of the
[original website](https://thomashunter.name/i3-configurator) with a little
responsive. Any UI improvement is welcome to make it more minimal and
easier to navigate.

## Improve README or Fix Typos

English are not the native language of this repository maintainer. So you may
have found some typo or grammar mistake. Small changes like typos or improving
the README are also helped the others to understand the context.

## How to Contribute

- Don't use formatters such as Prettier or ESLint on your editor. These
  formatters can mess up the code style.
- Use 2 spaces for indentation.
- Save files in UTF-8 encoding and LF (Unix) end-of-line format (EOL).
- Double check all code changes or typo before submitting a pull request.
- Open a pull request and provide clear and concise information in description.

## Documentation

Here are some documentation for the code and the theme configuration to learn
more:

- [i3 user guide](https://i3wm.org/docs/userguide.html)
- [i3status](https://i3wm.org/docs/i3status.html)
- [Input color](https://developer.mozilla.org/docs/Web/HTML/Element/Input/color)
- [`dataset` property](https://developer.mozilla.org/docs/Web/API/HTMLElement/dataset)
- [Change event](https://developer.mozilla.org/docs/Web/API/HTMLElement/change_event)
- [Load event](https://developer.mozilla.org/docs/Web/API/Window/load_event)
