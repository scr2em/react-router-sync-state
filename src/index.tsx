import { useQueryBooleanState } from "./useBooleanState";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useNumberState } from "./useNumberState";
import { useMultiNumberState } from "./useMultiNumberState";
import { useStringState } from "./useStringState";

function BooleanExample() {
  const { value, toggle } = useQueryBooleanState("toggle", { defaultValue: true });

  return (
    <div>
      <h1>Boolean State: {value.toString()}</h1>
      <button onClick={() => toggle()}>Toggle</button>
    </div>
  );
}

function NumberExample() {
  const { value, set } = useNumberState("ip", { defaultValue: 124 });

  return (
    <div>
      <input
        value={value}
        type="number"
        onInput={(e) => {
          if ("value" in e.target) {
            set(Number(e.target.value));
          }
        }}
      />
    </div>
  );
}

function MultiNumberExample() {
  const { value, set } = useMultiNumberState("ids", { defaultValue: [1, 2, 3], delimiter: "-" });

  return (
    <div>
      {value.map((x) => (
        <div>id: {x}</div>
      ))}

      <input
        type="checkbox"
        value="1"
        checked={value.includes(1)}
        onChange={(e) => {
          if (e.target.checked) {
            set([...value, 1]);
          } else {
            set(value.filter((x) => x !== 1));
          }
        }}
      />

      <input
        type="checkbox"
        value="2"
        checked={value.includes(2)}
        onChange={(e) => {
          if (e.target.checked) {
            set([...value, 2]);
          } else {
            set(value.filter((x) => x !== 2));
          }
        }}
      />

      <input
        type="checkbox"
        value="3"
        checked={value.includes(3)}
        onChange={(e) => {
          if (e.target.checked) {
            set([...value, 3]);
          } else {
            set(value.filter((x) => x !== 3));
          }
        }}
      />
    </div>
  );
}

function StringExample() {
  const { value, set } = useStringState("name", { defaultValue: "mohamed" });

  return (
    <div>
      <input
        value={value}
        type="text"
        onInput={(e) => {
          if ("value" in e.target) {
            set(e.target.value as string);
          }
        }}
      />
    </div>
  );
}

function App() {
  return (
    <div>
      <BooleanExample />
      <hr />
      <NumberExample />
      <hr />
      <MultiNumberExample />
      <hr />
      <StringExample />
    </div>
  );
}

const root = createRoot(document.getElementById("root") as HTMLElement);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

root.render(<RouterProvider router={router} />);
root.render(<RouterProvider router={router} />);
