# Doubly Linked List — React Native

An interactive React Native app for visualising and operating on a doubly linked list. Insert, remove, and search nodes through a live UI that renders the list as a scrollable chain of connected nodes.

## Tech stack

- **React Native** 0.81 + **Expo** 54
- **TypeScript** 5.9 (strict mode)
- **Jest** + **ts-jest** for unit tests

## Prerequisites

- Node.js 18+
- Expo CLI (`npm install -g expo-cli`) or `npx`
- Expo Go app on your phone, or an iOS/Android simulator

## How to Run

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Start the Expo development server:**

   ```sh
   npx expo start
   ```

3. **Open on a device or simulator:**
   - Scan the QR code in the terminal with the Expo Go app (iOS / Android).
   - Or press `i` for iOS simulator, `a` for Android emulator, `w` for web.

## How to Test

**Automated unit tests** cover the full `DoublyLinkedList` core (33 cases):

```sh
npm test
```

**Manual testing** — use the UI to insert, remove, search, and visualise nodes. All operations update the visualisation and stat chips in real time.

## Project Structure

```
src/
├── core/
│   ├── DoublyLinkedList.ts   # data structure implementation
│   ├── LinkedListNode.ts     # generic node class
│   ├── types.ts              # INode / IDoublyLinkedList interfaces
│   └── __tests__/
│       └── DoublyLinkedList.test.ts
├── hooks/
│   └── useDoublyLinkedList.ts  # React adapter (useRef + useState)
├── components/               # shared UI primitives (Input, Button, Card…)
├── features/
│   ├── list-visualization/   # NodeView, ConnectionLines (SVG arrows)
│   ├── list-info/            # InfoPanel stat chips
│   └── list-operations/      # InsertControls, RemoveControls, SearchBar
└── theme.ts                  # design tokens (colors, spacing, radii…)
```

## Approach

### Core data structure

The doubly linked list lives in [`src/core/DoublyLinkedList.ts`](src/core/DoublyLinkedList.ts) as a plain TypeScript class that implements the [`IDoublyLinkedList<T>`](src/core/types.ts) interface. It is generic so it can hold any value type (the app uses `number`). Each node stores `value`, `next`, and `prev` pointers — no third-party library involved.

| Operation | Strategy |
| --- | --- |
| `insertHead` | Wire new node before current head; handle empty-list edge case |
| `insertTail` | Wire new node after current tail; handle empty-list edge case |
| `removeByIndex` | Walk to index, re-link neighbours, update head/tail if needed |
| `removeByValue` | Walk until match, re-link neighbours, update head/tail if needed |
| `removeDuplicates` | Single pass with a `Set` to track seen values; splice duplicates in-place |
| `search` | Linear scan; returns the zero-based index or `null` if not found |

### React integration

The class instance is held in a `useRef` so it is never recreated across renders. A separate `useState` snapshot (`nodes`, `head`, `tail`, `size`) is the only thing React tracks. Every mutating operation calls `updateState()` after it runs, which reads fresh data out of the ref and triggers a re-render. This keeps the mutable data structure decoupled from React's immutable state model. See [`src/hooks/useDoublyLinkedList.ts`](src/hooks/useDoublyLinkedList.ts).

### UI architecture

```
App
├── ListVisualizer      ← scrollable row of NodeView + ConnectionLines (SVG arrows)
├── InfoPanel           ← HEAD / TAIL / SIZE stat chips
└── ActionPanel
    ├── InsertControls  ← numeric Input + TouchableOpacity buttons
    ├── RemoveControls  ← numeric Input + TouchableOpacity buttons
    └── SearchBar       ← numeric Input + TouchableOpacity button
```

Styling is driven by a single [`src/theme.ts`](src/theme.ts) token file (colors, spacing, radii, shadows, font weights) so there are no magic numbers scattered through component files.

### Screenshot (Final result)

<img width="1179" height="2556" alt="Simulator Screenshot - iPhone 14 Pro - 2026-04-14 at 18 44 25" src="https://github.com/user-attachments/assets/2a15ee9b-42f9-4303-85cc-32506c60a8eb" />

