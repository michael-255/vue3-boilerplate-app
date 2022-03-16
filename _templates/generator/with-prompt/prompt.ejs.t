---
to: _templates/<%= name %>/<%= action || 'new' %>/prompt.js
---

// eslint-disable-next-line
module.exports = [
  {
    type: 'input',
    name: 'message',
    message: "What's your message?",
  },
]
