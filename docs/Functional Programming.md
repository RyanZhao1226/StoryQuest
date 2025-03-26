## Functional Programming Principles

### 1. **Pure Functions**

**Example from `StoryList.jsx`:**

```javascript
{filteredStories.map((story) => {
          const discoveredList =
            progress?.discoveredEndings?.[story.id] || []
          const discoveredCount = discoveredList.length
          const totalCount = story.endingsCount || 0
```

**Explanation:** This function takes in `progress` and `story.id`, and always returns the same count without side effects — a pure function.

**Counter Example:**

```javascript
let total = 0;
function countEndings(storyId) {
  total += progress[storyId].length; // Mutates external variable
  return total;
}
```

---

### 2. **Immutability**

**Example from `App.jsx`:**

```javascript
async function handleChoice(nextNodeId) {
    if (!currentStory) return
    if (!progress) return

    const nextNode = currentStory.nodes.find(n => n.id === nextNodeId)
    if (!nextNode) {
      alert('Node not found!')
      return
    }

    const newPath = [...path, nextNode.id]
    setCurrentNode(nextNode)
    setPath(newPath)

    // Update discoveredEndings
    // 1) Copy progress
    const updatedProgress = {
      ...progress,
      storyId: currentStory.id,
      nodeId: nextNode.id,
      path: newPath,
      discoveredEndings: {
        ...(progress.discoveredEndings || {})
      }
    }
```

**Explanation:** Use the spread operator (...) to create new objects and new arrays instead of directly modifying existing progress and path, ensuring that data is immutable.

**Counter Example:**

```javascript
function handleChoice(nextNodeId) {
  currentStory.nodes.forEach(n => {
    if (n.id === nextNodeId) {
      progress.nodeId = n.id
      path.push(n.id)
      if (!progress.discoveredEndings[currentStory.id]) {
        progress.discoveredEndings[currentStory.id] = []
      }
      progress.discoveredEndings[currentStory.id].push(n.id)
    }
  })
}
```

---

### 3. **First-Class Functions**

**Example from `App.jsx`:**

```javascript
<GameScreen
          storyTitle={currentStory?.title || 'Untitled'}
          node={currentNode}
          path={path}
          onChoice={handleChoice}
          onRestart={handleRestart}
        />
```

**Explanation:** `handleChoice` and `handleRestart` are passed as parameters to GameScreen

**Counter Example:**

```javascript
function GameScreen({ storyTitle, node }) {
  const handleRestart = () => {
    console.log('Restarting game')
  }
  
  return (
    <div>
      <h2>{storyTitle}</h2>
      <p>{node.text}</p>
      <button onClick={handleRestart}>Restart</button>
    </div>
  )
}
```

---

### 4. **Higher-Order Functions**

**Example from `StoryList.jsx`:**

```javascript
stories.map((story) => (
  <div key={story.id}>{story.title}</div>
));
```

**Explanation:** `map` is a higher-order function that takes a function as an argument and returns a new array.

**Counter Example:**

```javascript
const rendered = [];
for (let i = 0; i < stories.length; i++) {
  rendered.push(<div>{stories[i].title}</div>);
}
```

---

### 5. **Declarative over Imperative**

**Example from `GameScreen.jsx`:**

```javascript
function GameScreen({ storyTitle, node, path, onChoice, onRestart }) {
  if (!node) {
    return <div>Loading...</div>
  }

  const isEnding = !node.choices || node.choices.length === 0

  return (
    <div style={{ border: '1px solid #ccc', padding: 20 }}>
      <h2>{storyTitle}</h2>

      {/* If this is an ending, display only the ending text */}
      {isEnding ? (
        <>
          <h3>Ending</h3>
          <p>{node.text}</p>
          <button onClick={onRestart}>Restart</button>
        </>
      ) : (
        <>
          <p>{node.text}</p>
          {node.choices.map((choice, index) => (
            <div key={index} style={{ marginBottom: '8px' }}>
              <button onClick={() => onChoice(choice.next)}>
                {choice.label}
              </button>
            </div>
          ))}
          <button onClick={onRestart}>Restart</button>
        </>
      )}

      {/* Display the path the player has taken */}
      <StoryPath path={path} />
    </div>
  )
}
```

**Explanation:** JSX is used to declaratively describe how the UI should be rendered based on state changes without manually manipulating the DOM.

**Counter Example:**

```javascript
function updateGameScreen(node) {
  const container = document.getElementById('game-container')
  container.innerHTML = ''

  if (!node.choices || node.choices.length === 0) {
    const endingTitle = document.createElement('h3')
    endingTitle.textContent = 'Ending'
    container.appendChild(endingTitle)
    const text = document.createElement('p')
    text.textContent = node.text
    container.appendChild(text)
  } else {
    const text = document.createElement('p')
    text.textContent = node.text
    container.appendChild(text)
    node.choices.forEach(choice => {
      const btn = document.createElement('button')
      btn.textContent = choice.label
      btn.onclick = () => console.log('Choice made')
      container.appendChild(btn)
    })
  }
}
```

---

## Functional Array Methods in Use

### 1. **`.map()` **

**Example from `StoryList.jsx`:**

```javascript
return (
  <div>
    {stories.map((story) => (
      <div key={story.id}>
        <h4>{story.title}</h4>
        <button onClick={() => onSelect(story.id, 'new')}>New</button>
        <button onClick={() => onSelect(story.id, 'resume')}>Resume</button>
      </div>
    ))}
  </div>
)
```

**Explanation:** The `.map()` method transforms each item in the `stories` array into a JSX element. This approach is concise and declarative—it expresses "what" should be rendered rather than "how" to iterate over the array.

**Counter Example:**

```javascript
// Imperative approach using a for loop to build the elements array
let storyElements = [];
for (let i = 0; i < stories.length; i++) {
  storyElements.push(
    <div key={stories[i].id}>
      <h4>{stories[i].title}</h4>
      <button onClick={() => onSelect(stories[i].id, 'new')}>New</button>
      <button onClick={() => onSelect(stories[i].id, 'resume')}>Resume</button>
    </div>
  );
}
return <div>{storyElements}</div>;
```

---

### 2. **`.filter()` **

**Example from `StoryList.jsx`:**

```javascript
// In StoryList.jsx, filtering stories that have an endingsCount property
const filteredStories = stories.filter(story => 
	story.endingsCount !== undefined);
```

**Explanation:** The `.filter()` method creates a new array that includes only those stories meeting the condition (i.e., having an `endingsCount` defined). It cleanly abstracts the iteration and condition check, making the code more readable and expressive.

**Counter Example:**

```javascript
// Imperative approach using a for loop to filter the stories
let filteredStories = [];
for (let i = 0; i < stories.length; i++) {
  if (stories[i].endingsCount !== undefined) {
    filteredStories.push(stories[i]);
  }
}
```

---

### 3. **`.reduce()` **

**Example from `App.jsx`:**

```javascript
// In App.jsx, using reduce to sum up all discovered endings
const totalEndingsDiscovered = Object.values(progress?.discoveredEndings || {}).reduce(
  (total, endingsArr) => total + endingsArr.length,
  0
);
```

**Explanation:** The `.reduce()` method aggregates the total count of discovered endings by summing the lengths of arrays contained in the `discoveredEndings` object. 

**Counter Example:**

```javascript
// Imperative approach using a for loop for aggregation
let total = 0;
const endingsValues = Object.values(progress?.discoveredEndings || {});
for (let i = 0; i < endingsValues.length; i++) {
  total += endingsValues[i].length;
}
```

---

# Design Patterns in Code

### 1. **Singleton Pattern — Firebase Config**

**Example:**

```javascript
// firebaseConfig.js
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
```

**Explanation:** Ensures only one Firestore instance, no shared mutable state across modules.

**Counter Example:**

```javascript
const db1 = initializeApp(config1);
const db2 = initializeApp(config2); // Conflicting instances
```

---

### 2. **Module Pattern**

**Example (`App.jsx`):**

```javascript
// In App.jsx, components are imported from separate files:
import GameScreen from './components/GameScreen'
import StoryList from './components/StoryList'
import Tutorial from './components/Tutorial'
```

**Explanation:** This example demonstrates the module pattern by organizing the application into distinct modules (each component in its own file). Each module encapsulates its functionality and exposes only what is necessary via exports. This improves code readability, maintainability, and reusability, as every module focuses on a single responsibility.

**Counter Example:**

```javascript
// Counter Example: All components are defined in a single file,
// leading to tightly coupled code that's hard to maintain.
function App() {
  // GameScreen, StoryList, Tutorial components are all declared inline here.
  // The code becomes large and intertwined, making reuse or independent testing difficult.
}
```

---

### 3. **Factory Pattern — Story Node Creator**

**Example:**

```javascript
function createNode(id, text, choices = []) {
  return {
    id,
    text,
    choices,
    isEnding: choices.length === 0
  }
}
```

**Explanation:** Used to standardize node structure and improve reusability by encapsulating the creation logic in one place.

**Counter Example:**

```javascript
// Directly constructing node objects in multiple places without using a factory function
const node1 = {
  id: "node1",
  text: "Welcome to the game.",
  choices: [],
  isEnding: true
};

const node2 = {
  id: "node2",
  text: "Choose your path.",
  choices: [{ label: "Go Left", next: "node3" }],
  isEnding: false
};

// In another part of the code, similar objects are created again manually:
const node3 = {
  id: "node3",
  text: "You have reached a fork in the road.",
  choices: [{ label: "Turn Right", next: "node4" }],
  isEnding: false
};
```
