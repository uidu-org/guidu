export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * Represents non-fractional signed whole numeric values. Since the value may
   * exceed the size of a 32-bit integer, it's encoded as a string.
   */
  BigInt: any;
  /** An ISO 8601-encoded date */
  ISO8601Date: any;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  /** Represents untyped JSON */
  JSON: any;
};

/** ActiveRecord timestamps (created_at and updated_at) */
export type ActiveRecordTimestamp = {
  createdAt: Scalars['ISO8601DateTime'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Address = ActiveRecordTimestamp & Node & {
  address?: Maybe<Scalars['String']>;
  administrativeAreaLevel1?: Maybe<Scalars['String']>;
  administrativeAreaLevel1Code?: Maybe<Scalars['String']>;
  administrativeAreaLevel2?: Maybe<Scalars['String']>;
  administrativeAreaLevel2Code?: Maybe<Scalars['String']>;
  administrativeAreaLevel3?: Maybe<Scalars['String']>;
  administrativeAreaLevel3Code?: Maybe<Scalars['String']>;
  administrativeAreaLevel4?: Maybe<Scalars['String']>;
  administrativeAreaLevel4Code?: Maybe<Scalars['String']>;
  administrativeAreaLevel5?: Maybe<Scalars['String']>;
  administrativeAreaLevel5Code?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  formattedAddress?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  placeId?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  primary?: Maybe<Scalars['Boolean']>;
  streetAddress?: Maybe<Scalars['String']>;
  streetNumber?: Maybe<Scalars['String']>;
  types?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type App = ActiveRecordTimestamp & Node & WithPublishable & WithTags & WithWysiwyg & {
  abstract?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['JSON']>;
  category?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  draft?: Maybe<Scalars['Boolean']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organizationAppsCount?: Maybe<Scalars['Int']>;
  product?: Maybe<Product>;
  publishableStatus: Scalars['String'];
  published?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  scheduled?: Maybe<Scalars['Boolean']>;
  slug?: Maybe<Scalars['String']>;
  tags: Array<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
  version?: Maybe<Scalars['String']>;
};


export type AppIconArgs = {
  variant?: Maybe<Scalars['String']>;
};


export type AppTagsArgs = {
  scope?: Maybe<Scalars['String']>;
};

export type AppAttributes = {
  abstract?: Maybe<Scalars['String']>;
  appTagList?: Maybe<Array<Scalars['String']>>;
  body?: Maybe<Scalars['JSON']>;
  category?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['JSON']>;
  icon?: Maybe<Scalars['JSON']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  version?: Maybe<Scalars['String']>;
};

/** Objects can be applied to */
export type Applicable = Call | Grant | Job | Opportunity;

/** Objects that can apply to applicable */
export type Applicant = Contact;

export type Application = ActiveRecordTimestamp & Node & {
  applicable?: Maybe<Applicable>;
  applicant?: Maybe<Applicant>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type ApplicationAttributes = {
  applicableId?: Maybe<Scalars['ID']>;
  applicantId?: Maybe<Scalars['ID']>;
  status?: Maybe<Scalars['String']>;
};

export type Attachment = ActiveRecordTimestamp & Node & WithWysiwyg & {
  body?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['ISO8601DateTime'];
  file?: Maybe<Scalars['JSON']>;
  id: Scalars['ID'];
  position?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Objects which may be attended */
export type Attendable = EventInstance;

export type Attendance = ActiveRecordTimestamp & Node & {
  attendable: Attendable;
  attender: Attender;
  checkedInAt?: Maybe<Scalars['ISO8601DateTime']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  orderItem?: Maybe<OrderItem>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type AttendanceAttributes = {
  attendableId?: Maybe<Scalars['ID']>;
  attenderId?: Maybe<Scalars['ID']>;
  checkedInAt?: Maybe<Scalars['ISO8601DateTime']>;
  orderItemId?: Maybe<Scalars['ID']>;
};

/** Objects that can attend to attendable objects */
export type Attender = Contact;

export type Audience = ActiveRecordTimestamp & Node & WithOrganization & {
  color?: Maybe<Scalars['String']>;
  contact?: Maybe<Contact>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  filterModel?: Maybe<Scalars['JSON']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  position?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type AudienceAttributes = {
  color?: Maybe<Scalars['String']>;
  contactId?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  filterModel?: Maybe<Scalars['JSON']>;
  icon?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['Int']>;
  position?: Maybe<Scalars['Int']>;
};

/** The connection type for Audience. */
export type AudienceConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<AudienceEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Audience>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type AudienceEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Audience>;
};

export type Audit = ActiveRecordTimestamp & Node & {
  action?: Maybe<Scalars['String']>;
  auditedChanges?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['ISO8601DateTime'];
};


export type Board = ActiveRecordTimestamp & Node & {
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  tasks?: Maybe<Array<Task>>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Call = ActiveRecordTimestamp & Node & WithAddresses & WithContact & WithCover & WithPost & WithWysiwyg & {
  addresses: Array<Address>;
  applications?: Maybe<Array<Application>>;
  body?: Maybe<Scalars['JSON']>;
  contact?: Maybe<Contact>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  type: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};


export type CallAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type CallCoverArgs = {
  variant?: Maybe<Scalars['String']>;
};

export type CallAttributes = {
  applicationsCount?: Maybe<Scalars['Int']>;
  cachedCallTagList?: Maybe<Scalars['String']>;
  callableId?: Maybe<Scalars['Int']>;
  callableType?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  descriptionRaw?: Maybe<Scalars['String']>;
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  preferences?: Maybe<Scalars['JSON']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  type?: Maybe<Scalars['String']>;
  what?: Maybe<Scalars['String']>;
};

export type Campaign = ActiveRecordTimestamp & Node & WithContact & WithOrganization & {
  audience?: Maybe<Audience>;
  cachedCampaignTagList?: Maybe<Scalars['String']>;
  campaignable?: Maybe<Campaignable>;
  contact?: Maybe<Contact>;
  createdAt: Scalars['ISO8601DateTime'];
  emailBody?: Maybe<Scalars['String']>;
  emailBodyData?: Maybe<Scalars['JSON']>;
  emailFromEmail?: Maybe<Scalars['String']>;
  emailFromName?: Maybe<Scalars['String']>;
  emailReplyTo?: Maybe<Scalars['String']>;
  emailSubject?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  innerName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  scheduledAt?: Maybe<Scalars['ISO8601DateTime']>;
  status?: Maybe<Scalars['String']>;
  textMessageBody?: Maybe<Scalars['JSON']>;
  textMessageFromName?: Maybe<Scalars['String']>;
  textMessageFromNumber?: Maybe<Scalars['String']>;
  trigger?: Maybe<Trigger>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type CampaignAttributes = {
  audienceId?: Maybe<Scalars['ID']>;
  cachedCampaignTagList?: Maybe<Scalars['String']>;
  campaignableId?: Maybe<Scalars['ID']>;
  contactId?: Maybe<Scalars['ID']>;
  emailBody?: Maybe<Scalars['String']>;
  emailBodyData?: Maybe<Scalars['JSON']>;
  emailFromEmail?: Maybe<Scalars['String']>;
  emailFromName?: Maybe<Scalars['String']>;
  emailReplyTo?: Maybe<Scalars['String']>;
  emailSubject?: Maybe<Scalars['String']>;
  innerName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['ID']>;
  scheduledAt?: Maybe<Scalars['ISO8601DateTime']>;
  textMessageBody?: Maybe<Scalars['JSON']>;
  textMessageFromName?: Maybe<Scalars['String']>;
  textMessageFromNumber?: Maybe<Scalars['String']>;
  triggerId?: Maybe<Scalars['ID']>;
  type?: Maybe<Scalars['String']>;
};

/** Objects can have automatic or manual email and text campaigns */
export type Campaignable = Call | DonationCampaign;

export type Collection = ActiveRecordTimestamp & Node & WithAddresses & WithCover & WithOrganization & {
  addresses: Array<Address>;
  body?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type CollectionAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type CollectionCoverArgs = {
  variant?: Maybe<Scalars['String']>;
};

export type ColumnsState = {
  aggFunc?: Maybe<Scalars['String']>;
  colId?: Maybe<Scalars['String']>;
  hide?: Maybe<Scalars['Boolean']>;
  pinned?: Maybe<Scalars['String']>;
  pivotIndex?: Maybe<Scalars['Int']>;
  rowGroupIndex?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type ColumnsStateAttribute = {
  aggFunc?: Maybe<Scalars['String']>;
  colId?: Maybe<Scalars['String']>;
  flex?: Maybe<Scalars['Int']>;
  hide?: Maybe<Scalars['Boolean']>;
  pinned?: Maybe<Scalars['String']>;
  pivotIndex?: Maybe<Scalars['Int']>;
  rowGroupIndex?: Maybe<Scalars['Int']>;
  width?: Maybe<Scalars['Int']>;
};

export type Comment = ActiveRecordTimestamp & Node & {
  bodyData?: Maybe<Scalars['JSON']>;
  commentableId?: Maybe<Scalars['Int']>;
  commentableType?: Maybe<Scalars['String']>;
  commenterId?: Maybe<Scalars['Int']>;
  commenterType?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type CommentAttributes = {
  bodyData?: Maybe<Scalars['JSON']>;
  commentableId?: Maybe<Scalars['Int']>;
  commentableType?: Maybe<Scalars['String']>;
  commenterId?: Maybe<Scalars['Int']>;
  commenterType?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
};

export type Contact = ActiveRecordTimestamp & Node & WithAddresses & WithAvatar & WithEnhancements & {
  addresses: Array<Address>;
  applicationsCount?: Maybe<Scalars['Int']>;
  attendancesCount?: Maybe<Scalars['Int']>;
  avatar?: Maybe<Scalars['String']>;
  avatarData?: Maybe<Scalars['JSON']>;
  cachedContactGroupList?: Maybe<Scalars['String']>;
  cachedContactTagList?: Maybe<Scalars['String']>;
  commentsCount?: Maybe<Scalars['Int']>;
  createdAt: Scalars['ISO8601DateTime'];
  createdById?: Maybe<Scalars['Int']>;
  createdByType?: Maybe<Scalars['String']>;
  currentSignInAt?: Maybe<Scalars['ISO8601DateTime']>;
  currentSignInIp?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  donationsCount?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  enhancements?: Maybe<Scalars['JSON']>;
  existingOrganizationId?: Maybe<Scalars['Int']>;
  existingUserId?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  fullName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  importId?: Maybe<Scalars['Int']>;
  lastName?: Maybe<Scalars['String']>;
  lastRequestAt?: Maybe<Scalars['ISO8601DateTime']>;
  lastSignInAt?: Maybe<Scalars['ISO8601DateTime']>;
  lastSignInIp?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  notifications?: Maybe<NotificationConnection>;
  online?: Maybe<Scalars['Boolean']>;
  organizationId?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  preferences?: Maybe<Scalars['JSON']>;
  role: Scalars['String'];
  signInCount?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  stripeBillingDetails?: Maybe<Scalars['JSON']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  taxReturnCampaignGiversCount?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
  website?: Maybe<Scalars['String']>;
};


export type ContactAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type ContactAvatarArgs = {
  variant?: Maybe<Scalars['String']>;
};


export type ContactNotificationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type ContactAttributes = {
  applicationsCount?: Maybe<Scalars['Int']>;
  attendancesCount?: Maybe<Scalars['Int']>;
  avatarData?: Maybe<Scalars['JSON']>;
  commentsCount?: Maybe<Scalars['Int']>;
  createdById?: Maybe<Scalars['Int']>;
  createdByType?: Maybe<Scalars['String']>;
  currentSignInAt?: Maybe<Scalars['ISO8601DateTime']>;
  currentSignInIp?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  donationsCount?: Maybe<Scalars['Int']>;
  email?: Maybe<Scalars['String']>;
  existingOrganizationId?: Maybe<Scalars['Int']>;
  existingUserId?: Maybe<Scalars['Int']>;
  firstName?: Maybe<Scalars['String']>;
  importId?: Maybe<Scalars['ID']>;
  lastName?: Maybe<Scalars['String']>;
  lastRequestAt?: Maybe<Scalars['ISO8601DateTime']>;
  lastSignInAt?: Maybe<Scalars['ISO8601DateTime']>;
  lastSignInIp?: Maybe<Scalars['String']>;
  online?: Maybe<Scalars['Boolean']>;
  organizationId?: Maybe<Scalars['Int']>;
  phone?: Maybe<Scalars['String']>;
  preferences?: Maybe<Scalars['JSON']>;
  role?: Maybe<Scalars['String']>;
  signInCount?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['String']>;
  stripeCustomerId?: Maybe<Scalars['String']>;
  summary?: Maybe<Scalars['String']>;
  taxReturnCampaignGiversCount?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export type Conversation = ActiveRecordTimestamp & Node & WithOrganization & {
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  lastMessage?: Maybe<Message>;
  members?: Maybe<Array<Member>>;
  messages?: Maybe<MessageConnection>;
  organization?: Maybe<Organization>;
  receiver: Sender;
  sender: Sender;
  status?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type ConversationMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** The connection type for Conversation. */
export type ConversationConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ConversationEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Conversation>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ConversationEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Conversation>;
};

/** Autogenerated input type of CreateApp */
export type CreateAppInput = {
  attributes: AppAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateApp */
export type CreateAppPayload = {
  app?: Maybe<App>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateApplication */
export type CreateApplicationInput = {
  attributes: ApplicationAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateApplication */
export type CreateApplicationPayload = {
  application?: Maybe<Application>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateAttendance */
export type CreateAttendanceInput = {
  attributes: AttendanceAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateAttendance */
export type CreateAttendancePayload = {
  attendance?: Maybe<Attendance>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateAudience */
export type CreateAudienceInput = {
  attributes: AudienceAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateAudience */
export type CreateAudiencePayload = {
  audience?: Maybe<Audience>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateBoard */
export type CreateBoardInput = {
  amount: Scalars['Int'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  contactId: Scalars['Int'];
  currency: Scalars['String'];
  donationCampaignId: Scalars['Int'];
  paymentMethod: Scalars['String'];
  preferences?: Maybe<Scalars['JSON']>;
};

/** Autogenerated return type of CreateBoard */
export type CreateBoardPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  donation?: Maybe<Donation>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateCall */
export type CreateCallInput = {
  attributes: CallAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateCall */
export type CreateCallPayload = {
  call?: Maybe<Call>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateCampaign */
export type CreateCampaignInput = {
  attributes: CampaignAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateCampaign */
export type CreateCampaignPayload = {
  campaign?: Maybe<Campaign>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateComment */
export type CreateCommentInput = {
  attributes: CommentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateComment */
export type CreateCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comment?: Maybe<Comment>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateContact */
export type CreateContactInput = {
  attributes: ContactAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateContact */
export type CreateContactPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  contact?: Maybe<Contact>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateConversation */
export type CreateConversationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateConversation */
export type CreateConversationPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateDashlet */
export type CreateDashletInput = {
  attributes: DashletAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateDashlet */
export type CreateDashletPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dashlet?: Maybe<Dashlet>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateDataView */
export type CreateDataViewInput = {
  attributes: DataViewAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  viewableId: Scalars['String'];
};

/** Autogenerated return type of CreateDataView */
export type CreateDataViewPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dataView?: Maybe<DataView>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateDonationCampaign */
export type CreateDonationCampaignInput = {
  address?: Maybe<Scalars['String']>;
  attributes: DonationCampaignAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateDonationCampaign */
export type CreateDonationCampaignPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  donationCampaign?: Maybe<DonationCampaign>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateDonation */
export type CreateDonationInput = {
  attributes: DonationAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  orderAttributes?: Maybe<OrderAttributes>;
  subscriptionAttributes?: Maybe<SubscriptionAttributes>;
};

/** Autogenerated return type of CreateDonation */
export type CreateDonationPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  donation?: Maybe<Donation>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateEvent */
export type CreateEventInput = {
  attributes: EventAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateEvent */
export type CreateEventPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  event?: Maybe<Event>;
  instance?: Maybe<EventInstance>;
};

/** Autogenerated input type of CreateExperience */
export type CreateExperienceInput = {
  attributes: ExperienceAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateExperience */
export type CreateExperiencePayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  experience?: Maybe<Experience>;
};

/** Autogenerated input type of CreateField */
export type CreateFieldInput = {
  attributes: FieldAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  fieldParentId: Scalars['ID'];
};

/** Autogenerated return type of CreateField */
export type CreateFieldPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  field?: Maybe<Field>;
};

/** Autogenerated input type of CreateImport */
export type CreateImportInput = {
  attributes: ImportAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateImportMatch */
export type CreateImportMatchInput = {
  attributes: ImportMatchAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  importId: Scalars['ID'];
};

/** Autogenerated return type of CreateImportMatch */
export type CreateImportMatchPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  importMatch?: Maybe<ImportMatch>;
};

/** Autogenerated return type of CreateImport */
export type CreateImportPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  importItem?: Maybe<Import>;
};

/** Autogenerated input type of CreateMessage */
export type CreateMessageInput = {
  attachments?: Maybe<Array<Scalars['JSON']>>;
  attributes: MessageAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  messageableId: Scalars['ID'];
  replyToId?: Maybe<Scalars['ID']>;
};

/** Autogenerated return type of CreateMessage */
export type CreateMessagePayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  message?: Maybe<Message>;
  messageEdge?: Maybe<MessageEdge>;
  messagesConnection?: Maybe<MessageConnection>;
};


/** Autogenerated return type of CreateMessage */
export type CreateMessagePayloadMessagesConnectionArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

/** Autogenerated input type of CreateOrder */
export type CreateOrderInput = {
  attributes: OrderAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of CreateOrderItem */
export type CreateOrderItemInput = {
  attributes: OrderItemAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateOrderItem */
export type CreateOrderItemPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  orderItem?: Maybe<OrderItem>;
};

/** Autogenerated return type of CreateOrder */
export type CreateOrderPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  order?: Maybe<Order>;
};

/** Autogenerated input type of CreatePaymentIntent */
export type CreatePaymentIntentInput = {
  amount: Scalars['Int'];
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  metadata?: Maybe<Scalars['JSON']>;
};

/** Autogenerated return type of CreatePaymentIntent */
export type CreatePaymentIntentPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  paymentIntent?: Maybe<Scalars['JSON']>;
};

/** Autogenerated input type of CreatePlan */
export type CreatePlanInput = {
  attributes: PlanAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreatePlan */
export type CreatePlanPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  plan?: Maybe<Plan>;
};

/** Autogenerated input type of CreateProduct */
export type CreateProductInput = {
  attributes: ProductAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateProduct */
export type CreateProductPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  product?: Maybe<Product>;
};

/** Autogenerated input type of CreateProject */
export type CreateProjectInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateProject */
export type CreateProjectPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateProposal */
export type CreateProposalInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateProposal */
export type CreateProposalPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateSku */
export type CreateSkuInput = {
  attributes: SkuAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateSku */
export type CreateSkuPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  sku?: Maybe<Sku>;
};

/** Autogenerated input type of CreateStory */
export type CreateStoryInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateStory */
export type CreateStoryPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of CreateSubscription */
export type CreateSubscriptionInput = {
  attributes: SubscriptionAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateSubscription */
export type CreateSubscriptionPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  subscription?: Maybe<Subscription>;
};

/** Autogenerated input type of CreateTask */
export type CreateTaskInput = {
  attributes: TaskAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateTask */
export type CreateTaskPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  task?: Maybe<Task>;
};

/** Autogenerated input type of CreateTeam */
export type CreateTeamInput = {
  attributes: TeamAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateTeam */
export type CreateTeamPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  team?: Maybe<Team>;
};

/** Autogenerated input type of CreateVote */
export type CreateVoteInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of CreateVote */
export type CreateVotePayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

export type Dashlet = Node & {
  createdAt: Scalars['ISO8601DateTime'];
  createdById?: Maybe<Scalars['Int']>;
  createdByType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  kind?: Maybe<Scalars['Int']>;
  layout?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  preferences?: Maybe<Scalars['JSON']>;
  query?: Maybe<Scalars['JSON']>;
  type?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
  viewableId: Scalars['Int'];
  viewableType: Scalars['String'];
};

export type DashletAttributes = {
  createdById?: Maybe<Scalars['Int']>;
  createdByType?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['Int']>;
  layout?: Maybe<Scalars['JSON']>;
  name?: Maybe<Scalars['String']>;
  preferences?: Maybe<Scalars['JSON']>;
  query?: Maybe<Scalars['JSON']>;
  type?: Maybe<Scalars['String']>;
  viewableId?: Maybe<Scalars['Int']>;
  viewableType?: Maybe<Scalars['String']>;
};

export type DataView = ActiveRecordTimestamp & Node & {
  createdAt: Scalars['ISO8601DateTime'];
  fields?: Maybe<Array<Scalars['String']>>;
  filterModel?: Maybe<FilterModel>;
  groupers?: Maybe<Array<Grouper>>;
  id: Scalars['ID'];
  kind: Scalars['String'];
  model?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  position: Scalars['Int'];
  preferences?: Maybe<DataViewPreferences>;
  sorters?: Maybe<Array<Sorter>>;
  state?: Maybe<Array<ColumnsState>>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Attributes for creating or updating a data_view */
export type DataViewAttributes = {
  fields?: Maybe<Array<Scalars['String']>>;
  filterModel?: Maybe<FilterModelAttribute>;
  groupers?: Maybe<Array<GrouperAttribute>>;
  kind?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  preferences?: Maybe<DataViewPreferencesAttribute>;
  sorters?: Maybe<Array<SorterAttribute>>;
  state?: Maybe<Array<ColumnsStateAttribute>>;
};

export type DataViewPreferences = {
  columnCount?: Maybe<Scalars['String']>;
  endDateField?: Maybe<Scalars['String']>;
  primaryField?: Maybe<Scalars['String']>;
  startDateField?: Maybe<Scalars['String']>;
};

export type DataViewPreferencesAttribute = {
  columnCount?: Maybe<Scalars['String']>;
  endDateField?: Maybe<Scalars['String']>;
  primaryField?: Maybe<Scalars['String']>;
  startDateField?: Maybe<Scalars['String']>;
};

/** Autogenerated input type of DeleteApp */
export type DeleteAppInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteApp */
export type DeleteAppPayload = {
  app?: Maybe<App>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteApplication */
export type DeleteApplicationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteApplication */
export type DeleteApplicationPayload = {
  application?: Maybe<Application>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteAttendance */
export type DeleteAttendanceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteAttendance */
export type DeleteAttendancePayload = {
  attendance?: Maybe<Attendance>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteAudience */
export type DeleteAudienceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteAudience */
export type DeleteAudiencePayload = {
  audience?: Maybe<Audience>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteCall */
export type DeleteCallInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteCall */
export type DeleteCallPayload = {
  call?: Maybe<Call>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteCampaign */
export type DeleteCampaignInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteCampaign */
export type DeleteCampaignPayload = {
  campaign?: Maybe<Campaign>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteComment */
export type DeleteCommentInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteComment */
export type DeleteCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comment?: Maybe<Comment>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteContact */
export type DeleteContactInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteContact */
export type DeleteContactPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  contact?: Maybe<Contact>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteDashlet */
export type DeleteDashletInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteDashlet */
export type DeleteDashletPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dashlet?: Maybe<Dashlet>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteDonationCampaign */
export type DeleteDonationCampaignInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteDonationCampaign */
export type DeleteDonationCampaignPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  donationCampaign?: Maybe<DonationCampaign>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteDonation */
export type DeleteDonationInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteDonation */
export type DeleteDonationPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  donation?: Maybe<Donation>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DeleteExperience */
export type DeleteExperienceInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteExperience */
export type DeleteExperiencePayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  experience?: Maybe<Experience>;
};

/** Autogenerated input type of DeleteField */
export type DeleteFieldInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteField */
export type DeleteFieldPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  field?: Maybe<Field>;
};

/** Autogenerated input type of DeleteOrder */
export type DeleteOrderInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated input type of DeleteOrderItem */
export type DeleteOrderItemInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteOrderItem */
export type DeleteOrderItemPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  orderItem?: Maybe<OrderItem>;
};

/** Autogenerated return type of DeleteOrder */
export type DeleteOrderPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  order?: Maybe<Order>;
};

/** Autogenerated input type of DeletePlan */
export type DeletePlanInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeletePlan */
export type DeletePlanPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  plan?: Maybe<Plan>;
};

/** Autogenerated input type of DeleteProduct */
export type DeleteProductInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteProduct */
export type DeleteProductPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  product?: Maybe<Product>;
};

/** Autogenerated input type of DeleteSku */
export type DeleteSkuInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteSku */
export type DeleteSkuPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  sku?: Maybe<Sku>;
};

/** Autogenerated input type of DeleteSubscription */
export type DeleteSubscriptionInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteSubscription */
export type DeleteSubscriptionPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  subscription?: Maybe<Subscription>;
};

/** Autogenerated input type of DeleteTask */
export type DeleteTaskInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DeleteTask */
export type DeleteTaskPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  task?: Maybe<Task>;
};

/** Autogenerated input type of DestroyDataView */
export type DestroyDataViewInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DestroyDataView */
export type DestroyDataViewPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dataView?: Maybe<DataView>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of DestroyImportMatch */
export type DestroyImportMatchInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of DestroyImportMatch */
export type DestroyImportMatchPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  importMatch?: Maybe<ImportMatch>;
};

export type Donation = ActiveRecordTimestamp & Node & WithContact & WithPaths & WithPreferences & WithWysiwyg & {
  adminPath?: Maybe<Scalars['String']>;
  adminUrl?: Maybe<Scalars['String']>;
  /** Donation amount in cents */
  amount: Scalars['Int'];
  appPath?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['JSON']>;
  communityPath?: Maybe<Scalars['String']>;
  communityUrl?: Maybe<Scalars['String']>;
  contact?: Maybe<Contact>;
  createdAt: Scalars['ISO8601DateTime'];
  createdById?: Maybe<Scalars['Int']>;
  createdByType?: Maybe<Scalars['String']>;
  /** Currency */
  currency: Scalars['String'];
  /** DonationCampaign associated to this donation */
  donationCampaign: DonationCampaign;
  id: Scalars['ID'];
  /** One-time donation */
  orderItem?: Maybe<OrderItem>;
  paidAt?: Maybe<Scalars['ISO8601DateTime']>;
  paths?: Maybe<Scalars['JSON']>;
  paymentMethod?: Maybe<Scalars['String']>;
  preferences?: Maybe<Scalars['JSON']>;
  publicPath?: Maybe<Scalars['String']>;
  publicUrl?: Maybe<Scalars['String']>;
  refundedAt?: Maybe<Scalars['ISO8601DateTime']>;
  /** Recurring donations */
  subscriptionItem?: Maybe<SubscriptionItem>;
  updatedAt: Scalars['ISO8601DateTime'];
  urls?: Maybe<Scalars['JSON']>;
};

export type DonationAttributes = {
  amount?: Maybe<Scalars['Int']>;
  bodyData?: Maybe<Scalars['JSON']>;
  contactId?: Maybe<Scalars['ID']>;
  createdById?: Maybe<Scalars['Int']>;
  createdByType?: Maybe<Scalars['String']>;
  currency?: Maybe<Scalars['String']>;
  donationCampaignId?: Maybe<Scalars['ID']>;
  paidAt?: Maybe<Scalars['ISO8601DateTime']>;
  paymentMethod?: Maybe<Scalars['String']>;
  preferences?: Maybe<Scalars['JSON']>;
  refundedAt?: Maybe<Scalars['ISO8601DateTime']>;
  status?: Maybe<Scalars['Int']>;
  subscriptionId?: Maybe<Scalars['Int']>;
};

export type DonationCampaign = ActiveRecordTimestamp & Node & WithAddresses & WithCover & WithDataViews & WithEnhancements & WithOrganization & WithPaths & WithPost & WithPreferences & WithProducts & WithPublishable & WithWysiwyg & {
  abstract?: Maybe<Scalars['String']>;
  addresses: Array<Address>;
  adminPath?: Maybe<Scalars['String']>;
  adminUrl?: Maybe<Scalars['String']>;
  appPath?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['JSON']>;
  category?: Maybe<Scalars['String']>;
  communityPath?: Maybe<Scalars['String']>;
  communityUrl?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  dataViews: Array<Maybe<DataView>>;
  daysToExpiration?: Maybe<Scalars['Int']>;
  donations: Array<Maybe<Donation>>;
  donationsAmount: Scalars['Int'];
  donationsCount?: Maybe<Scalars['Int']>;
  draft?: Maybe<Scalars['Boolean']>;
  durationInDays?: Maybe<Scalars['Int']>;
  enhancements?: Maybe<Scalars['JSON']>;
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
  goal?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  paths?: Maybe<Scalars['JSON']>;
  post?: Maybe<Post>;
  preferences?: Maybe<Scalars['JSON']>;
  products?: Maybe<Array<Product>>;
  publicPath?: Maybe<Scalars['String']>;
  publicUrl?: Maybe<Scalars['String']>;
  publishableStatus: Scalars['String'];
  published?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  receiptData?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<DonationCampaign>>;
  scheduled?: Maybe<Scalars['Boolean']>;
  undestinated?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['ISO8601DateTime'];
  urls?: Maybe<Scalars['JSON']>;
  viewsCount?: Maybe<Scalars['Int']>;
};


export type DonationCampaignAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type DonationCampaignCoverArgs = {
  variant?: Maybe<Scalars['String']>;
};

export type DonationCampaignAttributes = {
  abstract?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['JSON']>;
  category?: Maybe<Scalars['String']>;
  contactId?: Maybe<Scalars['Int']>;
  cover?: Maybe<Scalars['JSON']>;
  donationCampaignTagList?: Maybe<Array<Scalars['String']>>;
  donationsAmount?: Maybe<Scalars['Int']>;
  donationsCount?: Maybe<Scalars['Int']>;
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
  goal?: Maybe<Scalars['Int']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['Int']>;
  preferences?: Maybe<Scalars['JSON']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  receiptData?: Maybe<Scalars['JSON']>;
  undestinated?: Maybe<Scalars['Boolean']>;
  viewsCount?: Maybe<Scalars['Int']>;
};

export type Event = ActiveRecordTimestamp & Node & WithAddresses & WithCover & WithOrganization & WithPost & WithPreferences & {
  addresses: Array<Address>;
  attendances?: Maybe<Array<Attendance>>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  instances: Array<EventInstance>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  path?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  preferences?: Maybe<Scalars['JSON']>;
  related?: Maybe<Array<Event>>;
  tickets?: Maybe<Array<Sku>>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type EventAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type EventCoverArgs = {
  variant?: Maybe<Scalars['String']>;
};

/** Attributes for creating or updating an event */
export type EventAttributes = {
  cover?: Maybe<Scalars['String']>;
  eventTagList?: Maybe<Array<Scalars['String']>>;
  instance: EventInstanceAttributes;
  name: Scalars['String'];
};

export type EventInstance = ActiveRecordTimestamp & Node & {
  beginTime?: Maybe<Scalars['String']>;
  beginsAt?: Maybe<Scalars['ISO8601Date']>;
  createdAt: Scalars['ISO8601DateTime'];
  endTime?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601Date']>;
  /** ID of the object. */
  id: Scalars['ID'];
  updatedAt: Scalars['ISO8601DateTime'];
};

export type EventInstanceAttributes = {
  beginTime?: Maybe<Scalars['String']>;
  beginsAt?: Maybe<Scalars['ISO8601DateTime']>;
  endTime?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
};

export type Experience = ActiveRecordTimestamp & Node & WithAddresses & WithOrganization & {
  addresses: Array<Address>;
  beginsAt?: Maybe<Scalars['ISO8601Date']>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601Date']>;
  id: Scalars['ID'];
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type ExperienceAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};

export type ExperienceAttributes = {
  beginsAt?: Maybe<Scalars['ISO8601Date']>;
  description?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601Date']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organizationName?: Maybe<Scalars['String']>;
};

/** Objects which may be commented on */
export type Exploreable = DonationCampaign | Event | Opportunity | Organization | Story | User;

export type Field = ActiveRecordTimestamp & Node & WithOrganization & WithPreferences & {
  colId?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  dataField?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  fieldable?: Maybe<OrganizationApp>;
  headerName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  model?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  preferences?: Maybe<Scalars['JSON']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Attributes for creating or updating a custom field */
export type FieldAttributes = {
  colId?: Maybe<Scalars['String']>;
  dataField?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  field?: Maybe<Scalars['String']>;
  fieldableType?: Maybe<Scalars['String']>;
  headerName?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  preferences?: Maybe<Scalars['JSON']>;
};

export type FilterModel = {
  filter: Scalars['String'];
  filterTo: Scalars['String'];
  type: Scalars['String'];
};

export type FilterModelAttribute = {
  filter?: Maybe<Scalars['String']>;
  filterTo?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type Folder = ActiveRecordTimestamp & Node & {
  context?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Grant = ActiveRecordTimestamp & Node & WithAddresses & WithOrganization & WithTags & {
  abstract?: Maybe<Scalars['String']>;
  addresses: Array<Address>;
  budget?: Maybe<Scalars['BigInt']>;
  competences?: Maybe<Array<GrantCompetence>>;
  contributionMax?: Maybe<Scalars['BigInt']>;
  contributionMin?: Maybe<Scalars['BigInt']>;
  coverage?: Maybe<Scalars['Int']>;
  createdAt: Scalars['ISO8601DateTime'];
  expiresAt?: Maybe<Scalars['ISO8601DateTime']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  tags: Array<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type GrantAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type GrantTagsArgs = {
  scope?: Maybe<Scalars['String']>;
};

export type GrantCompetence = ActiveRecordTimestamp & Node & {
  code?: Maybe<Scalars['String']>;
  competence?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  label?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type GraphqlSubscription = Node & {
  /** ID of the object. */
  id: Scalars['ID'];
  messageCreated: MessageCreatedPayload;
};

/** Objects can be applied to */
export type Group = Contact | DonationCampaign;

export type Grouper = {
  colId: Scalars['String'];
};

export type GrouperAttribute = {
  colId?: Maybe<Scalars['String']>;
};



export type Import = ActiveRecordTimestamp & Node & WithOrganization & {
  beginsAt?: Maybe<Scalars['ISO8601DateTime']>;
  createdAt: Scalars['ISO8601DateTime'];
  file?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
  hasHeader?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  instructions?: Maybe<Scalars['JSON']>;
  integration?: Maybe<Scalars['String']>;
  matches?: Maybe<Array<ImportMatch>>;
  model?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  queuedAt?: Maybe<Scalars['ISO8601DateTime']>;
  readyAt?: Maybe<Scalars['ISO8601DateTime']>;
  results?: Maybe<Scalars['JSON']>;
  strategy?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Attributes for creating or updating an import */
export type ImportAttributes = {
  beginsAt?: Maybe<Scalars['ISO8601DateTime']>;
  file?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
  hasHeader?: Maybe<Scalars['Boolean']>;
  importableId?: Maybe<Scalars['Int']>;
  importableType?: Maybe<Scalars['String']>;
  instructions?: Maybe<Scalars['String']>;
  integration?: Maybe<Scalars['String']>;
  model?: Maybe<Scalars['String']>;
  queuedAt?: Maybe<Scalars['ISO8601DateTime']>;
  readyAt?: Maybe<Scalars['ISO8601DateTime']>;
  results?: Maybe<Scalars['String']>;
  strategy?: Maybe<Scalars['String']>;
};

export type ImportMatch = ActiveRecordTimestamp & Node & {
  createdAt: Scalars['ISO8601DateTime'];
  field?: Maybe<Field>;
  fieldName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  index?: Maybe<Scalars['Int']>;
  skipped?: Maybe<Scalars['Boolean']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Attributes for creating or updating an import match */
export type ImportMatchAttributes = {
  fieldId?: Maybe<Scalars['Int']>;
  fieldName?: Maybe<Scalars['String']>;
  index: Scalars['Int'];
};


export type Job = ActiveRecordTimestamp & Node & WithAddresses & WithOrganization & WithPost & {
  addresses: Array<Address>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  path: Scalars['String'];
  post?: Maybe<Post>;
  related?: Maybe<Array<Job>>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type JobAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};

export type Member = ActiveRecordTimestamp & Node & {
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  member: MemberMember;
  role: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Objects which may be commented on */
export type MemberMember = Contact | Organization | User;

export type Message = ActiveRecordTimestamp & Node & {
  attachments?: Maybe<Array<Attachment>>;
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  itemable?: Maybe<MessageItemable>;
  kind: Scalars['String'];
  messageable?: Maybe<Messageable>;
  messager: Messager;
  replyTo?: Maybe<Message>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type MessageAttributes = {
  body?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
};

/** The connection type for Message. */
export type MessageConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<MessageEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Message>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** Autogenerated return type of MessageCreated */
export type MessageCreatedPayload = Node & {
  /** ID of the object. */
  id: Scalars['ID'];
};

/** An edge in a connection. */
export type MessageEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Message>;
};

/** Objects which may be commented on */
export type MessageItemable = Audit | Contact | Donation | Task;

/** Message rooms */
export type Messageable = Contact | Conversation | Team;

/** Message rooms */
export type Messager = Contact | Contact | User;

export type Mutation = Node & {
  createApp?: Maybe<CreateAppPayload>;
  createApplication?: Maybe<CreateApplicationPayload>;
  createAttendance?: Maybe<CreateAttendancePayload>;
  createAudience?: Maybe<CreateAudiencePayload>;
  createBoard?: Maybe<CreateBoardPayload>;
  createCall?: Maybe<CreateCallPayload>;
  createCampaign?: Maybe<CreateCampaignPayload>;
  createComment?: Maybe<CreateCommentPayload>;
  createContact?: Maybe<CreateContactPayload>;
  createConversation?: Maybe<CreateConversationPayload>;
  createDashlet?: Maybe<CreateDashletPayload>;
  createDataView?: Maybe<CreateDataViewPayload>;
  createDonation?: Maybe<CreateDonationPayload>;
  createDonationCampaign?: Maybe<CreateDonationCampaignPayload>;
  createEvent?: Maybe<CreateEventPayload>;
  createExperience?: Maybe<CreateExperiencePayload>;
  createField?: Maybe<CreateFieldPayload>;
  createImport?: Maybe<CreateImportPayload>;
  createImportMatch?: Maybe<CreateImportMatchPayload>;
  createMessage?: Maybe<CreateMessagePayload>;
  createOrder?: Maybe<CreateOrderPayload>;
  createOrderItem?: Maybe<CreateOrderItemPayload>;
  createPaymentIntent?: Maybe<CreatePaymentIntentPayload>;
  createPlan?: Maybe<CreatePlanPayload>;
  createProduct?: Maybe<CreateProductPayload>;
  createProject?: Maybe<CreateProjectPayload>;
  createProposal?: Maybe<CreateProposalPayload>;
  createSku?: Maybe<CreateSkuPayload>;
  createStory?: Maybe<CreateStoryPayload>;
  createSubscription?: Maybe<CreateSubscriptionPayload>;
  createTask?: Maybe<CreateTaskPayload>;
  createTeam?: Maybe<CreateTeamPayload>;
  createVote?: Maybe<CreateVotePayload>;
  deleteApp?: Maybe<DeleteAppPayload>;
  deleteApplication?: Maybe<DeleteApplicationPayload>;
  deleteAttendance?: Maybe<DeleteAttendancePayload>;
  deleteAudience?: Maybe<DeleteAudiencePayload>;
  deleteCall?: Maybe<DeleteCallPayload>;
  deleteCampaign?: Maybe<DeleteCampaignPayload>;
  deleteComment?: Maybe<DeleteCommentPayload>;
  deleteContact?: Maybe<DeleteContactPayload>;
  deleteDashlet?: Maybe<DeleteDashletPayload>;
  deleteDonation?: Maybe<DeleteDonationPayload>;
  deleteDonationCampaign?: Maybe<DeleteDonationCampaignPayload>;
  deleteExperience?: Maybe<DeleteExperiencePayload>;
  deleteField?: Maybe<DeleteFieldPayload>;
  deleteOrder?: Maybe<DeleteOrderPayload>;
  deleteOrderItem?: Maybe<DeleteOrderItemPayload>;
  deletePlan?: Maybe<DeletePlanPayload>;
  deleteProduct?: Maybe<DeleteProductPayload>;
  deleteSku?: Maybe<DeleteSkuPayload>;
  deleteSubscription?: Maybe<DeleteSubscriptionPayload>;
  deleteTask?: Maybe<DeleteTaskPayload>;
  destroyDataView?: Maybe<DestroyDataViewPayload>;
  destroyImportMatch?: Maybe<DestroyImportMatchPayload>;
  /** ID of the object. */
  id: Scalars['ID'];
  publishablePublish?: Maybe<PublishablePublishPayload>;
  subscribeToPlan?: Maybe<SubscribeToPlanPayload>;
  updateApp?: Maybe<UpdateAppPayload>;
  updateApplication?: Maybe<UpdateApplicationPayload>;
  updateAttendance?: Maybe<UpdateAttendancePayload>;
  updateAudience?: Maybe<UpdateAudiencePayload>;
  updateCall?: Maybe<UpdateCallPayload>;
  updateCampaign?: Maybe<UpdateCampaignPayload>;
  updateComment?: Maybe<UpdateCommentPayload>;
  updateContact?: Maybe<UpdateContactPayload>;
  updateDashlet?: Maybe<UpdateDashletPayload>;
  updateDataView?: Maybe<UpdateDataViewPayload>;
  updateDonation?: Maybe<UpdateDonationPayload>;
  updateDonationCampaign?: Maybe<UpdateDonationCampaignPayload>;
  updateEvent?: Maybe<UpdateEventPayload>;
  updateExperience?: Maybe<UpdateExperiencePayload>;
  updateField?: Maybe<UpdateFieldPayload>;
  updateImport?: Maybe<UpdateImportPayload>;
  updateImportMatch?: Maybe<UpdateImportMatchPayload>;
  updateOrder?: Maybe<UpdateOrderPayload>;
  updateOrderItem?: Maybe<UpdateOrderItemPayload>;
  updatePlan?: Maybe<UpdatePlanPayload>;
  updateProduct?: Maybe<UpdateProductPayload>;
  updateSku?: Maybe<UpdateSkuPayload>;
  updateStory?: Maybe<UpdateStoryPayload>;
  updateSubscription?: Maybe<UpdateSubscriptionPayload>;
  updateTask?: Maybe<UpdateTaskPayload>;
  updateUser?: Maybe<UpdateUserPayload>;
};


export type MutationCreateAppArgs = {
  input: CreateAppInput;
};


export type MutationCreateApplicationArgs = {
  input: CreateApplicationInput;
};


export type MutationCreateAttendanceArgs = {
  input: CreateAttendanceInput;
};


export type MutationCreateAudienceArgs = {
  input: CreateAudienceInput;
};


export type MutationCreateBoardArgs = {
  input: CreateBoardInput;
};


export type MutationCreateCallArgs = {
  input: CreateCallInput;
};


export type MutationCreateCampaignArgs = {
  input: CreateCampaignInput;
};


export type MutationCreateCommentArgs = {
  input: CreateCommentInput;
};


export type MutationCreateContactArgs = {
  input: CreateContactInput;
};


export type MutationCreateConversationArgs = {
  input: CreateConversationInput;
};


export type MutationCreateDashletArgs = {
  input: CreateDashletInput;
};


export type MutationCreateDataViewArgs = {
  input: CreateDataViewInput;
};


export type MutationCreateDonationArgs = {
  input: CreateDonationInput;
};


export type MutationCreateDonationCampaignArgs = {
  input: CreateDonationCampaignInput;
};


export type MutationCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationCreateExperienceArgs = {
  input: CreateExperienceInput;
};


export type MutationCreateFieldArgs = {
  input: CreateFieldInput;
};


export type MutationCreateImportArgs = {
  input: CreateImportInput;
};


export type MutationCreateImportMatchArgs = {
  input: CreateImportMatchInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateOrderItemArgs = {
  input: CreateOrderItemInput;
};


export type MutationCreatePaymentIntentArgs = {
  input: CreatePaymentIntentInput;
};


export type MutationCreatePlanArgs = {
  input: CreatePlanInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};


export type MutationCreateProposalArgs = {
  input: CreateProposalInput;
};


export type MutationCreateSkuArgs = {
  input: CreateSkuInput;
};


export type MutationCreateStoryArgs = {
  input: CreateStoryInput;
};


export type MutationCreateSubscriptionArgs = {
  input: CreateSubscriptionInput;
};


export type MutationCreateTaskArgs = {
  input: CreateTaskInput;
};


export type MutationCreateTeamArgs = {
  input: CreateTeamInput;
};


export type MutationCreateVoteArgs = {
  input: CreateVoteInput;
};


export type MutationDeleteAppArgs = {
  input: DeleteAppInput;
};


export type MutationDeleteApplicationArgs = {
  input: DeleteApplicationInput;
};


export type MutationDeleteAttendanceArgs = {
  input: DeleteAttendanceInput;
};


export type MutationDeleteAudienceArgs = {
  input: DeleteAudienceInput;
};


export type MutationDeleteCallArgs = {
  input: DeleteCallInput;
};


export type MutationDeleteCampaignArgs = {
  input: DeleteCampaignInput;
};


export type MutationDeleteCommentArgs = {
  input: DeleteCommentInput;
};


export type MutationDeleteContactArgs = {
  input: DeleteContactInput;
};


export type MutationDeleteDashletArgs = {
  input: DeleteDashletInput;
};


export type MutationDeleteDonationArgs = {
  input: DeleteDonationInput;
};


export type MutationDeleteDonationCampaignArgs = {
  input: DeleteDonationCampaignInput;
};


export type MutationDeleteExperienceArgs = {
  input: DeleteExperienceInput;
};


export type MutationDeleteFieldArgs = {
  input: DeleteFieldInput;
};


export type MutationDeleteOrderArgs = {
  input: DeleteOrderInput;
};


export type MutationDeleteOrderItemArgs = {
  input: DeleteOrderItemInput;
};


export type MutationDeletePlanArgs = {
  input: DeletePlanInput;
};


export type MutationDeleteProductArgs = {
  input: DeleteProductInput;
};


export type MutationDeleteSkuArgs = {
  input: DeleteSkuInput;
};


export type MutationDeleteSubscriptionArgs = {
  input: DeleteSubscriptionInput;
};


export type MutationDeleteTaskArgs = {
  input: DeleteTaskInput;
};


export type MutationDestroyDataViewArgs = {
  input: DestroyDataViewInput;
};


export type MutationDestroyImportMatchArgs = {
  input: DestroyImportMatchInput;
};


export type MutationPublishablePublishArgs = {
  input: PublishablePublishInput;
};


export type MutationSubscribeToPlanArgs = {
  input: SubscribeToPlanInput;
};


export type MutationUpdateAppArgs = {
  input: UpdateAppInput;
};


export type MutationUpdateApplicationArgs = {
  input: UpdateApplicationInput;
};


export type MutationUpdateAttendanceArgs = {
  input: UpdateAttendanceInput;
};


export type MutationUpdateAudienceArgs = {
  input: UpdateAudienceInput;
};


export type MutationUpdateCallArgs = {
  input: UpdateCallInput;
};


export type MutationUpdateCampaignArgs = {
  input: UpdateCampaignInput;
};


export type MutationUpdateCommentArgs = {
  input: UpdateCommentInput;
};


export type MutationUpdateContactArgs = {
  input: UpdateContactInput;
};


export type MutationUpdateDashletArgs = {
  input: UpdateDashletInput;
};


export type MutationUpdateDataViewArgs = {
  input: UpdateDataViewInput;
};


export type MutationUpdateDonationArgs = {
  input: UpdateDonationInput;
};


export type MutationUpdateDonationCampaignArgs = {
  input: UpdateDonationCampaignInput;
};


export type MutationUpdateEventArgs = {
  input: UpdateEventInput;
};


export type MutationUpdateExperienceArgs = {
  input: UpdateExperienceInput;
};


export type MutationUpdateFieldArgs = {
  input: UpdateFieldInput;
};


export type MutationUpdateImportArgs = {
  input: UpdateImportInput;
};


export type MutationUpdateImportMatchArgs = {
  input: UpdateImportMatchInput;
};


export type MutationUpdateOrderArgs = {
  input: UpdateOrderInput;
};


export type MutationUpdateOrderItemArgs = {
  input: UpdateOrderItemInput;
};


export type MutationUpdatePlanArgs = {
  input: UpdatePlanInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};


export type MutationUpdateSkuArgs = {
  input: UpdateSkuInput;
};


export type MutationUpdateStoryArgs = {
  input: UpdateStoryInput;
};


export type MutationUpdateSubscriptionArgs = {
  input: UpdateSubscriptionInput;
};


export type MutationUpdateTaskArgs = {
  input: UpdateTaskInput;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

/** An object with an ID. */
export type Node = {
  /** ID of the object. */
  id: Scalars['ID'];
};

/** Objects can be applied to */
export type Notifiable = Contact | Donation;

export type Notification = ActiveRecordTimestamp & Node & {
  createdAt: Scalars['ISO8601DateTime'];
  group?: Maybe<Group>;
  groupMemberExists?: Maybe<Scalars['Boolean']>;
  groupMemberNotifierCount?: Maybe<Scalars['Int']>;
  groupMemberNotifierExists?: Maybe<Scalars['Boolean']>;
  groupNotificationCount?: Maybe<Scalars['Int']>;
  groupOwnerId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  key: Scalars['String'];
  notifiable: Notifiable;
  notifier?: Maybe<Notifier>;
  openedAt?: Maybe<Scalars['ISO8601DateTime']>;
  parameters?: Maybe<Scalars['String']>;
  printableNotifiableName?: Maybe<Scalars['String']>;
  printableNotifierName?: Maybe<Scalars['String']>;
  target: Target;
  text: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** The connection type for Notification. */
export type NotificationConnection = {
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<NotificationEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Notification>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type NotificationEdge = {
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node?: Maybe<Notification>;
};

/** Objects can be applied to */
export type Notifier = Contact;

export type Opportunity = ActiveRecordTimestamp & Node & WithAddresses & WithOrganization & WithPost & WithWysiwyg & {
  addresses: Array<Address>;
  body?: Maybe<Scalars['JSON']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  organization?: Maybe<Organization>;
  path: Scalars['String'];
  post?: Maybe<Post>;
  related?: Maybe<Array<Opportunity>>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type OpportunityAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};

export type Order = ActiveRecordTimestamp & Node & {
  /** Who ordered */
  contact: Contact;
  createdAt: Scalars['ISO8601DateTime'];
  currency?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  items?: Maybe<Array<OrderItem>>;
  itemsCount?: Maybe<Scalars['Int']>;
  itemsTotal?: Maybe<Scalars['Int']>;
  kind?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type OrderAttributes = {
  contactId?: Maybe<Scalars['ID']>;
  currency?: Maybe<Scalars['String']>;
  itemsAttributes: Array<OrderItemAttributes>;
  kind?: Maybe<Scalars['String']>;
};

export type OrderItem = ActiveRecordTimestamp & Node & {
  amount?: Maybe<Scalars['Int']>;
  createdAt: Scalars['ISO8601DateTime'];
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discountId?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  kind?: Maybe<Scalars['Int']>;
  /** Who ordered */
  order: Order;
  quantity?: Maybe<Scalars['Int']>;
  /** Who ordered */
  sku: Sku;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type OrderItemAttributes = {
  amount?: Maybe<Scalars['Int']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  discountId?: Maybe<Scalars['Int']>;
  kind?: Maybe<Scalars['Int']>;
  orderId?: Maybe<Scalars['ID']>;
  quantity?: Maybe<Scalars['Int']>;
  skuId?: Maybe<Scalars['ID']>;
};

export type Organization = ActiveRecordTimestamp & Node & WithAddresses & WithAvatar & WithPost & {
  addresses: Array<Address>;
  audiences?: Maybe<AudienceConnection>;
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  path: Scalars['String'];
  post?: Maybe<Post>;
  products?: Maybe<Array<Product>>;
  related?: Maybe<Array<Organization>>;
  search?: Maybe<SearchResult>;
  services?: Maybe<Array<Service>>;
  subDomain?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type OrganizationAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type OrganizationAudiencesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};


export type OrganizationAvatarArgs = {
  variant?: Maybe<Scalars['String']>;
};


export type OrganizationProductsArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type OrganizationSearchArgs = {
  models?: Maybe<Array<Scalars['String']>>;
  params?: Maybe<Scalars['JSON']>;
  query?: Maybe<Scalars['String']>;
};

export type OrganizationApp = ActiveRecordTimestamp & Node & WithDataViews & WithOrganization & WithPreferences & {
  app: App;
  createdAt: Scalars['ISO8601DateTime'];
  dataViews: Array<Maybe<DataView>>;
  id: Scalars['ID'];
  organization?: Maybe<Organization>;
  preferences?: Maybe<Scalars['JSON']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Information about pagination in a connection. */
export type PageInfo = {
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Plan = ActiveRecordTimestamp & Node & {
  amount: Scalars['Int'];
  createdAt: Scalars['ISO8601DateTime'];
  createdBy?: Maybe<Contact>;
  currency: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  interval: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  product: Product;
  stripeApplicationFeePercent?: Maybe<Scalars['Int']>;
  stripeId?: Maybe<Scalars['String']>;
  subscriptionsCount?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type PlanAttributes = {
  amount?: Maybe<Scalars['Int']>;
  createdBy?: Maybe<Scalars['ID']>;
  currency?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  interval?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  productId?: Maybe<Scalars['ID']>;
  stripeApplicationFeePercent?: Maybe<Scalars['Int']>;
  stripeId?: Maybe<Scalars['String']>;
  subscriptionsCount?: Maybe<Scalars['Int']>;
};

export type Post = ActiveRecordTimestamp & Node & WithComments & WithTags & {
  cachedVotesDown?: Maybe<Scalars['Int']>;
  cachedVotesScore?: Maybe<Scalars['Int']>;
  cachedVotesTotal?: Maybe<Scalars['Int']>;
  cachedVotesUp?: Maybe<Scalars['Int']>;
  cachedWeightedScore?: Maybe<Scalars['Int']>;
  cachedWeightedTotal?: Maybe<Scalars['Int']>;
  comments: Array<Maybe<Comment>>;
  commentsCount?: Maybe<Scalars['Int']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  tags: Array<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type PostTagsArgs = {
  scope?: Maybe<Scalars['String']>;
};

export type Product = ActiveRecordTimestamp & Node & WithFolder & WithOrganization & WithPreferences & {
  createdAt: Scalars['ISO8601DateTime'];
  createdBy?: Maybe<Contact>;
  description?: Maybe<Scalars['String']>;
  folder?: Maybe<Folder>;
  id: Scalars['ID'];
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orderItems?: Maybe<Array<OrderItem>>;
  orders?: Maybe<Array<Order>>;
  organization?: Maybe<Organization>;
  plans?: Maybe<Array<Plan>>;
  preferences?: Maybe<Scalars['JSON']>;
  productableId?: Maybe<Scalars['Int']>;
  productableType?: Maybe<Scalars['String']>;
  skus?: Maybe<Array<Sku>>;
  stripeAttributes?: Maybe<Array<Scalars['String']>>;
  stripeId?: Maybe<Scalars['String']>;
  stripeKind?: Maybe<Scalars['String']>;
  stripePackageDimensions?: Maybe<Scalars['JSON']>;
  stripeStatementDescriptor?: Maybe<Scalars['String']>;
  subscriptions?: Maybe<Array<Subscription>>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type ProductAttributes = {
  createdById?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  folderId?: Maybe<Scalars['ID']>;
  kind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['ID']>;
  preferences?: Maybe<Scalars['JSON']>;
  productableId?: Maybe<Scalars['Int']>;
  productableType?: Maybe<Scalars['String']>;
  stripeAttributes?: Maybe<Array<Scalars['String']>>;
  stripeId?: Maybe<Scalars['String']>;
  stripeKind?: Maybe<Scalars['String']>;
  stripePackageDimensions?: Maybe<Scalars['JSON']>;
  stripeStatementDescriptor?: Maybe<Scalars['String']>;
};

export type Project = ActiveRecordTimestamp & Node & WithAddresses & WithOrganization & {
  addresses: Array<Address>;
  contact?: Maybe<Array<Contact>>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  estimatedCost?: Maybe<Scalars['Int']>;
  goal?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type ProjectAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};

/** Objects which may be published / unpublished */
export type Publishable = App | DonationCampaign | Event;

/** Autogenerated input type of PublishablePublish */
export type PublishablePublishInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  publishableId: Scalars['ID'];
};

/** Autogenerated return type of PublishablePublish */
export type PublishablePublishPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  publishable?: Maybe<Publishable>;
};

export type Query = {
  /** Get all apps */
  apps: Array<App>;
  /** Find a board by ID */
  board: Board;
  /** Get all organizations boards */
  boards: Array<Board>;
  /** Find a call by ID */
  call: Call;
  /** Get all organizations calls */
  calls: Array<Call>;
  /** Find a campaign by ID */
  campaign: Campaign;
  /** Get all organizations campaigns */
  campaigns: Array<Campaign>;
  /** Find a contact by ID */
  contact: Contact;
  /** Get all organizations contacts */
  contacts: Array<Contact>;
  /** Current organization */
  currentOrganization?: Maybe<Organization>;
  /** Current user */
  currentUser?: Maybe<User>;
  /** Get current Data View */
  dataView: DataView;
  /** Get current object Data Views */
  dataViews: Array<DataView>;
  /** Find a donation by ID */
  donation: Donation;
  /** Find a donation campaign by ID */
  donationCampaign?: Maybe<DonationCampaign>;
  /** Get all organizations donations campaigns */
  donationCampaigns: Array<DonationCampaign>;
  /** Get all organizations donations */
  donations: Array<Donation>;
  /** Find an event by ID */
  event: Event;
  /** Get all events */
  events: Array<Event>;
  /** Explorer query respond to each kind of model exploration tabs */
  explorer: Array<Exploreable>;
  /** Get all fields */
  fields: Array<Field>;
  /** Find a grant by ID */
  grant: Grant;
  /** Get all grants */
  grants: Array<Grant>;
  /** Find an import by ID */
  import: Import;
  /** Get all messages related to a messageable */
  messages: Array<Message>;
  /** Get all messages related to some kinds */
  messagesByKinds: Array<Message>;
  /** Fetches an object given its ID. */
  node?: Maybe<Node>;
  /** Fetches a list of objects given a list of IDs. */
  nodes: Array<Maybe<Node>>;
  /** Get all organizations */
  opportunities: Array<Opportunity>;
  /** Find an opportunity by ID */
  opportunity: Opportunity;
  /** Get all orders */
  orders: Array<Order>;
  /** Find an organization by id */
  organization: Organization;
  /** Find an organization app by ID */
  organizationApp: OrganizationApp;
  /** Get all organizations apps */
  organizationApps: Array<OrganizationApp>;
  /** Get all organizations */
  organizations: Array<Organization>;
  /** Find a plan by ID */
  plan: Plan;
  /** Get all organizations plans */
  plans: Array<Plan>;
  /** Find a product by ID */
  product: Product;
  /** Find a project by id */
  project: Project;
  /** Get all organizations projects */
  projects: Array<Project>;
  /** Get all organizations questions */
  questions: Array<Question>;
  /** Explorer query respond to each kind of model exploration tabs */
  search: SearchResult;
  /** Get all organizations stories */
  stories: Array<Story>;
  /** Find a story by id */
  story: Story;
  /** Get all organizations subscriptions */
  subscriptions: Array<Subscription>;
  /** Get all tags */
  tags: Array<Tag>;
  /** Find a task by ID */
  task: Task;
  /** Get all tasks for user(s) in this organization */
  tasks: Array<Task>;
  /** Find a team by slug */
  team: Team;
  /** Get all organization's teams */
  teams: Array<Team>;
  /** Find an user by id */
  user: User;
  /** Get all organization's visits */
  visits: Array<Visit>;
};


export type QueryAppsArgs = {
  category?: Maybe<Scalars['String']>;
  kind?: Maybe<Scalars['String']>;
  query?: Maybe<Scalars['String']>;
};


export type QueryBoardArgs = {
  id: Scalars['ID'];
};


export type QueryCallArgs = {
  id: Scalars['ID'];
};


export type QueryCampaignArgs = {
  id: Scalars['ID'];
};


export type QueryCampaignsArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type QueryContactArgs = {
  id: Scalars['ID'];
};


export type QueryDataViewArgs = {
  id: Scalars['ID'];
};


export type QueryDataViewsArgs = {
  model: Scalars['String'];
};


export type QueryDonationArgs = {
  id: Scalars['ID'];
};


export type QueryDonationCampaignArgs = {
  id: Scalars['ID'];
};


export type QueryEventArgs = {
  id: Scalars['ID'];
};


export type QueryExplorerArgs = {
  kind: Scalars['String'];
  model?: Maybe<Scalars['String']>;
};


export type QueryFieldsArgs = {
  fieldableId: Scalars['ID'];
  model: Scalars['String'];
};


export type QueryGrantArgs = {
  id: Scalars['ID'];
};


export type QueryImportArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesArgs = {
  messageable: Scalars['ID'];
};


export type QueryMessagesByKindsArgs = {
  kinds: Array<Scalars['String']>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
};


export type QueryNodesArgs = {
  ids: Array<Scalars['ID']>;
};


export type QueryOpportunitiesArgs = {
  kind: Scalars['String'];
};


export type QueryOpportunityArgs = {
  id: Scalars['ID'];
};


export type QueryOrganizationArgs = {
  id: Scalars['ID'];
};


export type QueryOrganizationAppArgs = {
  id: Scalars['ID'];
};


export type QueryOrganizationsArgs = {
  kind: Scalars['String'];
};


export type QueryPlanArgs = {
  id: Scalars['ID'];
};


export type QueryProductArgs = {
  id: Scalars['ID'];
};


export type QueryProjectArgs = {
  id: Scalars['ID'];
};


export type QuerySearchArgs = {
  model?: Maybe<Scalars['String']>;
  params?: Maybe<Scalars['JSON']>;
  query?: Maybe<Scalars['String']>;
};


export type QueryStoryArgs = {
  id: Scalars['ID'];
};


export type QueryTagsArgs = {
  context: Scalars['String'];
  term?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Scalars['String']>>;
};


export type QueryTaskArgs = {
  id: Scalars['ID'];
};


export type QueryTeamArgs = {
  slug: Scalars['String'];
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};

export type Question = Node & {
  hint?: Maybe<Scalars['String']>;
  /** ID of the object. */
  id: Scalars['ID'];
  kind?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  placeholder?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
};

export type SearchResult = {
  aggs?: Maybe<Scalars['JSON']>;
  pagesCount?: Maybe<Scalars['Int']>;
  responseTime?: Maybe<Scalars['Int']>;
  results?: Maybe<Array<Exploreable>>;
  resultsCount?: Maybe<Scalars['Int']>;
};

/** Objects which may be commented on */
export type Sender = Organization | User;

export type Service = ActiveRecordTimestamp & Node & WithOrganization & {
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type Sku = ActiveRecordTimestamp & Node & {
  active?: Maybe<Scalars['Boolean']>;
  beginsAt?: Maybe<Scalars['ISO8601DateTime']>;
  createdAt: Scalars['ISO8601DateTime'];
  createdBy?: Maybe<Contact>;
  currency?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
  id: Scalars['ID'];
  inventoryAvailability?: Maybe<Scalars['String']>;
  inventoryKind?: Maybe<Scalars['String']>;
  inventoryQuantity?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  product: Product;
  stripeAttributes?: Maybe<Scalars['JSON']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type SkuAttributes = {
  active?: Maybe<Scalars['Boolean']>;
  beginsAt?: Maybe<Scalars['ISO8601DateTime']>;
  createdById?: Maybe<Scalars['ID']>;
  currency?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
  inventoryAvailability?: Maybe<Scalars['String']>;
  inventoryKind?: Maybe<Scalars['String']>;
  inventoryQuantity?: Maybe<Scalars['Int']>;
  price?: Maybe<Scalars['Int']>;
  productId?: Maybe<Scalars['ID']>;
  stripeAttributes?: Maybe<Scalars['JSON']>;
};

export type Sorter = {
  colId: Scalars['String'];
  sort: Scalars['String'];
};

export type SorterAttribute = {
  colId?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['String']>;
};

export type Story = ActiveRecordTimestamp & Node & WithCover & WithOrganization & WithPost & WithPreferences & {
  abstract?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  cover?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  organization?: Maybe<Organization>;
  owner: StoryOwner;
  path?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  preferences?: Maybe<Scalars['JSON']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  readingTime?: Maybe<Scalars['Int']>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type StoryCoverArgs = {
  variant?: Maybe<Scalars['String']>;
};

/** Objects which may be commented on */
export type StoryOwner = Organization | User;

/** Autogenerated input type of SubscribeToPlan */
export type SubscribeToPlanInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  paymentMethodId: Scalars['String'];
  subscriptionItemId: Scalars['ID'];
};

/** Autogenerated return type of SubscribeToPlan */
export type SubscribeToPlanPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  stripeSubscription?: Maybe<Scalars['JSON']>;
};

/** Objects which may be commented on */
export type Subscriber = Contact | Organization;

export type Subscription = ActiveRecordTimestamp & Node & {
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  items?: Maybe<Array<SubscriptionItem>>;
  stripeBillingCycleAnchor?: Maybe<Scalars['ISO8601DateTime']>;
  stripeCancelAtPeriodEnd?: Maybe<Scalars['Boolean']>;
  stripeCanceledAt?: Maybe<Scalars['ISO8601DateTime']>;
  stripeCurrentPeriodEnd?: Maybe<Scalars['ISO8601DateTime']>;
  stripeCurrentPeriodStart?: Maybe<Scalars['ISO8601DateTime']>;
  stripeEndedAt?: Maybe<Scalars['ISO8601DateTime']>;
  stripeId?: Maybe<Scalars['String']>;
  stripeStatus?: Maybe<Scalars['String']>;
  stripeTaxPercent?: Maybe<Scalars['Int']>;
  stripeTrialEnd?: Maybe<Scalars['ISO8601DateTime']>;
  stripeTrialStart?: Maybe<Scalars['ISO8601DateTime']>;
  subscriber?: Maybe<Subscriber>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type SubscriptionAttributes = {
  itemsAttributes: Array<SubscriptionItemAttributes>;
  stripeBillingCycleAnchor?: Maybe<Scalars['ISO8601DateTime']>;
  stripeCancelAtPeriodEnd?: Maybe<Scalars['Boolean']>;
  stripeCanceledAt?: Maybe<Scalars['ISO8601DateTime']>;
  stripeCurrentPeriodEnd?: Maybe<Scalars['ISO8601DateTime']>;
  stripeCurrentPeriodStart?: Maybe<Scalars['ISO8601DateTime']>;
  stripeEndedAt?: Maybe<Scalars['ISO8601DateTime']>;
  stripeId?: Maybe<Scalars['String']>;
  stripeStatus?: Maybe<Scalars['String']>;
  stripeTaxPercent?: Maybe<Scalars['Int']>;
  stripeTrialEnd?: Maybe<Scalars['ISO8601DateTime']>;
  stripeTrialStart?: Maybe<Scalars['ISO8601DateTime']>;
  subscriberId?: Maybe<Scalars['Int']>;
  subscriberType?: Maybe<Scalars['String']>;
};

export type SubscriptionItem = ActiveRecordTimestamp & Node & {
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  plan: Plan;
  prorate: Scalars['Boolean'];
  quantity: Scalars['Int'];
  subscription: Subscription;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type SubscriptionItemAttributes = {
  planId?: Maybe<Scalars['ID']>;
  preferences?: Maybe<Scalars['JSON']>;
  prorate?: Maybe<Scalars['Boolean']>;
  prorationDate?: Maybe<Scalars['ISO8601DateTime']>;
  quantity?: Maybe<Scalars['Int']>;
  subscriptionId?: Maybe<Scalars['ID']>;
};

export type Tag = Node & {
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  taggingsCount?: Maybe<Scalars['Int']>;
};

/** Objects can be applied to */
export type Target = Contact;

export type Task = ActiveRecordTimestamp & Node & WithMembers & {
  assignee?: Maybe<Contact>;
  beginsAt?: Maybe<Scalars['ISO8601DateTime']>;
  beginsDay?: Maybe<Scalars['String']>;
  /** Task description */
  body?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
  id: Scalars['ID'];
  /** Task kind */
  kind?: Maybe<Scalars['String']>;
  /** Task sub kind */
  logKind?: Maybe<Scalars['String']>;
  members: Array<Member>;
  /** Task name */
  name?: Maybe<Scalars['String']>;
  /** Priority */
  priority?: Maybe<Scalars['String']>;
  /** Priority */
  priorityLevel?: Maybe<Scalars['Int']>;
  tasks: Array<Maybe<Task>>;
  updatedAt: Scalars['ISO8601DateTime'];
};

export type TaskAttributes = {
  beginsAt?: Maybe<Scalars['ISO8601DateTime']>;
  beginsDay?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['String']>;
  commentsCount?: Maybe<Scalars['Int']>;
  doneAt?: Maybe<Scalars['ISO8601DateTime']>;
  doneBy?: Maybe<Scalars['Int']>;
  doneMessage?: Maybe<Scalars['String']>;
  finishesAt?: Maybe<Scalars['ISO8601DateTime']>;
  kind?: Maybe<Scalars['String']>;
  logKind?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  priority?: Maybe<Scalars['Int']>;
  taskableType?: Maybe<Scalars['String']>;
  weight?: Maybe<Scalars['Int']>;
};

export type Team = ActiveRecordTimestamp & Node & WithMembers & {
  bio?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  members: Array<Member>;
  messages?: Maybe<MessageConnection>;
  name: Scalars['String'];
  slug: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};


export type TeamMessagesArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type TeamAttributes = {
  bio?: Maybe<Scalars['String']>;
  color: Scalars['String'];
  name: Scalars['String'];
};

export type Trigger = Node & {
  action?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  namespace?: Maybe<Scalars['String']>;
  organizationId?: Maybe<Scalars['Int']>;
  preferences?: Maybe<Scalars['JSON']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Autogenerated input type of UpdateApp */
export type UpdateAppInput = {
  attributes: AppAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateApp */
export type UpdateAppPayload = {
  app?: Maybe<App>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateApplication */
export type UpdateApplicationInput = {
  attributes: ApplicationAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateApplication */
export type UpdateApplicationPayload = {
  application?: Maybe<Application>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateAttendance */
export type UpdateAttendanceInput = {
  attributes: AttendanceAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateAttendance */
export type UpdateAttendancePayload = {
  attendance?: Maybe<Attendance>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateAudience */
export type UpdateAudienceInput = {
  attributes: AudienceAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateAudience */
export type UpdateAudiencePayload = {
  audience?: Maybe<Audience>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateCall */
export type UpdateCallInput = {
  attributes: CallAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateCall */
export type UpdateCallPayload = {
  call?: Maybe<Call>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateCampaign */
export type UpdateCampaignInput = {
  attributes: CampaignAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateCampaign */
export type UpdateCampaignPayload = {
  campaign?: Maybe<Campaign>;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateComment */
export type UpdateCommentInput = {
  attributes: CommentAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateComment */
export type UpdateCommentPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  comment?: Maybe<Comment>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateContact */
export type UpdateContactInput = {
  attributes: ContactAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateContact */
export type UpdateContactPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  contact?: Maybe<Contact>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateDashlet */
export type UpdateDashletInput = {
  attributes: DashletAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateDashlet */
export type UpdateDashletPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dashlet?: Maybe<Dashlet>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateDataView */
export type UpdateDataViewInput = {
  attributes: DataViewAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateDataView */
export type UpdateDataViewPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  dataView?: Maybe<DataView>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateDonationCampaign */
export type UpdateDonationCampaignInput = {
  address?: Maybe<Scalars['String']>;
  attributes: DonationCampaignAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateDonationCampaign */
export type UpdateDonationCampaignPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  donationCampaign?: Maybe<DonationCampaign>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateDonation */
export type UpdateDonationInput = {
  attributes: DonationAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateDonation */
export type UpdateDonationPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  donation?: Maybe<Donation>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateEvent */
export type UpdateEventInput = {
  attributes: EventAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateEvent */
export type UpdateEventPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  event?: Maybe<Event>;
};

/** Autogenerated input type of UpdateExperience */
export type UpdateExperienceInput = {
  attributes: ExperienceAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateExperience */
export type UpdateExperiencePayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  experience?: Maybe<Experience>;
};

/** Autogenerated input type of UpdateField */
export type UpdateFieldInput = {
  attributes: FieldAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateField */
export type UpdateFieldPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  field?: Maybe<Field>;
};

/** Autogenerated input type of UpdateImport */
export type UpdateImportInput = {
  attributes: ImportAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated input type of UpdateImportMatch */
export type UpdateImportMatchInput = {
  attributes: ImportMatchAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  importId: Scalars['ID'];
};

/** Autogenerated return type of UpdateImportMatch */
export type UpdateImportMatchPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  importMatch?: Maybe<ImportMatch>;
};

/** Autogenerated return type of UpdateImport */
export type UpdateImportPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  importItem?: Maybe<Import>;
};

/** Autogenerated input type of UpdateOrder */
export type UpdateOrderInput = {
  attributes: OrderAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated input type of UpdateOrderItem */
export type UpdateOrderItemInput = {
  attributes: OrderItemAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateOrderItem */
export type UpdateOrderItemPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  orderItem?: Maybe<OrderItem>;
};

/** Autogenerated return type of UpdateOrder */
export type UpdateOrderPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  order?: Maybe<Order>;
};

/** Autogenerated input type of UpdatePlan */
export type UpdatePlanInput = {
  attributes: PlanAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdatePlan */
export type UpdatePlanPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  plan?: Maybe<Plan>;
};

/** Autogenerated input type of UpdateProduct */
export type UpdateProductInput = {
  attributes: ProductAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateProduct */
export type UpdateProductPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  product?: Maybe<Product>;
};

/** Autogenerated input type of UpdateSku */
export type UpdateSkuInput = {
  attributes: SkuAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateSku */
export type UpdateSkuPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  sku?: Maybe<Sku>;
};

/** Autogenerated input type of UpdateStory */
export type UpdateStoryInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateStory */
export type UpdateStoryPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

/** Autogenerated input type of UpdateSubscription */
export type UpdateSubscriptionInput = {
  attributes: SubscriptionAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateSubscription */
export type UpdateSubscriptionPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  subscription?: Maybe<Subscription>;
};

/** Autogenerated input type of UpdateTask */
export type UpdateTaskInput = {
  attributes: TaskAttributes;
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
};

/** Autogenerated return type of UpdateTask */
export type UpdateTaskPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
  task?: Maybe<Task>;
};

/** Autogenerated input type of UpdateUser */
export type UpdateUserInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** Autogenerated return type of UpdateUser */
export type UpdateUserPayload = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']>;
  errors: Array<Scalars['String']>;
};

export type User = ActiveRecordTimestamp & Node & WithAddresses & WithAvatar & WithEnhancements & {
  addresses: Array<Address>;
  admin: Scalars['Boolean'];
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  collections: Array<Maybe<Collection>>;
  conversation: Conversation;
  conversations: ConversationConnection;
  createdAt: Scalars['ISO8601DateTime'];
  enhancements?: Maybe<Scalars['JSON']>;
  experiences: Array<Maybe<Experience>>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  locale?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  organizations: Array<Maybe<Organization>>;
  path?: Maybe<Scalars['String']>;
  stories: Array<Maybe<Story>>;
  updatedAt: Scalars['ISO8601DateTime'];
};


export type UserAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};


export type UserAvatarArgs = {
  variant?: Maybe<Scalars['String']>;
};


export type UserConversationArgs = {
  id: Scalars['ID'];
};


export type UserConversationsArgs = {
  after?: Maybe<Scalars['String']>;
  before?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
};

export type Visit = ActiveRecordTimestamp & Node & {
  browser?: Maybe<Scalars['String']>;
  createdAt: Scalars['ISO8601DateTime'];
  deviceType?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ip?: Maybe<Scalars['String']>;
  landingPage?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  referrer?: Maybe<Scalars['String']>;
  referringDomain?: Maybe<Scalars['String']>;
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Object with many addresses */
export type WithAddresses = {
  addresses: Array<Address>;
};


/** Object with many addresses */
export type WithAddressesAddressesArgs = {
  kind?: Maybe<Scalars['String']>;
};

/** Object with avatar and variant */
export type WithAvatar = {
  avatar?: Maybe<Scalars['String']>;
};


/** Object with avatar and variant */
export type WithAvatarAvatarArgs = {
  variant?: Maybe<Scalars['String']>;
};

/** Object with many comments */
export type WithComments = {
  comments: Array<Maybe<Comment>>;
};

/** This object refers to a contact */
export type WithContact = {
  contact?: Maybe<Contact>;
};

/** Object with cover & variants */
export type WithCover = {
  cover?: Maybe<Scalars['String']>;
};


/** Object with cover & variants */
export type WithCoverCoverArgs = {
  variant?: Maybe<Scalars['String']>;
};

/** Object with many data_views */
export type WithDataViews = {
  dataViews: Array<Maybe<DataView>>;
};

/** Object with many additional fields */
export type WithEnhancements = {
  enhancements?: Maybe<Scalars['JSON']>;
};

/** Object contained in a folder */
export type WithFolder = {
  folder?: Maybe<Folder>;
};

/** Object with many members */
export type WithMembers = {
  members: Array<Member>;
};

/** This object refers to an organization */
export type WithOrganization = {
  organization?: Maybe<Organization>;
};

/** This object's paths */
export type WithPaths = {
  adminPath?: Maybe<Scalars['String']>;
  adminUrl?: Maybe<Scalars['String']>;
  appPath?: Maybe<Scalars['String']>;
  communityPath?: Maybe<Scalars['String']>;
  communityUrl?: Maybe<Scalars['String']>;
  paths?: Maybe<Scalars['JSON']>;
  publicPath?: Maybe<Scalars['String']>;
  publicUrl?: Maybe<Scalars['String']>;
  urls?: Maybe<Scalars['JSON']>;
};

/** Object with post */
export type WithPost = {
  post?: Maybe<Post>;
};

/** Object with preferences */
export type WithPreferences = {
  preferences?: Maybe<Scalars['JSON']>;
};

/** This object has a related product */
export type WithProducts = {
  products?: Maybe<Array<Product>>;
};

/** Object that can be published, scheduled and unpublished */
export type WithPublishable = {
  draft?: Maybe<Scalars['Boolean']>;
  publishableStatus: Scalars['String'];
  published?: Maybe<Scalars['Boolean']>;
  publishedAt?: Maybe<Scalars['ISO8601DateTime']>;
  scheduled?: Maybe<Scalars['Boolean']>;
};

/** Object with many tags */
export type WithTags = {
  tags: Array<Scalars['String']>;
};


/** Object with many tags */
export type WithTagsTagsArgs = {
  scope?: Maybe<Scalars['String']>;
};

/** Object with adf-schema powered wysiwyg */
export type WithWysiwyg = {
  body?: Maybe<Scalars['JSON']>;
};
