import React, { useState, useEffect } from 'react'
import StoryList from './components/StoryList'
import Tutorial from './components/Tutorial'
import GameScreen from './components/GameScreen'
import StoryCRUD from './components/StoryCRUD'
import { getStories, getProgress, saveProgress } from './services/firestore'

function App() {
  // View mode
  const [view, setView] = useState('list')

  // Whether to display the tutorial
  const [showTutorial, setShowTutorial] = useState(true)

  // Currently selected story, node, and path
  const [currentStory, setCurrentStory] = useState(null)
  const [currentNode, setCurrentNode] = useState(null)
  const [path, setPath] = useState([])

  // Progress object to store discovered endings
  const [progress, setProgress] = useState(null)

  // Store all story data
  const [allStories, setAllStories] = useState([])

  // Fetch all stories and user progress from Firestore
  useEffect(() => {
    async function fetchData() {
      const stories = await getStories()
      setAllStories(stories)
    }
    fetchData()

    // Load user progress
    async function loadUserProgress() {
      const saved = await getProgress()
      if (saved) {
        if (!saved.discoveredEndings) {
          saved.discoveredEndings = {}
        }
        setProgress(saved)
      } else {
        // If there is no progress document, initialize an empty object
        setProgress({
          discoveredEndings: {}
        })
      }
    }
    loadUserProgress()
  }, [])

  /** Close the tutorial */
  function handleCloseTutorial() {
    setShowTutorial(false)
  }

  /** Enter the "Manage Stories" interface */
  function handleManageStories() {
    setView('manage')
  }

  /** Close the "Manage Stories" interface and return to the story list */
  function handleCloseCRUD() {
    setView('list')
  }

  /**
   * User selects a story from StoryList
   * @param {string} storyId Story document ID
   * @param {string} mode 'new' or 'resume'
   */
  async function handleSelectStory(storyId, mode) {
    const story = allStories.find(s => s.id === storyId)
    if (!story) {
      alert('Story not found!')
      return
    }

    if (mode === 'new') {
      if (!story.nodes || story.nodes.length === 0) {
        alert('No nodes in this story!')
        return
      }
      const startNode = story.nodes[0]
      setCurrentStory(story)
      setCurrentNode(startNode)
      setPath([startNode.id])

      const updatedProgress = {
        ...(progress || { discoveredEndings: {} }),
        storyId: story.id,
        nodeId: startNode.id,
        path: [startNode.id]
      }
      setProgress(updatedProgress)
      await saveProgress(updatedProgress)

      setView('game')
    } else {
      // Resume game: Load from progress
      if (!progress) {
        alert('Progress not loaded yet.')
        return
      }

      // If no progress exists or the storyId does not match, start a new game
      if (!progress.storyId || progress.storyId !== story.id) {
        alert('No saved progress for this story, starting a new game.')
        handleSelectStory(storyId, 'new')
        return
      }

      // Restore progress
      const nodeId = progress.nodeId
      const foundNode = story.nodes.find(n => n.id === nodeId)
      setCurrentStory(story)
      setCurrentNode(foundNode || story.nodes[0]) // Default to the first node if not found
      setPath(progress.path || [foundNode?.id])

      setView('game')
    }
  }

  /**
   * Make a choice in the game
   * @param {string} nextNodeId The ID of the next node
   */
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
    // 2) If discoveredEndings[currentStory.id] is not initialized, set it to an empty array
    if (!updatedProgress.discoveredEndings[currentStory.id]) {
      updatedProgress.discoveredEndings[currentStory.id] = []
    }
    // 3) Check if this is an ending (no choices or choices.length === 0)
    if (!nextNode.choices || nextNode.choices.length === 0) {
      // If this ending node ID has not been recorded yet, add it
      if (!updatedProgress.discoveredEndings[currentStory.id].includes(nextNode.id)) {
        updatedProgress.discoveredEndings[currentStory.id].push(nextNode.id)
      }
    }

    setProgress(updatedProgress)
    await saveProgress(updatedProgress)
  }

  /**
   * Restart the game: Start from the first node again
   */
  async function handleRestart() {
    if (!currentStory || !currentStory.nodes || currentStory.nodes.length === 0) return
    if (!progress) return

    const startNode = currentStory.nodes[0]
    setCurrentNode(startNode)
    setPath([startNode.id])

    // Keep discoveredEndings unchanged
    const updatedProgress = {
      ...progress,
      storyId: currentStory.id,
      nodeId: startNode.id,
      path: [startNode.id]
    }
    setProgress(updatedProgress)
    await saveProgress(updatedProgress)
  }

  const totalEndingsDiscovered = Object.values(progress?.discoveredEndings || {}).reduce(
    (total, endingsArr) => total + endingsArr.length,
    0
  )

  // Render different views based on the view state
  if (view === 'manage') {
    return (
      <StoryCRUD onCloseCRUD={handleCloseCRUD} />
    )
  }

  if (view === 'game') {
    // Game interface
    return (
      <div style={{ padding: 20 }}>
        {/* Optionally display the tutorial if not closed yet */}
        {showTutorial && <Tutorial onClose={handleCloseTutorial} />}
        
        <GameScreen
          storyTitle={currentStory?.title || 'Untitled'}
          node={currentNode}
          path={path}
          onChoice={handleChoice}
          onRestart={handleRestart}
        />
        {/* Back to Story List button */}
        <button style={{ marginTop: 20 }} onClick={() => setView('list')}>
          Back to Story List
        </button>
      </div>
    )
  }

  // Default: Story list interface
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ textAlign: 'center' }}>StoryQuest</h1>
      {showTutorial && <Tutorial onClose={handleCloseTutorial} />}
      <p style={{ textAlign: 'center' }}>Total Endings Discovered: {totalEndingsDiscovered}</p>
      <StoryList
        onSelect={handleSelectStory}
        onManageStories={handleManageStories}
      />
    </div>
  )
}

export default App
