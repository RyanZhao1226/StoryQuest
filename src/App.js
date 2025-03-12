import React, { useState } from "react";
import StoryManager from "./components/StoryManager";
import { stories } from "./stories";

export default function App() {
  const [selectedStory, setSelectedStory] = useState(null);

  return (
    <div className="app">
      {!selectedStory ? (
        <div>
          <h1>StoryQuest</h1>
          {Object.keys(stories).map((id) => (
            <button key={id} onClick={() => setSelectedStory(id)}>
              {stories[id].title}
            </button>
          ))}
        </div>
      ) : (
        <StoryManager storyId={selectedStory} />
      )}
    </div>
  );
}
