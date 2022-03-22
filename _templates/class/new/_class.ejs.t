---
to: src/models/<%= className %>.ts
---
<%
// IMPORTS -----------------------------------------------------------------------------------------
if (imports) {
  imports.forEach((imp) => {

%>import <%= imp.part1 %> from '<%= imp.part2 %>'
<%

  })
}

// LOCALDATABASE -----------------------------------------------------------------------------------
if (localDatabase) {

%>
// Exports for LocalDatabase
export const <%= className %>Store = Object.freeze({ <%= localDatabase.storeKey %>: '&<%= localDatabase.storeIndices %>' })
<%

}

// LOCALDATABASE & PARAMETERS ----------------------------------------------------------------------
if (localDatabase && parameters) {

%>
export interface I<%= className %> {
<%

  parameters.forEach((param) => {

%>  <%= param.paramName %>: <%= param.paramType %>
<%

  })

%>}
<%

}

// PARAMETERS --------------------------------------------------------------------------------------
if (parameters) {

%>
type <%= className %>Params = {
<%

  parameters.forEach((param) => {

%>  <%= param.paramName %>?: <%= param.paramType %>
<%

  })

%>}
<%

}


%>

// WIP
