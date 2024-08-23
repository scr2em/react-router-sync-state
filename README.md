Here's a full documentation for the `react-router-sync-state` package:


A collection of React hooks for managing state in the URL search parameters.

## Installation

To install the package, run the following command:

```
npm install @scr2em/react-router-sync-state
```

## Usage

This package provides several hooks to manage different types of state in the URL:

1. `useStringState`
2. `useNumberState`
3. `useBooleanState`
4. `useMultiStringState`
5. `useMultiNumberState`

Each hook allows you to synchronize state with URL search parameters, providing a seamless way to manage application state through the URL.

### useStringState

This hook manages a string value in the URL.

```typescript
import { useStringState } from '@scr2em/react-router-sync-state';

function StringExample() {
  const { value, set } = useStringState("name", {
    defaultValue: "john",
  });

  return (
      <input
        value={value}
        type="text"
        onInput={(e) => {
            set(e.target.value as string);
        }}
      />
  );
}
```

### useNumberState

This hook manages a number value in the URL.

```typescript
import { useNumberState } from '@scr2em/react-router-sync-state';

function NumberExample() {
  const { value, set } = useNumberState("page", { defaultValue: 1 });

  return (
      <input
        value={value}
        type="number"
        onInput={(e) => {
            set(Number(e.target.value));
        }}
      />
  );
}
```

### useBooleanState

This hook manages a boolean value in the URL.

```typescript
import { useBooleanState } from '@scr2em/react-router-sync-state';

function BooleanExample() {
  const { value, toggle, set } = useBooleanState("toggle", { defaultValue: true });

  return (
    <div>
      <h1>Boolean State: {value.toString()}</h1>
      <button onClick={() => toggle()}>Toggle</button>
    </div>
  );
}
```

### useMultiStringState

This hook manages an array of strings in the URL.

```typescript
import { useMultiStringState } from '@scr2em/react-router-sync-state';

function MultiStringExample() {
  const { value, set } = useMultiStringState("tags", {
    defaultValue: ["react", "hooks"],
    delimiter: ","
  });

  return (
    <div>
      {value.map((tag, index) => (
        <span key={index}>{tag}</span>
      ))}
      <button onClick={() => set([...value, "newTag"])}>Add Tag</button>
    </div>
  );
}
```

### useMultiNumberState

This hook manages an array of numbers in the URL.

```typescript
import { useMultiNumberState } from '@scr2em/react-router-sync-state';

function MultiNumberExample() {
  const { value, set } = useMultiNumberState("ids", {
    defaultValue: [1, 2, 3],
    delimiter: "-"
  });

  return (
    <div>
      {value.map((id, index) => (
        <span key={index}>{id}</span>
      ))}
      <button onClick={() => set([...value, value.length + 1])}>Add ID</button>
    </div>
  );
}
```

## API Reference

Each hook returns an object with the following properties:

- `value`: The current value of the state.
- `set`: A function to update the state value.
- `toggle`: (Only for `useBooleanState`) A function to toggle the boolean value.

Each hook accepts the following parameters:

1. `searchParamName`: The name of the URL search parameter to use.
2. `options`: An object containing:
   - `defaultValue`: The default value to use when the URL parameter is not set.
   - `delimiter`: (Only for multi-value hooks) The delimiter to use when joining/splitting array values in the URL.

## Notes

- The hooks automatically sync the state with the URL, updating the URL when the state changes and vice versa.
- When the state is set to its default value, the corresponding URL parameter is removed to keep the URL clean.
- Invalid URL parameters are automatically removed and replaced with the default value.

## Requirements

This package requires React 18 or later and react-router-dom 6 or later as peer dependencies.

## License

This project is licensed under the ISC License.