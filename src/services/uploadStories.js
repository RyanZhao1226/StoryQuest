import { createStory } from './firestore.js'
import process from 'process'

// Sample story data to be uploaded in one batch
const sampleStories = [
  {
    title: 'The Lost Treasure',
    description: 'Embark on an adventure to find the lost treasure.',
    endingsCount: 4,
    nodes: [
      {
        id: 'start',
        text: 'You are at the beginning of your adventure. Will you enter the dark forest or climb the mountain?',
        choices: [
          { label: 'Enter the forest', next: 'forest' },
          { label: 'Climb the mountain', next: 'mountain' }
        ]
      },
      {
        id: 'forest',
        text: 'In the forest, you encounter mysterious creatures. Will you befriend them or run away?',
        choices: [
          { label: 'Befriend them', next: 'befriend' },
          { label: 'Run away', next: 'lost' }
        ]
      },
      {
        id: 'mountain',
        text: 'On the mountain, you find a cave. Will you explore the cave or keep climbing?',
        choices: [
          { label: 'Explore the cave', next: 'cave' },
          { label: 'Keep climbing', next: 'peak' }
        ]
      },
      {
        id: 'befriend',
        text: 'The mysterious creatures lead you to the hidden treasure. You win!',
        choices: []
      },
      {
        id: 'lost',
        text: 'You get lost in the forest, and your adventure ends here.',
        choices: []
      },
      {
        id: 'cave',
        text: 'Inside the cave, you discover ancient artifacts. You win!',
        choices: []
      },
      {
        id: 'peak',
        text: 'At the mountain peak, you feel nothing but the freezing wind. Game over.',
        choices: []
      }
    ]
  },
  {
    title: 'Underground Maze',
    description: 'Venture into the underground maze in search of the legendary crystal.',
    endingsCount: 3,
    nodes: [
      {
        id: 'start',
        text: 'You stand at the entrance of the maze, surrounded by darkness. Will you light a torch to move forward or rest here?',
        choices: [
          { label: 'Light a torch', next: 'torch' },
          { label: 'Rest here', next: 'rest' }
        ]
      },
      {
        id: 'torch',
        text: 'The torchlight reveals a staircase leading deeper underground. Will you go down the stairs or turn left?',
        choices: [
          { label: 'Go down the stairs', next: 'lowerFloor' },
          { label: 'Turn left', next: 'leftTurn' }
        ]
      },
      {
        id: 'rest',
        text: 'As you wait, a monster appears and defeats you. Game over.',
        choices: []
      },
      {
        id: 'lowerFloor',
        text: 'You find the legendary crystal in the deeper chambers. Congratulations!',
        choices: []
      },
      {
        id: 'leftTurn',
        text: 'A deadly trap awaits on the left, and you fall into a deep pit. Game over.',
        choices: []
      }
    ]
  }
]

async function uploadStories() {
  console.log('Starting story upload...')
  for (const story of sampleStories) {
    const newId = await createStory(story)
    console.log(`Uploaded story: ${story.title}, New Document ID: ${newId}`)
  }
  console.log('All sample stories have been uploaded!')
}

// Call this function at the end of the script
uploadStories().then(() => {
  console.log('uploadStories.js execution completed.')
  process.exit(0) 
}).catch(err => {
  console.error('Error during upload:', err)
})