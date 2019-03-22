## Agreements Network REST API

This is the REST API group for the Agreements Network.

## Agreements

### Add an agreement to a collection



```endpoint
PUT /agreement-collections
```







#### Example Requests


```curl
curl -iX PUT /agreement-collections/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Create an Agreement



```endpoint
POST /agreements
```







#### Example Requests


```curl
curl -iX POST /agreements
```


#### Success Response

Success Object

```json
{
  "address": "6EDC6101F0B64156ED867BAE925F6CD240635656"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| The | String | <p>address of the created Agreement *</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Create a Agreement Collection

<p>Creates an Active Agreement Collection.</p>

```endpoint
GET /agreement-collections
```







#### Example Requests


```curl
curl -iX POST /agreement-collections
```


#### Success Response

Success Object

```json
{
  "id": "9FBC54D1E8224307DA7E74BC54D1E829764E2DE7AD0D8DF6EBC54D1E82ADBCFF"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| name | String | <p>Active Agreement Collection name</p>|
| author | String | <p>Address of the creator (user account or org), logged in user address will be used if none supplied</p>|
| collectionType | Number | <p>Type of collection</p>|
| packageId | String | <p>The packageId of the archetype package from which the collection was created</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read an Agreement

<p>Retrieves Active Agreement information for a single Agreement. Notes:</p> <ul> <li>If the password provided is incorrect or a hoard reference which does not exist was passed to the posted Active Agreement this get will return a <code>401</code>.</li> <li>If the agreement was not authored by the logged in user or one of their organizations, or if its signatories does not include the logged in user or one of their organizations, this will return a <code>404</code>.</li> </ul>

```endpoint
GET /agreements/:address
```







#### Example Requests


```curl
curl -i /agreements/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890
```


#### Success Response

Success Object

```json
{
  "address": "9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E",
  "name": "Agreement",
  "archetype": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
  "isPrivate": false,
  "maxNumberOfAttachments": 0,
  "legalState": 1,
  "formationProcessInstance": "413AC7610E6A4E0ACEB29596FFC52D243A2E7CD7",
  "executionProcessInstance": "0000000000000000000000000000000000000000",
  "formationProcessDefinition": "65BF0FB03BA5C140B1584A290B157F8907B8FEBE",
  "executionProcessDefinition": "E6534E45E2B26AF4FBB64E42CE7FC66688696483",
  "collectionId": "9FBC54D1E8224307DA7E74BC54D1E829764E2DE7AD0D8DF6EBC54D1E82ADBCFF",
  "isParty": true,
  "isCreator": true,
  "isAssignedTask": false,
  "parties": [
      {
        "address": "F8C300C2B7A3F69C90BCF97298215BA7792B2EEB",
        "signatureTimestamp": 1539260590000,
        "signedBy": "F8C300C2B7A3F69C90BCF97298215BA7792B2EEB",
        "partyDisplayName": "jsmith",
        "signedByDisplayName": "jsmith"
      }
  ],
  "documents": [
    {
      "name": "Template1.docx",
      "grant": "eyJTcG...iVmVyc2lvbiI6MH0="
    },
    {
      "name": "Template2.md",
      "grant": "b9UTcG...iVmVyc2lvbiI6MH0="
    },
  ],
  "parameters": [
    {
      "name": "Signatory",
      "value": "F8C300C2B7A3F69C90BCF97298215BA7792B2EEB",
      "type": 8
    },
    {
      "name": "User",
      "value": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
      "type": 6
    }
  ],
  "governingAgreements": [
    {
      "address": "B3AEAD4717EFF80BDDF5E22110521029A8460FFB",
      "name": "Governing Agreement",
      "isPrivate": false
    }
  ]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Active Agreement's address</p>|
| name | String | <p>Human readable name of the Active Agreement</p>|
| archetype | String | <p>Address of the parent Archetype of the Active Agreement</p>|
| isPrivate | Boolean | <p>Whether the encryption framework of the Active Agreement is operational or not</p>|
| maxNumberOfAttachments | Number | <p>Max number of attachments that can be stored in the attachments</p>|
| legalState | Number | <p>Legal state of the agreement</p>|
| formationProcessInstance | Number | <p>Address of the agreement's formation process instance</p>|
| executionProcessInstance | Number | <p>Address of the agreement's execution process instance</p>|
| collectionId | String | <p>Id of the collection the agreement belongs to</p>|
| parties | Object[] | <p>An array of objects with each party member's address, user id or organization name, signature timestamp, and address of the user that has signed for the party</p>|
| parameters | Object[] | <p>An array of objects with each parameter's name, value, and data type</p>|
| governingAgreements | Object[] | <p>An array of the governing agreements with the <code>address</code>, <code>name</code>, and <code>isPrivate</code> value of each</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read an Agreement Collection

<p>Retrieves information for a single Agreement Collection if the author is the authenticated user or the organization the user is a member of.</p>

```endpoint
GET /agreement-collections/:id
```







#### Example Requests


```curl
curl -i /agreement-collections/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD
```


#### Success Response

Success Object

```json
{
  "id": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD",
  "name": "Agreement Collection 1",
  "author": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
  "collectionType": 2,
  "packageId": "9FBC54D1E8224307DA7E74BC54D1E829764E2DE7AD0D8DF6EBC54D1E82ADBCFF",
  "agreements": [{
    "name": "Agreement 1",
    "address": "E615D0EC4BB0EDDE615D0EC4BB0EB3D909F66890",
    "archetype": "42B7AC86A84DD3AA054F567BCF5D27D9622FCD0B"
  }]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | String | <p>Agreement Collection id</p>|
| name | String | <p>Human readable name of the Agreement Collection</p>|
| author | String | <p>Controller contract of the user or organization</p>|
| collectionType | Number | <p>Type of collection</p>|
| packageId | String | <p>The packageId of the archetype package from which the collection was created</p>|
| agreements | Object[] | <p>Array of agreement objects included in the collection</p>|




### Read Agreement Collections

<p>Retrieves Active Agreement Collection information where the author is the authenticated user, or the organization the user is a member of.</p>

```endpoint
GET /agreement-collections
```







#### Example Requests


```curl
curl -i /agreement-collections
```


#### Success Response

Success Objects Array

```json
[{
  "id": "9FBC54D1E8224307DA7E74BC54D1E829764E2DE7AD0D8DF6EBC54D1E82ADBCFF",
  "name": "Agreement Collection 1",
  "author": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
  "collectionType": 2,
  "packageId": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD"
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | String | <p>Active Agreement Collection id</p>|
| name | String | <p>Human readable name of the Active Agreement Collection</p>|
| author | String | <p>Address of the creator (user account or org)</p>|
| collectionType | Number | <p>Type of collection</p>|
| packageId | String | <p>The packageId of the archetype package from which the collection was created.</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Agreements

<p>Retrieves Active Agreement information of agreements that are public, or if the <code>forCurrentUser</code> query is set to <code>true</code>, a) are authored by the authenticated user, b) are authored by an organization to which the authenticated user belongs, c) include the authenticated user in its signatories, or d) include an organization to which the authenticated user belongs in its signatories</p>

```endpoint
GET /agreements
```







#### Example Requests


```curl
curl -i /agreements
```


#### Success Response

Success Objects Array

```json
[{
  "address": "4AD3C4FA34C8EC5FFBCC4924C2AB16DF72F1EBB8",
  "archetype": "4EF5DAB8CE089AD7F2CE7A04A7CB5DB1C58DB707",
  "name": "Drone Lease",
  "creator": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
  "attachmentsFileReference": "eyJTcG...iVmVyc2lvbiI6MH0=",
  "maxNumberOfAttachments": 10,
  "isPrivate": 1,
  "legalState": 1,
  "formationProcessInstance": "038725D6437A809D536B9417047EC74E7FF4D1C0",
  "executionProcessInstance": "0000000000000000000000000000000000000000",
  "numberOfParties": 2
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Active Agreement's address</p>|
| name | String | <p>Human readable name of the Active Agreement</p>|
| archetype | String | <p>Address of the parent Archetype of the Active Agreement</p>|
| isPrivate | Boolean | <p>Whether the encryption framework of the Active Agreement</p>|
| attachmentsFileReference | String | <p>Hoard grant needed to access an existing event log if any</p>|
| numberOfParties | Number | <p>The number of parties agreeing to the Active Agreement</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Cancel an Agreement

<p>Cancels an agreement if the authenticated user is a member of the agreement parties, or a member of an organization that is an agreement party</p>

```endpoint
PUT /agreements
```







#### Example Requests


```curl
curl -iX PUT /agreements/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890/cancel
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Sign an Agreement

<p>Signs an agreement by the authenticated user</p>

```endpoint
PUT /agreements
```







#### Example Requests


```curl
curl -iX PUT /agreements/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890/sign
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Add an attachment to an Agreement

<p>Adds an attachment to the specific agreement. When requested with <code>Content-Type: multipart/form-data</code>, the attached file will be uploaded to hoard. The attachment's content will be set to the hoard grant for the file, and the name will be set to the file's name. When requested with  <code>Content-Type: application/json</code>, the name and content from the request will be used as the attachment.</p>

```endpoint
PUT /agreements/:address/attachments
```







#### Example Requests


```curl
curl -iX POST /agreements/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890/attachments -d '{"name":"name", "content":"content"}'
```


#### Success Response

Success Object

```json
{
  "attachmentsFileReference": "b9SMcG...iVmVyc2lvbiI6MH0=",
  "attachments": [
    {
      "name": "Name of Attachment",
      "submitter": "36ADA22D3A4B841EFB73414CD97C35C0A660C1C2",
      "timestamp": 1551216868342,
      "content": "Content of attachment",
      "contentType": "plaintext"
    }
  ]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| attachmentsFileReference | String | <p>The hoard grant of the updated attachments</p>|
| attachments | Object[] | <p>The updated array of attachments</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


## Archetypes

### Activate an archetype

<p>Activates the archetype so that agreements can be created from it. An archetype can only be activated by its author. This action will fail if the archetype has a successor set.</p>

```endpoint
PUT /archetypes/:address/activate
```







#### Example Requests


```curl
curl -iX PUT /archetypes/6EDC6101F0B64156ED867BAE925F6CD240635656/activate
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Activate an archetype package

<p>Activates the archetype package An archetype package can only be activated by its author.</p>

```endpoint
PUT /archetype-packages/:id/activate
```







#### Example Requests


```curl
curl -iX PUT /archetype-packages/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD/activate
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Add an archetype to a package



```endpoint
PUT /archetype-packages/:id/archetype/:address
```







#### Example Requests


```curl
curl -iX PUT /archetype-packages/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD/archetype/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Create an Archetype



```endpoint
POST /archetypes
```







#### Example Requests


```curl
curl -iX POST /archetypes
```


#### Success Response

Success-Response:

```json
{
  "address": "6EDC6101F0B64156ED867BAE925F6CD240635656"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| The | String | <p>address of the created Archetype</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Create an Archetype Package



```endpoint
POST /archetypes/packages
```







#### Example Requests


```curl
curl -iX POST /archetype-packages
```


#### Success Response

Success-Response:

```json
{
  "id": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| The | String | <p>id of the created Archetype Package</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Deactivate an archetype

<p>Deactivates the archetype so that agreements cannot be created from it. An archetype can only be deactivated by its author. Once an archetype is deactivated by its author, it will not be included in <code>GET /archetypes</code> responses made by users other than the author.</p>

```endpoint
PUT /archetypes/:address/deactivate
```







#### Example Requests


```curl
curl -iX PUT /archetypes/6EDC6101F0B64156ED867BAE925F6CD240635656/activate
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### deactivate an archetype package

<p>Deactivates the archetype package An archetype package can only be deactivated by its author. Once an archetype package is deactivated by its author, it will not be included in <code>GET /archetype-packges</code> or <code>GET /archetype-packages/:id</code> responses made by users other than the author.</p>

```endpoint
PUT /archetype-packages/:id/deactivate
```







#### Example Requests


```curl
curl -iX PUT /archetype-packages/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD/deactivate
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read an Archetype

<p>Retrieves archetype information for a single Archetype. This endpoint will return a <code>404</code> if: a. the archetype is not found, or b. the archetype is private and the authenticated user is not its author. Note: if the password provided is incorrect or a hoard reference which does not exist was passed to the posted archetype this get will return a <code>401</code>.</p>

```endpoint
GET /archetypes/:address
```







#### Example Requests


```curl
curl -i /archetypes/707791D3BBD4FDDE615D0EC4BB0EB3D909F66890
```


#### Success Response

Success Object

```json
{
  "address": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
  "name": "TestType1",
  "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
  "description": "rental archetype",
  "price": 10,
  "active": false,
  "isPrivate": false,
  "successor": "ED867101F0B64156ED867BAE925F6CD2406350B6",
  "parameters": [{
      "name": "NumberOfTeenageDaughters",
      "type": 2,
      "label": "Number"
    },
    {
      "name": "ExitClause",
      "type": 1,
      "label": "String"
    }
  ],
  "documents": [{
    "name": "Dok1",
    "grant": "eyJTcG...iVmVyc2lvbiI6MH0="
  }],
  "jurisdictions": [{
      "country": "US",
      "regions": ["0304CA03C4E9DD0F9676A4463D42BCB686331A5361570D9BF7BC211C1BCA9F1E", "04E01B41ABD856ECAE38A06FB81005A911271B4BF483C10F31C539031C399101"]
    },
    {
      "country": "CA",
      "regions": ["0000000000000000000000000000000000000000000000000000000000000000"]
    }
  ],
  "packages": [{
    "id": "86401D45D372B3E036F91F7DDC87006E069AFCB96B3708B2FBA722D0672DDA7C",
    "name": "Drone Lease Package"
  }],
  "governingArchetypes": [{
    "address": "4EF5DAB8CE089AD7F2CE7A04A7CB5DB1C58DB707",
    "name": "NDA Archetype"
  }]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Archetype's address</p>|
| name | String | <p>Human readable name of the Archetype</p>|
| author | String | <p>Controller contract of the user or organization that created the Archetype</p>|
| description | String | <p>Description of the archetype</p>|
| price | Number | <p>Price of the archetype</p>|
| active | Boolean | <p>Whether the Archetype can be used to create new Active Agreements or not</p>|
| isPrivate | Boolean | <p>Whether the encryption framework of the Archetype is operational or not</p>|
| successor | String | <p>Address of the successor archetype</p>|
| parameters | Object[] | <p>The &quot;name&quot; and &quot;type&quot; of all custom parameters used by the Archetype</p>|
| documents | Object[] | <p>The &quot;name&quot;, &quot;grant&quot; (if any) sufficient to provide the information regarding the relevant documents associated with the Archetype</p>|
| jurisdictions | Object[] | <p>The &quot;country&quot; and &quot;regions&quot; which the Archetype has been registered as relevant to. The &quot;country&quot; is registered as an ISO standard two character string and &quot;regions&quot; is an array of addresses relating to the controlling contracts for the region (see <a href="#">ISO standards manipulation</a> section).</p>|
| packages | Object[] | <p>The &quot;id&quot; and &quot;name&quot; of each of the packages that the archetype has been added to</p>|




### Read an Archetype Package

<p>Retrieves information for a single archetype package. Returns a <code>404</code> if the package is private or not active and the authenticated user is not its author.</p>

```endpoint
GET /archetype-packages/:id
```







#### Example Requests


```curl
curl -i /archetype-packages/7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD
```


#### Success Response

Success Object

```json
{
  "id": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD",
  "name": "Package1",
  "description": "Package Description",
  "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
  "isPrivate": false,
  "active": true,
  "archetypes": [{
      "name": "Archetype 1",
      "address": "4156ED867BAE4156ED867BAE925F6CD240635656",
      "active": true
    },
    {
      "name": "Archetype 2",
      "address": "406356867BAE4156ED867BAE925F6CD240635656",
      "active": false
    }
  ]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | String | <p>Archetype Package id</p>|
| name | String | <p>Human readable name of the Archetype Package</p>|
| description | String | <p>Human readable description of the Archetype Package</p>|
| author | String | <p>Controller contract of the user or organization</p>|
| isPrivate | Boolean | <p>Indicates whether the package can be read/used publicly</p>|
| active | Boolean | <p>Indicates whether the package has been activated and available for creating collections with.</p>|
| archetypes | Object[] | <p>Array of archetypes with name, address, and active keys that are included in the Archetype Package</p>|




### Read Archetype Packages

<p>Retrieves archetype package information. Within the Agreements Network, Archetype Packages are collections of archetypes that are related in some way. Returns all packages that are either public or authored by the authenticated user</p>

```endpoint
GET /archetypes
```







#### Example Requests


```curl
curl -i /archetype-packages
```


#### Success Response

Success Objects Array

```json
[{
  "id": "7F2CA849A318E7FA2473B3442B7AC86A84DD3AA054F567BCF5D27D9622FCD0BD",
  "name": "Package1",
  "description": "package description"
  "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
  "isPrivate": false,
  "active": true
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| id | String | <p>Archetype Package id</p>|
| name | String | <p>Human readable name of the Archetype Pacakge</p>|
| author | String | <p>Controller contract of the user or organization</p>|
| description | String | <p>Description of the package</p>|
| isPrivate | Boolean | <p>Indicates whether the package can be read/used publicly</p>|
| active | Boolean | <p>Indicates whether the package has been activated and available for creating collections with. that created the package</p>|




### Read Archetypes

<p>Retrieves archetype information. Within the Agreements Network, Archetypes are the fundamental, top level objects. They are holders for a set of information which allows users to creat Active Agreements within the Platform. The returned list will include archetypes that are: a. authored by the authenticated user, or b. public (ie. <code>isPrivate</code> property is <code>false</code>) and activated (ie. <code>active</code> property is true)</p>

```endpoint
GET /archetypes
```







#### Example Requests


```curl
curl -i /archetypes
```


#### Success Response

Success Objects Array

```json
[{
  "address": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
  "name": "TestType1",
  "author": "6EDC6101F0B64156ED867BAE925F6CD240635656",
  "description": "This archetype is for testing purposes.",
  "active": false,
  "isPrivate": false,
  "numberOfParameters": 2,
  "numberOfDocuments": 1,
  "countries": ["US", "CA"]
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Archetype's address</p>|
| name | String | <p>Human readable name of the Archetype</p>|
| author | String | <p>Controller contract of the user or organization that created the Archetype</p>|
| description | String | <p>description of the Archetype</p>|
| active | Boolean | <p>Whether the Archetype can be used to create new Active Agreements or not</p>|
| isPrivate | Boolean | <p>Whether the encryption framework of the Archetype is operational or not</p>|
| numberOfParameters | Number | <p>The number of custom parameters used by the Archetype</p>|
| numberOfDocuments | Number | <p>The number of documents registered against the Archetype</p>|
| countries | String[] | <p>The jurisdictions in which the Archetype has been registered to be active</p>|




### Set price of an archetype

<p>Sets the price of given archetype</p>

```endpoint
PUT /archetypes/:address/price
```







#### Example Requests


```curl
curl -iX PUT /archetypes/6EDC6101F0B64156ED867BAE925F6CD240635656/price
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Set successor for an archetype

<p>Sets the successor of given archetype. This action automatically makes the archetype inactive. Note that an archetype cannot point to itself as its successor. It also validates if this action will result in a circular dependency between two archetypes. A succcessor may only be set by the author of the archetype.</p>

```endpoint
PUT /archetypes/:address/successor/:successor
```







#### Example Requests


```curl
curl -iX PUT /archetypes/6EDC6101F0B64156ED867BAE925F6CD240635656/successor/ED867101F0B64156ED867BAE925F6CD2406350B6
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


## BPMModel

### Parse BPMN XML and from it create a process model and definition

<p>BPMN XML needs to be passed in the request body as plain text or application/xml</p>

```endpoint
POST /bpm/process-models
```







#### Example Requests


```curl
curl -i /bpm/process-models
curl -i /bpm/process-models?format=bpmn
```


#### Success Response

Success Object

```json
{
  "model": {
    "id": "1535053136633_ommi",
    "address": "CDEBECF4D78F2DCF94DFAB12215D018CF1F3F11F"
  },
  "processes": [{
    "address": "43548D6C7894C0E5A7DA1ED08143E1AF4E9DD67E",
    "processDefinitionId": "Process_104nkeu",
    "interfaceId": "Agreement Formation",
    "processName": "Process Name",
    "modelAddress": "CDEBECF4D78F2DCF94DFAB12215D018CF1F3F11F",
    "private": false,
    "author": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1"
  }],
  "parsedDiagram": {
    "model": {
      "dataStores": [{
          "id": "PROCESS_INSTANCE",
          "name": "Process Instance",
          "parameters": [{
            "name": "agreement",
            "parameterType": 7
          }]
        },
        {
          "id": "agreement",
          "name": "Agreement",
          "parameters": [{
            "name": "Assignee",
            "parameterType": 8
          }]
        }
      ],
      "name": "Collaboration_1bqszqk",
      "id": "1535053136633_ommi",
      "version": [1, 0, 0],
      "private": false,
      "author": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1"
    },
    "processes": [{
      "id": "Process_104nkeu",
      "name": "Process Name",
      "interface": "Agreement Formation",
      "participants": [{
          "id": "Lane_18i4kvj",
          "name": "Agreement Parties (Signatories)",
          "tasks": ["Task_0ky8n9d"],
          "conditionalPerformer": true,
          "dataStorageId": "agreement",
          "dataPath": "AGREEMENT_PARTIES"
        },
        {
          "id": "Lane_1qvrgtf",
          "name": "Assignee",
          "tasks": ["Task_1jrtitw"],
          "conditionalPerformer": true,
          "dataStorageId": "agreement",
          "dataPath": "Assignee"
        }
      ],
      "tasks": [],
      "userTasks": [{
          "id": "Task_0ky8n9d",
          "name": "Signing Task",
          "assignee": "Lane_18i4kvj",
          "activityType": 0,
          "taskType": 1,
          "behavior": 1,
          "multiInstance": true,
          "dataMappings": [{
            "id": "agreement",
            "direction": 0,
            "dataPath": "agreement",
            "dataStorageId": ""
          }],
          "application": "AgreementSignatureCheck",
          "subProcessModelId": "",
          "subProcessDefinitionId": ""
        },
        {
          "id": "Task_1jrtitw",
          "name": "User Task",
          "assignee": "Lane_1qvrgtf",
          "activityType": 0,
          "taskType": 1,
          "behavior": 1,
          "multiInstance": false,
          "application": "",
          "subProcessModelId": "",
          "subProcessDefinitionId": ""
        }
      ],
      "sendTasks": [],
      "serviceTasks": [],
      "subProcesses": [],
      "transitions": [{
        "id": "SequenceFlow_0twrlls",
        "source": "Task_0ky8n9d",
        "target": "Task_1jrtitw"
      }],
      "activityMap": {
        "Task_0ky8n9d": "Signing Task",
        "Task_1jrtitw": "User Task"
      }
    }]
  }
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Model | Object | <p>details, process details, and parsed diagram (JSON)</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read All Process Definitions



```endpoint
GET /bpm/process-definitions
```







#### Example Requests


```curl
curl -i /bpm/process-definitions
curl -i /bpm/process-definitions?interfaceId=Agreement%20Execution
```


#### Success Response

Success Objects Array

```json
[{
  "processDefinitionId": "Process_00pj23z",
  "address": "65BF0FB03BA5C140B1584A290B157F8907B8FEBE",
  "modelAddress": "6025AF7E4FBB2FCCCFBB855E68025CF20038E142",
  "interfaceId": "Agreement Execution",
  "modelFileReference": "eyJTcG...iVmVyc2lvbiI6MH0=",
  "isPrivate": false,
  "author": "DAE988ADED111E6AE82DBFD9AE4FFFE97ADBC23D",
  "modelId": "INC_EXEC_2018",
  "processName": "Inc Exec Process"
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| object | Object[] | <p>Process Definition object</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Applications



```endpoint
GET /bpm/applications
```







#### Example Requests


```curl
curl -iX GET /bpm/applications
```


#### Success Response

Success Object Array

```json
[{
    "id": "AgreementSignatureCheck",
    "applicationType": 2,
    "location": "FFA3BB89E3B0DC63C0CE9BF0E2278B56CE5991F4",
    "webForm": "SigningWebFormWithSignatureCheck",
    "accessPoints": [{
      "accessPointId": "agreement",
      "direction": 0,
      "dataType": 59
    }]
  },
  {
    "id": "WebAppApprovalForm",
    "applicationType": 2,
    "location": "0000000000000000000000000000000000000000",
    "webForm": "TaskApprovalForm",
    "accessPoints": []
  }
]
```




#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Single Process Definition



```endpoint
GET /bpm/process-definitions/:address
```







#### Example Requests


```curl
curl -i /bpm/process-definitions/81A817870C6C6A209150FA26BC52D835CA6E17D2
```


#### Success Response

Success Object

```json
{
  "processDefinitionId": "Process_00pj23z",
  "address": "65BF0FB03BA5C140B1584A290B157F8907B8FEBE",
  "modelAddress": "6025AF7E4FBB2FCCCFBB855E68025CF20038E142",
  "interfaceId": "Agreement Execution",
  "modelFileReference": "eyJTcG...iVmVyc2lvbiI6MH0=",
  "isPrivate": false,
  "author": "DAE988ADED111E6AE82DBFD9AE4FFFE97ADBC23D",
  "modelId": "INC_EXEC_2018",
  "processName": "Inc Exec Process"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| processDefinitionId | String | <p>Id of the process definition</p>|
| address | String | <p>Address of the process definition</p>|
| modelAddress | String | <p>Address of the model the process definition was created under</p>|
| interfaceId | String | <p>'Agreement Formation' or 'Agreement Execution'</p>|
| modelFileReference | String | <p>Hoard grant for the xml file representing the process</p>|
| isPrivate | String | <p>Whether model is private</p>|
| author | String | <p>Address of the model author</p>|
| modelId | String | <p>Id of the process model</p>|
| processName | String | <p>Human-readable name of the process definition</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Diagram of Process Model

<p>Reads the diagram of the specified process model in the requested MIME type. The 'Accept' header in the request should be set to either 'application/xml' or 'application/json'.</p>

```endpoint
GET /bpm/process-models/:address/diagram
```







#### Example Requests


```curl
curl -i -H "Accept: application/json" /bpm/process-models/912A82D4C72847EF1EC76426544EAA992993EE20/diagram
```


#### Success Response

Success Object

```json

{
  "model": {
    "name": "Collaboration_1bqszqk",
    "id": "1534895680958_ommi",
    "version": [
      1,
      0,
      0
    ],
    "private": false,
    "dataStores": [{
        "dataStorage": "PROCESS_INSTANCE",
        "dataPath": "agreement",
        "parameterType": 7
      },
      {
        "dataStorage": "agreement",
        "dataPath": "Assignee",
        "parameterType": 8
      }
    ],
  },
  "processes": [{
    "id": "Process_1rywjij",
    "name": "Process Name",
    "interface": "Agreement Formation",
    "participants": [{
      "id": "Lane_1mjalez",
      "name": "Assignee",
      "tasks": [
        "Task Name"
      ],
      "conditionalPerformer": true,
      "dataStorageId": "agreement",
      "dataPath": "Assignee"
    }],
    "tasks": [],
    "userTasks": [{
      "id": "Task Name",
      "name": "Task Name",
      "assignee": "Lane_1mjalez",
      "activityType": 0,
      "taskType": 1,
      "behavior": 1,
      "multiInstance": false,
      "application": "",
      "subProcessModelId": "",
      "subProcessDefinitionId": ""
    }],
    "sendTasks": [],
    "receiveTasks": [],
    "serviceTasks": [],
    "subProcesses": [],
    "transitions": []
  }]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Object | Object | <p>with details of the model and processes belonging to it</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Process Models



```endpoint
GET /bpm/process-models
```







#### Example Requests


```curl
curl -iX GET /bpm/process-models
```


#### Success Response

Success Object Array

```json
[{
  "modelAddress": "912A82D4C72847EF1EC76426544EAA992993EE20",
  "id": "0000000000000000000000000000000000000000000000000000000000000000",
  "name": "0000000000000000000000000000000000000000000000000000000000000000",
  "versionMajor": 0,
  "versionMinor": 0,
  "versionPatch": 0,
  "active": true
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| modelAddress | String | |
| id | String | |
| name | String | |
| versionMajor | Number | |
| versionMinor | Number | |
| versionPatch | Number | |
| active | Boolean | |



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


## BPMRuntime

### Complete task identified by the activityInstanceId

<p>Completes the activity identified by the activityInstanceId. Optionally accepts 'data' array to write.</p>

```endpoint
PUT /tasks/:activityInstanceId/complete
```







#### Example Requests


```curl
curl -i /task/:activityInstanceId/complete
```






### Read activity instance

<p>Retrieve details of the specified activity instance</p>

```endpoint
GET /activity-instances/:id
```







#### Example Requests


```curl
curl -i /activity-instances/41ED431B140790B2462D8CC683C87FEA2F1DE321
```


#### Success Response

Success Object

```json
{
  "state": 4,
  "processAddress": "A65B3111789E4355EA03E0F109FBDD0042133307",
  "activityInstanceId": "A2A9736AEEC9B1DCAA274DEBF76248EA57ABA0727BDE343C2CDE663FC48E2BF4",
  "activityId": "Sign_Signing Task",
  "created": 1533678582000,
  "performer": "5860AF129980B0E932F3509432A0C43DEAB77B0B",
  "completed": 0,
  "taskType": 1,
  "application": "AgreementSignatureCheck",
  "applicationType": 2,
  "webForm": "DefaultSignAndCompleteForm",
  "processName": "Lease Formation",
  "processDefinitionAddress": "833E7452A7D1B02655889AC52F745FD1D5C50AAC",
  "agreementAddress": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
  "modelAuthor": "5860AF129980B0E932F3509432A0C43DEAB77B0B",
  "private": 0,
  "agreementName": "Drone Lease Agreement",
  "attachmentsFileReference": "eyJTcG...iVmVyc2lvbiI6MH0=",
  "maxNumberOfAttachments": 10,
  "data": [
    {
      "dataMappingId": "readName",
      "dataPath": "name"
      "dataStorageId": ""
      "value": "John Doe",
      "dataType": 2,
      "parameterType": 1,
      "direction": 0
    },
    {
      "dataMappingId": "readApproved",
      "dataPath": "approved"
      "value": true,
      "dataType": 1,
      "parameterType": 0,
      "direction": 0
    },
    {
      "dataMappingId": "writeName",
      "dataPath": "name"
      "dataStorageId": ""
      "dataType": 2,
      "parameterType": 1,
      "direction": 1
    },
    {
      "dataMappingId": "writeApproved",
      "dataPath": "approved"
      "dataStorageId": ""
      "dataType": 1,
      "parameterType": 0,
      "direction": 1
    }
  ]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| object | Object | <p>Activity instance object</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read single data mapping of an activity instance

<p>Retrieve details of the data mapping with the given ID for the specified activity instance</p>

```endpoint
GET /activity-instances/:activityInstanceId/data-mappings/:dataMappingId
```







#### Example Requests


```curl
curl -i /activity-instances/150E9377C388CF1B76E508642646F6DFACA67D53B82A0C3F479C12610FA29BCB/data-mappings/readApproved
```


#### Success Response

Success Object

```json
{
  "dataMappingId": "readApproved",
  "dataPath": "approved"
  "value": true,
  "dataType": 1,
  "parameterType": 0,
  "direction": 0
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| object | Object | <p>Data mapping objects</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read data mappings of activity instance

<p>Retrieve details of the data mappings for the specified activity instance</p>

```endpoint
GET /activity-instances/:activityInstanceId/data-mappings
```







#### Example Requests


```curl
curl -i /activity-instances/41ED431B140790B2462D8CC683C87FEA2F1DE321/data-mappings
```


#### Success Response

Success Object

```json
[{
  "dataMappingId": "readApproved",
  "dataPath": "approved"
  "value": true,
  "dataType": 1,
  "parameterType": 0,
  "direction": 0
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| object | Object[] | <p>Array of data mapping objects</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Activities of a process instance

<p>Read all activities of a process instance</p>

```endpoint
GET /activity-instances
```







#### Example Requests


```curl
curl -i /activity-instances?processInstance=150D431B160790B2462D8CC683C87FEA2F1C3C61
```


#### Success Response

Success Objects Array

```json
[{
  "processAddress": "A65B3111789E4355EA03E0F109FBDD0042133307",
  "activityInstanceId": "A2A9736AEEC9B1DCAA274DEBF76248EA57ABA0727BDE343C2CDE663FC48E2BF4",
  "activityId": "Task_0X7REW5",
  "created": 1533736147000,
  "completed": 0,
  "performer": "5860AF129980B0E932F3509432A0C43DEAB77B0B",
  "completedBy": "0000000000000000000000000000000000000000",
  "state": 4,
  "agreementAddress": "391F69095A291E21079A78F0F67EE167D7628AE2",
  "agreementName": "Agreement Name"
  "processDefinitionAddress": "0506903B34830785168D840BB70D7D48D31A5C1F",
  "processName": "Ship"
}]
```




#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Tasks

<p>Retrieves an array of tasks assigned to the logged in user</p>

```endpoint
GET /tasks
```







#### Example Requests


```curl
curl -i /tasks
```


#### Success Response

Success Objects Array

```json
[{
  "state": 4,
  "processAddress": "A65B3111789E4355EA03E0F109FBDD0042133307",
  "activityInstanceId": "A2A9736AEEC9B1DCAA274DEBF76248EA57ABA0727BDE343C2CDE663FC48E2BF4",
  "activityId": "Task_5ERV12I",
  "created": 1533736147000,
  "performer": "5860AF129980B0E932F3509432A0C43DEAB77B0B",
  "processName": "Process Name",
  "processDefinitionAddress": "833E7452A7D1B02655889AC52F745FD1D5C50AAC",
  "agreementAddress": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
  "agreementName": "Drone Purchase Agreement"
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| object | Object[] | <p>Array of task objects</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Write single data mapping of an activity instance

<p>Write to the data mapping with the given ID for the specified activity instance</p>

```endpoint
GET /activity-instances/:activityInstanceId/data-mappings/:dataMappingId
```







#### Example Requests


```curl
curl -i /activity-instances/150E9377C388CF1B76E508642646F6DFACA67D53B82A0C3F479C12610FA29BCB/data-mappings/writeApproved
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Write data mappings of activity instance

<p>Write to data mappings for the specified activity instance</p>

```endpoint
GET /activity-instances/:activityInstanceId/data-mappings
```







#### Example Requests


```curl
curl -i /activity-instances/150E9377C388CF1B76E508642646F6DFACA67D53B82A0C3F479C12610FA29BCB/data-mappings
```





#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


## Content

### Read Content Object



```endpoint
GET /hoard
```







#### Example Requests


```curl
curl -i /hoard
```






## Organizations

### Add Users to a Department

<p>Add users to a department</p>

```endpoint
PUT /organizations/:address/departments/:departmentId/users
```







#### Example Requests


```curl
curl -iX PUT /organizations/6EDC6101F0B64156ED867BAE925F6CD240635656/departments/accounting/users
```



#### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Success |  | |



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Create a New Department in an Organization

<p>Creating a new department within an organization and add members to it</p>

```endpoint
PUT /organizations/:address/departments
```







#### Example Requests


```curl
curl -iX PUT /organizations/6EDC6101F0B64156ED867BAE925F6CD240635656/departments
```


#### Success Response

Success-Response:

```json
{
  "id": "accounting",
  "name": "Accounting",
  "users": ["9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E"]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| The | json | <p>address of the Organization, the id and name of the department, and the users belonging to the department</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Create a New Organization

<p>Creating a new organization also established the primary administrators for that organization If no approvers are provided for the organization, then the currently logged-in user will be registered as an approver.</p>

```endpoint
POST /organizations
```







#### Example Requests


```curl
curl -iX POST /organizations
```


#### Success Response

Success-Response:

```json
{
"address": "6EDC6101F0B64156ED867BAE925F6CD240635656",
"name": "ACME Corp"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| The | json | <p>address of the created Organization</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Organizations



```endpoint
GET /organizations
```







#### Example Requests


```curl
curl -i /organizations
```


#### Success Response

Success Objects Array

```json
[{
  "address": "DAE988ADED111E6AE82DBFD9AE4FFFE97ADBC23D",
  "approvers": [
    "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
    "F5C84B3CC6317023F1E9914BDC86FC0E339E8110",
    "F9EAB43B627645C48F6FDB424F9AD3D760907C25"
  ],
  "name": "orgone"
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Organization's Controller Contract</p>|
| id | String | <p>Organization's machine readable ID</p>|
| name | String | <p>Organization's human readable name</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read a Single Organization



```endpoint
GET /organizations/:address
```







#### Example Requests


```curl
curl -i /organizations/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E
```


#### Success Response

Success Object

```json
{
  "address": "DAE988ADED111E6AE82DBFD9AE4FFFE97ADBC23D",
  "organizationKey": "55D40E05C91F484E0F4104774F528D131DFC0990A7A18124DA5666E1F5EA2EAA",
  "name": "orgone",
  "approvers": [{
      "address": "AB3399395E9CAB5434022D1992D31BB3ACC2E3F1",
      "id": "joesmith"
    },
    {
      "address": "F5C84B3CC6317023F1E9914BDC86FC0E339E8110",
      "id": "sarasmith"
    },
    {
      "address": "F9EAB43B627645C48F6FDB424F9AD3D760907C25",
      "id": "ogsmith"
    }
  ],
  "users": [{
      "address": "889A3EEBAC57E0F14D5BAB7AA87A4E69C432ECCD",
      "id": "patmorgan"
      "departments": [
        "acct"
      ],
    },
    {
      "address": "F5C84B3CC6317023F1E9914BDC86FC0E339E8110",
      "id": "sarasmith"
      "departments": [
        "acct"
      ],
    },
    {
      "address": "F9EAB43B627645C48F6FDB424F9AD3D760907C25",
      "id": "ogsmith"
      "departments": [
        "acct"
      ],
    }
  ],
  "departments": [{
    "id": "acct",
    "name": "Accounting",
    "users": [
      "889A3EEBAC57E0F14D5BAB7AA87A4E69C432ECCD",
      "F5C84B3CC6317023F1E9914BDC86FC0E339E8110",
      "F9EAB43B627645C48F6FDB424F9AD3D760907C25"
    ]
  }]
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Organization's Controller Contract</p>|
| organizationKey | String | <p>Hashed address (keccak256)</p>|
| id | String | <p>Organization's machine readable ID</p>|
| name | String | <p>Organization's human readable name</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Remove a Department

<p>Removing a department within an organization</p>

```endpoint
DELETE /organizations/:address/departments/:id
```







#### Example Requests


```curl
curl -iX DELETE /organizations/6EDC6101F0B64156ED867BAE925F6CD240635656/departments/accounting
```



#### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Success |  | |



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Remove User from a Department

<p>Remove a user from a department</p>

```endpoint
DELETE /organizations/:address/departments/:departmentId/users/:userAddress
```







#### Example Requests


```curl
curl -iX PUT /organizations/6EDC6101F0B64156ED867BAE925F6CD240635656/departments/accounting/users/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E
```



#### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Success |  | |



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Removes a user from Organization



```endpoint
DELETE /organizations/:orgId/users/:userAddress
```







#### Example Requests


```curl
curl -iX DELETE /organizations/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E/users/10DA7307DA7E74BC54D1E829764E2DE7AD0D8DBB4
```



#### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Success |  | |



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Adds user to Organization



```endpoint
PUT /organizations/:orgId/users/:userAddress
```







#### Example Requests


```curl
curl -iX PUT /organizations/9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E/users/10DA7307DA7E74BC54D1E829764E2DE7AD0D8DBB4
```



#### 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| Success |  | |



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


## Runtime

### Sign the agreement and complete the activity

<p>Signs the agreement at the given address and then completes the activity identified by the activityInstanceId.</p>

```endpoint
PUT /tasks/:activityInstanceId/complete/:agreementAddress/sign
```







#### Example Requests


```curl
curl -i /tasks/:activityInstanceId/complete/:agreementAddress/sign
```






## StaticData

### Read Collection Types



```endpoint
GET /static-data/collection-types
```







#### Example Requests


```curl
curl -i /static-data/collection-types
```


#### Success Response

Success Objects Array

```json
[
    {"collectionType": 0, "label": "Case"},
    {"collectionType": 1, "label": "Deal"},
    {"collectionType": 2, "label": "Dossier"},
    {"collectionType": 3, "label": "Folder"},
    {"collectionType": 4, "label": "Matter"},
    {"collectionType": 5, "label": "Package"},
    {"collectionType": 6, "label": "Project"},
]
```




#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Countries



```endpoint
GET /static-data/iso/countries
```







#### Example Requests


```curl
curl -i /static-data/iso/countries
```


#### Success Response

Success Objects Array

```json
[{
  "country": "US",
  "alpha2": "US",
  "alpha3": "USA",
  "m49": "840",
  "name": "United States of America"
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| countries | Object[] | <p>An array of countries objects (see below)</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Country

<p>Retrieves the country whose <code>alpha2</code> code matches the one passed as parameter.</p>

```endpoint
GET /static-data/iso/countries/:alpha2
```







#### Example Requests


```curl
curl -i /static-data/iso/countries/:alpha2
```


#### Success Response

Success Object

```json
{
  "country": "US",
  "alpha2": "US",
  "alpha3": "USA",
  "m49": "840",
  "name": "United States of America"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| country | Object | <p>A single countries objects (see below)</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Currencies



```endpoint
GET /static-data/iso/currencies
```







#### Example Requests


```curl
curl -i /static-data/iso/currencies
```


#### Success Response

Success Objects Array

```json
[{
    "currency": "AED",
    "alpha3": "AED",
    "m49": "784",
    "name": "United Arab Emirates dirham"
  },
  {
    "currency": "AFN",
    "alpha3": "AFN",
    "m49": "971",
    "name": "Afghan afghani"
  }
]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| currencies | Object[] | <p>An array of currencies objects (see below)</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Currency

<p>Retrieves the currency whose <code>alpha3</code> code matches the one passed as parameter.</p>

```endpoint
GET /static-data/iso/currencies/:alpha3
```







#### Example Requests


```curl
curl -i /static-data/iso/currencies/:alpha3
```


#### Success Response

Success Objects Array

```json
{
  "currency": "USD",
  "alpha3": "USD",
  "m49": "840",
  "name": "United States dollar"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| currency | Object | <p>A single currency objects (see below)</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Parameter Types



```endpoint
GET /static-data/parameter-types
```







#### Example Requests


```curl
curl -i /static-data/parameter-types
```


#### Success Response

Success Objects Array

```json
[
    {"parameterType": 0, "label": "Boolean"},
    {"parameterType": 1, "label": "String"},
    {"parameterType": 2, "label": "Number"},
    {"parameterType": 3, "label": "Date"},
    {"parameterType": 4, "label": "Datetime"},
    {"parameterType": 5, "label": "Monetary Amount"},
    {"parameterType": 6, "label": "User/Organization"},
    {"parameterType": 7, "label": "Contract Address"},
    {"parameterType": 8, "label": "Signing Party"}
]
```




#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read a Country&#39;s Regions

<p>Retrieves an array of regions belonging to the country whose <code>alpha2</code> code matches the one passed as parameter. Note that a region may have its <code>code2</code> OR <code>code3</code> property populated, NOT both. Thus to represent regions in the UI dropdown, we can use <code>&lt;alpha2&gt;-&lt;code2 or code3&gt;</code> followed by the name.</p>

```endpoint
GET /static-data/iso/countries/:alpha2/regions
```







#### Example Requests


```curl
curl -i /static-data/iso/countries/:alpha2/regions
```


#### Success Response

Success Objects Array

```json
[{
    "country": "CA",
    "region": "0798FDAD71114ABA2A3CD6B4BD503410F8EF6B9208B889CC0BB33CD57CEEAA9C",
    "alpha2": "CA",
    "code2": "AB",
    "code3": "",
    "name": "Alberta"
  },
  {
    "country": "CA",
    "region": "1C16E32AED9920491BFED16E1396344027C8D6916833C64CE7F8CCF541398F3B",
    "alpha2": "CA",
    "code2": "NT",
    "code3": "",
    "name": "Northwest Territories"
  }
]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| regions | Object[] | <p>An array of regions objects (see below)</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


## Users

### Activate user account

<p>Activates the user account</p>

```endpoint
GET /users/activate/:activationCode
```







#### Example Requests


```curl
curl -iX GET /users/activate/vdk7bd2esdf3234...
```






### Update User Profile of currently logged in user

<p>Updates a single users profile identified by the access token.</p>

```endpoint
PUT /users/profile
```







#### Example Requests


```curl
curl -iX PUT /users/profile
```


#### Success Response

Success Object

```json
{
  "address": "605401BB8B9E597CC40C35D1F0185DE94DBCE533",
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Users's Controller Contract</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Log out a User



```endpoint
POST /users/logout
```







#### Example Requests


```curl
curl -iX PUT /users/logout
```






### Request password reset for a user account

<p>Sends an email with a password recovery code to the given email address</p>

```endpoint
POST /users/password-recovery
```







#### Example Requests


```curl
curl -iX POST /users/password-recovery
```






### Read User Profile of currently logged in user

<p>Retrieves a single users profile identified by the access token.</p>

```endpoint
GET /users/profile
```







#### Example Requests


```curl
curl -i /users/profile
```


#### Success Response

Success Object

```json
{
  "address": "9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E",
  "id": "j.smith",
  "email": "jsmith@monax.io",
  "organization": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
  "organizationId": "acmecorp92",
  "organizationName": "ACME Corp",
  "firstName": "Joe",
  "lastName": "Smith",
  "country": "CA",
  "region": "1232SDFF3EC680332BEFDDC3CA12CBBD",
  "isProducer": false,
  "onboarding": true,
  "createdAt": ""
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Users's Controller Contract</p>|
| id | String | <p>Users's human readable ID</p>|
| email | String | <p>Users's email address</p>|
| organization | String | <p>Organization's Controller Contract</p>|
| organizationId | String | <p>Organization's machine readable ID</p>|
| organizationName | String | <p>Organization's human readable name</p>|
| firstName | String | <p>User's first name</p>|
| lastName | String | <p>User's last name</p>|
| country | String | <p>User's country code</p>|
| region | String | <p>Contract address of user's region</p>|
| isProducer | Boolean | <p>Boolean representing whether user account is producer type (as opposed to consumer type)</p>|
| onboarding | Boolean | <p>Boolean representing whether user prefers to see onboarding screens</p>|
| createdAt | String | <p>Timestamp of user account creation</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Read Users

<p>Retrieves user information. The <code>organization</code> query parameter is optional. It can be used to filter users belonging to a specific organization or retrieving users not belonging to an organization, yet (via <code>?organization=null</code>).</p> <p>Note: The organization address is returned as &quot;0000000000000000000000000000000000000000&quot; for user that do not belong to an organization.</p>

```endpoint
GET /users
```







#### Example Requests


```curl
curl -i /users
```


#### Success Response

Success Objects Array

```json
[{
  "address": "9F24307DA7E74BC54D1E829764E2DE7AD0D8DF6E",
  "id": "j.smith",
  "organization": "707791D3BBD4FDDE615D0EC4BB0EB3D909F66890",
  "organizationId": "acmecorp92",
  "organizationName": "ACME Corp"
}]
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>Users's Controller Contract</p>|
| id | String | <p>Users's machine readable ID</p>|
| organization | String | <p>Organization's Controller Contract</p>|
| organizationId | String | <p>Organization's machine readable ID</p>|
| organizationName | String | <p>Organization's human readable name</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Create a New User

<p>Creating a new user</p>

```endpoint
POST /users
```







#### Example Requests


```curl
curl -iX POST /users
```


#### Success Response

Success Object

```json
{
  "address": "605401BB8B9E597CC40C35D1F0185DE94DBCE533",
  "id": "johnsmith"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| userData | Object | <p>The &quot;address&quot; and &quot;id&quot; of the User</p>|



#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


### Reset password for user account

<p>Resets the user's password with the given password, if the recovery code is valid</p>

```endpoint
PUT /users/password-recovery/:recoveryCode
```







#### Example Requests


```curl
curl -iX PUT /users/password-recovery/vdk7bd2esdf3234...
```






### Log in as a User



```endpoint
POST /users/login
```







#### Example Requests


```curl
curl -iX PUT /users/login
```


#### Success Response

Success Object

```json
{
  "address": "41D6BC9143DF87A07F65FCAF642FB89E16D26548",
  "id": "jsmith",
  "createdAt": "2018-06-25T13:44:26.925Z"
}
```


#### Success 200

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| address | String | <p>The address of the user</p>|
| id | String | <p>The id (username) of the user</p>|
| A | String | <p>timestamp of the account creation</p>|




### Validates the given password recovery code

<p>Checks if the given password recovery code is valid</p>

```endpoint
GET /users/password-recovery/:recoveryCode
```







#### Example Requests


```curl
curl -iX GET /users/password-recovery/vdk7bd2esdf3234...
```






### Validate user token

<p>This route validates the JWT <code>access_token</code> which should be set as cookie in the request</p>

```endpoint
GET /users/token/validate
```







#### Example Requests


```curl
curl -iX GET /users/token/validate
```


#### Success Response

Success Object

```json
{
  "address": "41D6BC9143DF87A07F65FCAF642FB89E16D26548",
  "id": "jsmith",
}
```




#### Error 4xx

| Name     | Type       | Description                           |
|:---------|:-----------|:--------------------------------------|
| NotLoggedIn |  | <p>The user making the request does not have a proper authentication token.</p>|


