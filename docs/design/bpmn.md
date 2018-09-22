# Creating A Workflow

The following are descriptions of the elements required to compose a valid BPMN diagram for the Agreements Network using the Camunda [desktop modeler](https://camunda.com/products/modeler/) or [integrated modeler](https://staging.beta.monax.io/editor) in the Monax Webapp.

All values in 'quotes' must be used as is (without quotes).

## Collaboration

<a name="collaboration"></a>
The Collaboration element is the outermost scope which should contain all other elements.

### Required Fields:

I. Id

* Set through: Extensions -> Properties
* Name: 'id'
* Value: #{uniqueId}
* Example: 'Acme_Model_123'
* Notes: Must be unique. This field will be prepopulated with a generated id and does not need to be updated.

II. BPMN version
* Set through: Extensions -> Properties
* Name: 'version'
* Value: '1.0.0'
* Notes: This field will be prepopulated and should not be updated.

## Participant

The Participant element represents a process and contains all relevant Lanes, Sequence Flows, and Tasks.

### Required Fields:

I. Id
* Set through: General -> Id
* Notes: This field will be prepopulated with a generated id and does not need to be updated.

II. Name
* Set through: General -> Name
* Notes: This field is only used as a label in the diagram and while it is not required, is highly suggested for viewing purposes.

III. Process Id
* Set through: General -> Process Id
* Notes: This field will be prepopulated with a generated id and does not need to be updated.

IV. Process Name
* Set through: General -> Process Name
* Notes: The value of this field is what is used to populate the process dropdown when creating an archetype so should be as specific but succinct as possible.

V. Process Interface
* Set through: Extensions -> Properties
* Name: 'processInterface'
* Value: 'Agreement Formation' or 'Agreement Execution'
* Notes: This field will be prepopulated if entering the modeler through the archetype form, but must be manually filled out when on the main modeler psge.

## Lane

Participant elements are divided into Lane elements (or composed of a single Lane element) which contain the Tasks for the given performer.

Lanes assigned to the agreement parties (see [multi-instance performers](#multi)) reproduce the given Tasks for each user/organization account assigned as a party member.

_Note regarding the editor- there is no button to create a single-Lane Participant. To create one, split the Participant into two Lanes, and delete one. For the desktop app, first name the bottom Lane and then delete the top Lane._

_As of May 21, 2018: execution processes cannot accept multi-instance performers_

### Required Fields:

I. Id
* Set through: General -> Id
* Notes: This field will be prepopulated with a generated id and does not need to be updated.

II. Name
* Set through: General -> Name
* Notes: This field is only used as a label in the diagram and while it is not required, is highly suggested for viewing purposes.

#### For Assigning a Specific Account:

III. Account
* Set through: Extensions -> Properties
* Name: 'account'
* Value: #{accountAddress}
* Example: '82ad79deea54667282ad79dee6672'

#### For Assigning Performers Dynamically:

III. Conditional Performer
* Set through: Extensions -> Properties
* Name: 'conditionalPerformer'
* Value: 'true'

IV. Data Storage Id
* Set through: Extensions -> Properties
* Name: 'dataStorageId'
* Value: 'agreement'

#### For Single-Instance Performers:

V. Data Path
* Set through: Extensions -> Properties
* Name: 'dataPath'
* Value: #{customFieldName}
* Example: 'Buyer'
* Notes: The value of this field corresponds to the name of the custom field to be added to the archetype. The user/organization account assigned to this custom field will be responsible for Tasks in this Lane.

<a name="multi"></a>

#### For Multi-Instance Performers (Agreement Parties):

V. Data Path
* Set through: Extensions -> Properties
* Name: 'dataPath'
* Value: 'AGREEMENT_PARTIES'
* Notes: All user/organization custom fields in the archetype marked as a signatory will be considered an agreement party and responsible for Tasks in this Lane.

## Task

Task elements should be placed in the Lane with the corresponding performer.

To change the Task type, select the Task element and click the wrench icon to open the list of options.

### Required Fields (User Task):

I. Id
* Set through: General -> Id
* Notes: This field will be prepopulated with a generated id. This id is displayed in the UI when viewing tasks and should be changed to something human-readable. All signing tasks for multi-instance performers/agreement parties (see below) should have an id starting with 'Sign'. The UI uses this as an indication that signing is required before task completion. Tasks assigned to single-instance performers, should therefore NOT have an id starting with 'Sign'.

II. Name
* Set through: General -> Name
* Notes: This field is only used as a label in the diagram and while it is not required, is highly suggested for viewing purposes.

#### For Multi-Instance Performers (Agreement Parties):

III. Sequential Multi-Instance Flag
* Set through: Wrench Icon -> Triple-Horizontal Bar Icon

#### For Signing Tasks- Multi-Instance Performers (Agreement Parties) Only:

IV. Application
* Set through: Extensions -> Properties
* Name: 'application'
* Value: 'AgreementSignatureCheck'

V. Data Storage Path
* Set through: Extensions -> Properties
* Name: 'dataStoragePath'
* Value: 'agreement'

## Sequence Flow

Sequence Flow elements are the arrows connecting Tasks which indicate the order in which they should be completed.

Sequence Flow elements are not required between formation and execution processes.
