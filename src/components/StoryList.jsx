import React, { useEffect, useState } from 'react'
import { getStories, getProgress } from '../services/firestore'

function StoryList({ onSelect, onManageStories }) {
  const [stories, setStories] = useState([])
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    async function fetchData() {
      const allStories = await getStories()
      setStories(allStories)


      const userProgress = await getProgress()
      setProgress(userProgress)
    }
    fetchData()
  }, [])

  const filteredStories = stories.filter(story => story.endingsCount !== undefined)

  return (
    <div style={{ border: '1px solid #ccc', padding: 20, textAlign: 'center' }}>
      <h2>StoryQuest</h2>
      <p>Please choose your story</p>

      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        {filteredStories.map((story) => {
          const discoveredList =
            progress?.discoveredEndings?.[story.id] || []
          const discoveredCount = discoveredList.length
          const totalCount = story.endingsCount || 0

          return (
            <div
              key={story.id}
              style={{ border: '1px solid #aaa', padding: 10, width: 100 }}
            >
              <h4>{story.title}</h4>
              <p>Endings: {discoveredCount} / {totalCount}</p>
              <button onClick={() => onSelect(story.id, 'new')}>New</button>
              <button onClick={() => onSelect(story.id, 'resume')}>Resume</button>
            </div>
          )
        })}
      </div>

      <button style={{ marginTop: 20 }} onClick={onManageStories}>
        Manage Stories
      </button>
    </div>
  )
}

export default StoryList