import React from 'react'
import StoryPath from './StoryPath'

/**
 * Props:
 *  - storyTitle
 *  - node: { id, text, choices?: [{label, next}] }
 *  - path: string[]
 *  - onChoice(nextNodeId)
 *  - onRestart()
 */
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

export default GameScreen