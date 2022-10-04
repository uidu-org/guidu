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
