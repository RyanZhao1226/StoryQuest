// src/stories.js
export const stories = {
    "mystery_house": {
      title: "The Mystery House",
      description: "You find yourself in front of a mysterious abandoned house.",
      start: "scene1",
      scenes: {
        "scene1": {
          text: "You are at the entrance of an eerie house. Do you enter?",
          choices: {
            "Enter the house": "scene2",
            "Walk away": "ending1"
          }
        },
        "scene2": {
          text: "Inside, you see a staircase leading up and a door to the basement. Where do you go?",
          choices: {
            "Go upstairs": "scene3",
            "Go to the basement": "scene4"
          }
        },
        "scene3": {
          text: "You find an old diary with mysterious writings. The end.",
          choices: {},
          ending: true
        },
        "scene4": {
          text: "You find a hidden tunnel leading outside. You escape safely.",
          choices: {},
          ending: true
        },
        "ending1": {
          text: "You walk away, leaving the mystery unsolved.",
          choices: {},
          ending: true
        }
      }
    }
  };
  