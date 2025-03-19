import React from 'react'

/**
 * props:
 *  - onClose()
 */
function Tutorial({ onClose }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: 20, margin: '20px 0' }}>
      <h3>StoryQuest Tutorial</h3>
      <p>Welcome to StoryQuest! This is an interactive storytelling game.</p>
      <p>
        You can make choices at each step. Different choices lead to different
        story paths and endings.
      </p>
      <p>Try different paths to discover all the endings!</p>
      <button onClick={onClose}>Got it!</button>
    </div>
  )
}

export default Tutorial
