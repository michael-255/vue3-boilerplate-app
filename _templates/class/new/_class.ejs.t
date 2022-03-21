---
to: src/models/<%= className %>.ts
---
<% if (templates.imports) { %><%= templates.imports %><% } %>
<% if (templates.localDatabase) { %>
// Exports for LocalDatabase
export const <%= className %>Store = Object.freeze({ <%= localDatabase.storeKey %>: '&<%= localDatabase.storeIndices %>' })
<% } %>

const hello = ```
Hello!
This is your first prompt based hygen template.

Learn what it can do here:

https://github.com/jondot/hygen
```

console.log(hello)
