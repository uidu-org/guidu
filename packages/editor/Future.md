# Update november 2024

We have 3 plugins that collect options from each plugin to assemble them:

- quickInsert
- floatingToolbar
- typeAhead

So, each EditorPlugin exposes a `pluginsOptions` object that is used by the plugins above to assemble the options.


We should redefine the plugin folder structures in this way:
- proseMirrorPlugins
  - commands
  - keymaps
  - inputRules
  - pasteRules
- nodeViews
- ui

Right now we also have ui (for components) and utils (for helper functions)


# Desired API for editor

```jsx
const editor = useEditor({
  plugins: [],
  extensions: [],
});

return (
  <Editor editor={editor}>
    {({ renderToolbar, renderEditor }) => (
      <div>
        {renderToolbar()}
        {renderEditor()}
      </div>
    )}
  </Editor>
);
```

Every plugin should expose

- prosemirror-plugins (keymap, main, plugin-key, types, utils)
- nodeviews (defines how a component is renderered and edited within the editor)
- ui components for rendering nodeview
- commands
- utils?
