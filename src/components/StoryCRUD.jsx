import React, { useEffect, useState } from 'react'
import {
  getStories,
  createStory,
  updateStory,
  deleteStory
} from '../services/firestore'


function createNode(id, text, choices = []) {
  return {
    id,
    text,
    choices,
    isEnding: choices.length === 0
  }
}

/**
 * Props:
 *  - onCloseCRUD(): Called when clicking the "Back" button to switch back to the story list
 */
function StoryCRUD({ onCloseCRUD }) {
  const [stories, setStories] = useState([])
  const [editingStory, setEditingStory] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [endingsCount, setEndingsCount] = useState(0)
  const [nodesText, setNodesText] = useState('[]') // Edit as a JSON string

  // Retrieve all stories
  async function loadStories() {
    const data = await getStories()
    setStories(data)
  }

  useEffect(() => {
    loadStories()
  }, [])

  // Start editing a story
  function handleEdit(story) {
    setEditingStory(story)
    setTitle(story.title || '')
    setDescription(story.description || '')
    setEndingsCount(story.endingsCount || 0)
    setNodesText(JSON.stringify(story.nodes || [], null, 2))
  }

  // Create or update a story
  async function handleSave() {
    const parsedNodesRaw = safeParseJSON(nodesText)
    const parsedNodes = parsedNodesRaw.map(node =>
      createNode(node.id, node.text, node.choices)
    )
    const storyData = {
      title,
      description,
      endingsCount: Number(endingsCount),
      nodes: parsedNodes
    }

    if (editingStory) {
      await updateStory(editingStory.id, storyData)
    } else {
      await createStory(storyData)
    }

    // Refresh the list and clear the form after saving
    await loadStories()
    handleCancel()
  }

  // Delete a story
  async function handleDelete(storyId) {
    if (!window.confirm('Are you sure you want to delete this story?')) return
    await deleteStory(storyId)
    loadStories()
  }

  // Cancel editing
  function handleCancel() {
    setEditingStory(null)
    setTitle('')
    setDescription('')
    setEndingsCount(0)
    setNodesText('[]')
  }

  // Safely parse JSON
  function safeParseJSON(str) {
    try {
      return JSON.parse(str)
    } catch (e) {
      alert('Invalid JSON format in nodes. Please check.')
      return []
    }
  }

  return (
    <div style={{ border: '1px solid #ccc', padding: 20 }}>
      <h2>Manage Stories</h2>
      <button onClick={onCloseCRUD}>Back</button>

      <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
        {/* Left side: Story list */}
        <div style={{ flex: 1 }}>
          <h3>Stories</h3>
          <ul>
            {stories.map(story => (
              <li key={story.id} style={{ marginBottom: '8px' }}>
                <strong>{story.title}</strong>
                <button onClick={() => handleEdit(story)} style={{ marginLeft: '8px' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(story.id)} style={{ marginLeft: '8px' }}>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right side: Edit/Create form */}
        <div style={{ flex: 1 }}>
          <h3>{editingStory ? 'Edit Story' : 'Create Story'}</h3>
          <div>
            <label>Title: </label>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Description: </label>
            <input
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Endings Count: </label>
            <input
              type="number"
              value={endingsCount}
              onChange={e => setEndingsCount(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Nodes (JSON):</label>
            <textarea
              rows={8}
              value={nodesText}
              onChange={e => setNodesText(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          <button onClick={handleSave}>
            {editingStory ? 'Update' : 'Create'}
          </button>
          <button onClick={handleCancel} style={{ marginLeft: '8px' }}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoryCRUD