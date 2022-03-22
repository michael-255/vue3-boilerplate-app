---
to: src/models/<%= className %>.ts
---
<%# /*-----File Imports -----*/ _%>
<%_ if (imports) { _%>
  <%_ imports.forEach((imp) => { _%>
    <%_ _%>import <%= imp.part1 %> from '<%= imp.part2 %>'
  <%_ }) _%>

<%_ } _%>
<%# _%>
<%# _%>
<%# _%>
<%# /*----- LocalDatabase Exports -----*/ _%>
<%_ if (localDatabase) { _%>
  <%_ _%>// Exports for LocalDatabase
  <%_ _%>export const <%= className %>Store = Object.freeze({ <%= localDatabase.storeKey %>: '&<%= localDatabase.storeIndices %>' })

<%_ } _%>
<%_ _%>
<%_ if (localDatabase && parameters) { _%>
  <%_ _%>export interface I<%= className %> {
  <%_ parameters.forEach((param) => { _%>
    <%_ %>  <%= param.paramName %>: <%= param.paramType %>
  <%_ }) _%>
  <%_ _%>}

<%_ } _%>
<%# _%>
<%# _%>
<%# _%>
<%# /*----- Type Params -----*/ _%>
<%_ if (parameters) { _%>
  <%_ _%>type <%= className %>Params = {
  <%_ parameters.forEach((param) => { _%>
    <%_ %>  <%= param.paramName %>?: <%= param.paramType %>
  <%_ }) _%>
  <%_ _%>}

<%_ } _%>
<%# _%>
<%# _%>
<%# _%>
<%# /*----- Description -----*/ _%>
<%_ if (parameters) { _%>
  <%_ _%>/**
  <%_ %> * <%= classDescription %>
  <%_ parameters.forEach((param) => { _%>
    <%_ %> * @param <%= param.paramName %>
  <%_ }) _%>
  <%_ _%>*/
<%_ } _%>
<%# _%>
<%# _%>
<%# _%>
<%# /*----- Class Export -----*/ _%>
<%_ if (localDatabase && parameters) { _%>
  <%_ _%>export class <%= className %> implements I<%= className %> {
<%_ } else { _%>
  <%_ _%>export class <%= className %> {
<%_ } _%>
<%# _%>
<%# _%>
<%# _%>
<%# /*----- Class Fields -----*/ _%>
<%_ if (parameters) { _%>
  <%_ parameters.forEach((param) => { _%>
    <%_ %>  <%= param.paramName %>: <%= param.paramType %>
  <%_ }) _%>

<%_ } _%>
<%# _%>
<%# _%>
<%# _%>
<%# /*----- Class Constructor -----*/ _%>
<%_ if (parameters) { _%>
  <%_ %>  constructor({

<%_ } else { _%>
  <%_ %>  constructor() {}

<%_ } _%>


<%
/*
  constructor({
    id = createId(),
    createdDate = new Date().toISOString(),
    name = 'My User',
    attributes = {},
  }: UserParams = {}) {
    this.id = id
    this.createdDate = createdDate
    this.name = name
    this.attributes = attributes
  }
*/
%>


<%_ _%>}
