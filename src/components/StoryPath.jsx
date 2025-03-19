import React from 'react'

/**
 * props:
 *  - path: string[]
 */
function StoryPath({ path }) {
  if (!path || path.length === 0) {
    return null
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h4>Path</h4>
      <p>{path.join(' -> ')}</p>
    </div>
  )
}

export default StoryPath
