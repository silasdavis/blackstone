## <%= project.description %>

This is the REST API group for the Agreements Network.

<% groupOrder.forEach(function (group) { -%>
## <%= group %>

<% nameOrder[group].forEach(function (sub) { -%>
### <%= data[group][sub][0].title %>

<%-: data[group][sub][0].description | undef %>

```endpoint
<%-: data[group][sub][0].type | upcase %> <%= data[group][sub][0].url %>
```

<% if (data[group][sub][0].header && data[group][sub][0].header.fields.Header.length) { -%>
#### Headers

| Name    | Type      | Description                          |
|---------|-----------|--------------------------------------|
<% data[group][sub][0].header.fields.Header.forEach(function (header) { -%>
| <%- header.field %> | <%- header.type %> | <%- header.optional ? '**optional**' : '' %><%- header.description %>|
<% }); //forech parameter -%>
<% } //if parameters -%>

<% if (data[group][sub][0].header && data[group][sub][0].header.examples && data[group][sub][0].header.examples.length) { -%>

#### Header Examples

<% data[group][sub][0].header.examples.forEach(function (example) { -%>
<%= example.title %>

```json
<%- example.content %>
```
<% }); //foreach example -%>
<% } //if example -%>

<% if (data[group][sub][0].urlParameter) { -%>

<% Object.keys(data[group][sub][0].urlParameter.fields).forEach(function(g) { -%>

#### URL Parameters

| Parameter     | Description                           |
|:---------|:--------------------------------------|
<% data[group][sub][0].urlParameter.fields[g].forEach(function (param) { -%>
| <%- param.field %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>|
<% }); //foreach urlParameter -%>
<% }); //foreach urlParameter.fields -%>
<% } //if urlParameter -%>

<% if (data[group][sub][0].queryParameter) { -%>

<% Object.keys(data[group][sub][0].queryParameter.fields).forEach(function(g) { -%>

#### Query String Parameters

| Parameter     | Description                           |
|:---------|:--------------------------------------|
<% data[group][sub][0].queryParameter.fields[g].forEach(function (param) { -%>
| <%- param.field %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%= param.defaultValue %>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } %>|
<% }); //foreach queryParameter -%>
<% }); //foreach queryParameter.fields -%>
<% } //if queryParameter -%>

<% if (data[group][sub][0].bodyParameter) { -%>

<% Object.keys(data[group][sub][0].bodyParameter.fields).forEach(function(g) { -%>

#### Request Body Parameters

| Parameter     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
<% data[group][sub][0].bodyParameter.fields[g].forEach(function (param) { -%>
| <%- param.field %> | <%- param.type %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%= param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size %>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } %>|
<% }); //foreach rqst bodyParameter -%>
<% }); //foreach bodyParameter.fields -%>
<% } //if bodyParameter -%>

<% if (data[group][sub][0].examples && data[group][sub][0].examples.length) { -%>

#### Example Requests

<% data[group][sub][0].examples.forEach(function (example) { -%>

```<%= example.type %>
<%- example.content %>
```
<% }); //foreach example -%>
<% } //if example -%>

<% if (data[group][sub][0].success && data[group][sub][0].success.examples && data[group][sub][0].success.examples.length) { -%>

#### Success Response

<% data[group][sub][0].success.examples.forEach(function (example) { -%>
<%= example.title %>

```json
<%- example.content %>
```
<% }); //foreach success example -%>
<% } //if examples -%>

<% if (data[group][sub][0].success && data[group][sub][0].success.fields) { -%>
<% Object.keys(data[group][sub][0].success.fields).forEach(function(g) { -%>

#### <%= g %>

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
<% data[group][sub][0].success.fields[g].forEach(function (param) { -%>
| <%- param.field %> | <%- param.type %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } %>|
<% }); //forech (group) parameter -%>
<% }); //forech field -%>
<% } //if success.fields -%>

<% if (data[group][sub][0].error && data[group][sub][0].error.examples && data[group][sub][0].error.examples.length) { -%>

#### Error Response

<% data[group][sub][0].error.examples.forEach(function (example) { -%>
<%= example.title %>

```json
<%- example.content %>
```
<% }); //foreach error example -%>
<% } //if examples -%>

<% if (data[group][sub][0].error && data[group][sub][0].error.fields) { -%>
<% Object.keys(data[group][sub][0].error.fields).forEach(function(g) { -%>

#### <%= g %>

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
<% data[group][sub][0].error.fields[g].forEach(function (param) { -%>
| <%- param.field %> | <%- param.type %> | <%- param.optional ? '**optional**' : '' %><%- param.description -%>
<% if (param.defaultValue) { -%>
_Default value: <%- param.defaultValue %>_<br><% } -%>
<% if (param.size) { -%>
_Size range: <%- param.size -%>_<br><% } -%>
<% if (param.allowedValues) { -%>
_Allowed values: <%- param.allowedValues %>_<% } %>|
<% }); //forech (group) parameter -%>
<% }); //forech field -%>
<% } //if error.fields -%>


<% }); //foreach sub  -%>
<% }); //foreach group -%>