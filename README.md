## How to Run the App

1. **Install dependencies:**

   ```sh
   npm install
   # or
   yarn install
   ```

2. **Start the Expo development server:**

   ```sh
   npx expo start
   # or
   yarn expo start
   ```

3. **Run on your device or simulator:**
   - Use the QR code in the terminal or browser to open the app on your phone with the Expo Go app.
   - Or press `i` to launch the iOS simulator, `a` for Android emulator, or `w` for web.

## How to Test

1. **Manual Testing:**
   - Use the UI to insert, remove, search, and visualize nodes in the doubly linked list.
   - All operations should update the visualization and state display in real time.

2. **Automated Tests:**
   - (If you add tests) Run:
     ```sh
     npm test
     # or
     yarn test
     ```

## Approach

### Core data structure

The doubly linked list lives in [`src/core/DoublyLinkedList.ts`](src/core/DoublyLinkedList.ts) as a plain TypeScript class that implements the [`IDoublyLinkedList<T>`](src/core/types.ts) interface. It is generic, so it can hold any value type (the app uses `number`). Each node stores `value`, `next`, and `prev` pointers — no third-party library involved.

Supported operations:

| Operation          | Strategy                                                                  |
| ------------------ | ------------------------------------------------------------------------- |
| `insertHead`       | Wire new node before current head; handle empty-list edge case            |
| `insertTail`       | Wire new node after current tail; handle empty-list edge case             |
| `removeByIndex`    | Walk to index, re-link neighbors, update head/tail if needed              |
| `removeByValue`    | Walk until match, re-link neighbors, update head/tail if needed           |
| `removeDuplicates` | Single pass with a `Set` to track seen values; splice duplicates in-place |
| `search`           | Linear scan; returns the zero-based index or `null` if not found          |

### React integration

The class instance is held in a `useRef` so it is never recreated across renders. A separate `useState` snapshot (`nodes`, `head`, `tail`, `size`) is the only thing React tracks. Every mutating operation calls `updateState()` after it runs, which reads fresh data out of the ref and triggers a re-render. This keeps the mutable data structure decoupled from React's immutable state model. See [`src/hooks/useDoublyLinkedList.ts`](src/hooks/useDoublyLinkedList.ts).

### UI architecture

```
App
├── ListVisualizer      ← scrollable row of NodeView + ConnectionLines (SVG arrows)
├── InfoPanel           ← HEAD / TAIL / SIZE stat chips
└── ActionPanel
    ├── InsertControls  ← shared Input + Button components
    ├── RemoveControls  ← shared Input + Button components
    └── SearchBar       ← shared Input + Button components
```

Styling is driven by a single [`src/theme.ts`](src/theme.ts) token file (colors, spacing, radii, shadows, font weights) so there are no magic numbers scattered through component files.
