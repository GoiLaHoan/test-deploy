export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AudioArchiveSnippetInput = {
  id: Scalars["Int"];
  isArchived: Scalars["Boolean"];
};

export type AudioAsset = {
  __typename?: "AudioAsset";
  createdAt?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["Int"]>;
  id: Scalars["Int"];
  origin?: Maybe<Scalars["Int"]>;
  pitch?: Maybe<Scalars["Int"]>;
  size?: Maybe<Scalars["Int"]>;
  speed?: Maybe<Scalars["Int"]>;
  tagsPlainText?: Maybe<Array<Maybe<Scalars["String"]>>>;
  tagsRawResponse?: Maybe<AudioTagsRawResponse>;
  transcriptPlainText?: Maybe<Scalars["String"]>;
  transcriptRawResponse?: Maybe<AudioTranscriptRawResponse>;
  uploadedName?: Maybe<Scalars["String"]>;
  uuid: Scalars["String"];
  voice?: Maybe<Scalars["String"]>;
};

export type AudioCategory = {
  __typename?: "AudioCategory";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type AudioConvertTextToSpeechInput = {
  text: Scalars["String"];
  userId: Scalars["String"];
  uuid: Scalars["String"];
};

export type AudioCreateAssetInput = {
  origin: Scalars["Int"];
  uploadedName?: Maybe<Scalars["String"]>;
  userId: Scalars["String"];
  uuid: Scalars["String"];
};

export type AudioCreateCategoryInput = {
  name: Scalars["String"];
};

export type AudioCreateGuestInput = {
  name: Scalars["String"];
};

export type AudioCreateSettingInput = {
  pitch?: Maybe<Scalars["Int"]>;
  speed?: Maybe<Scalars["Int"]>;
  voice?: Maybe<Scalars["String"]>;
};

export type AudioCreateSnippetInput = {
  assetId?: Maybe<Scalars["Int"]>;
  categoryId?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  distributionHeadline?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["Int"]>;
  guestNames?: Maybe<Array<Maybe<Scalars["String"]>>>;
  headline?: Maybe<Scalars["String"]>;
  parentSnippetId?: Maybe<Scalars["Int"]>;
  snippetUuid?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Int"]>;
  tagNames?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailBase64?: Maybe<Scalars["String"]>;
  thumbnailUuid?: Maybe<Scalars["String"]>;
  transcriptPlainText?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
};

export type AudioCreateTagInput = {
  name: Scalars["String"];
};

export type AudioDeleteCategoryInput = {
  id: Scalars["Int"];
};

export type AudioDeleteJobInput = {
  jobId: Scalars["String"];
};

export type AudioDeleteSnippetInput = {
  id: Scalars["Int"];
};

export type AudioGuest = {
  __typename?: "AudioGuest";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type AudioImportedAssetInput = {
  duration: Scalars["Int"];
  tagsPlainText: Array<Maybe<Scalars["String"]>>;
  tagsRawResponse: Scalars["String"];
  transcriptPlainText: Scalars["String"];
  transcriptRawResponse: Scalars["String"];
  userId: Scalars["String"];
  uuid: Scalars["String"];
};

export type AudioImportedSnippetInput = {
  description: Scalars["String"];
  distributionHeadline: Scalars["String"];
  guests?: Maybe<Array<Maybe<Scalars["String"]>>>;
  headline: Scalars["String"];
  isArchived: Scalars["Boolean"];
  status: Scalars["Int"];
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailUuid: Scalars["String"];
  transcriptPlainText?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
  uuid: Scalars["String"];
};

export type AudioImportSnippetFromVcmsInput = {
  asset: AudioImportedAssetInput;
  snippet: AudioImportedSnippetInput;
};

export type AudioJobCounts = {
  __typename?: "AudioJobCounts";
  active?: Maybe<Scalars["Int"]>;
  completed?: Maybe<Scalars["Int"]>;
  delayed?: Maybe<Scalars["Int"]>;
  failed?: Maybe<Scalars["Int"]>;
  paused?: Maybe<Scalars["Int"]>;
  waiting?: Maybe<Scalars["Int"]>;
};

export type AudioProgress = {
  __typename?: "AudioProgress";
  progress?: Maybe<Scalars["Int"]>;
  state?: Maybe<Scalars["String"]>;
};

export type AudioReconvertTextToSpeechInput = {
  newUuid: Scalars["String"];
  oldUuid: Scalars["String"];
  text: Scalars["String"];
  userId: Scalars["String"];
};

export type AudioSearchSnippetsResponse = {
  __typename?: "AudioSearchSnippetsResponse";
  snippets?: Maybe<Array<Maybe<AudioSnippet>>>;
  total?: Maybe<Scalars["Int"]>;
};

export type AudioSetting = {
  __typename?: "AudioSetting";
  id?: Maybe<Scalars["Int"]>;
  pitch?: Maybe<Scalars["Int"]>;
  speed?: Maybe<Scalars["Int"]>;
  voice?: Maybe<Scalars["String"]>;
};

export type AudioSnippet = {
  __typename?: "AudioSnippet";
  asset?: Maybe<AudioAsset>;
  category?: Maybe<AudioCategory>;
  createdAt?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  distributionHeadline?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["Int"]>;
  guests?: Maybe<Array<Maybe<AudioGuest>>>;
  headline?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  isArchived?: Maybe<Scalars["Boolean"]>;
  parentSnippet?: Maybe<AudioSnippet>;
  pitch?: Maybe<Scalars["Int"]>;
  speed?: Maybe<Scalars["Int"]>;
  startTime?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Int"]>;
  tags?: Maybe<Array<Maybe<AudioTag>>>;
  thumbnailUuid?: Maybe<Scalars["String"]>;
  transcriptPlainText?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
  uuid?: Maybe<Scalars["String"]>;
  voice?: Maybe<Scalars["String"]>;
};

export enum AudioSnippetSearchSort {
  DateAsc = "dateAsc",
  DateDesc = "dateDesc",
  Relevance = "relevance",
}

export type AudioSpeechRecognitionAlternative = {
  __typename?: "AudioSpeechRecognitionAlternative";
  words?: Maybe<Array<Maybe<AudioSpeechRecognitionWord>>>;
};

export type AudioSpeechRecognitionResult = {
  __typename?: "AudioSpeechRecognitionResult";
  alternatives?: Maybe<Array<Maybe<AudioSpeechRecognitionAlternative>>>;
};

export type AudioSpeechRecognitionTime = {
  __typename?: "AudioSpeechRecognitionTime";
  nanos?: Maybe<Scalars["Int"]>;
  seconds?: Maybe<Scalars["String"]>;
};

export type AudioSpeechRecognitionWord = {
  __typename?: "AudioSpeechRecognitionWord";
  endTime?: Maybe<AudioSpeechRecognitionTime>;
  startTime?: Maybe<AudioSpeechRecognitionTime>;
  word?: Maybe<Scalars["String"]>;
};

export type AudioTag = {
  __typename?: "AudioTag";
  id: Scalars["Int"];
  name: Scalars["String"];
  tokens: Scalars["String"];
};

export type AudioTagEntities = {
  __typename?: "AudioTagEntities";
  name?: Maybe<Scalars["String"]>;
  salience?: Maybe<Scalars["Float"]>;
  type?: Maybe<Scalars["String"]>;
};

export type AudioTagsRawResponse = {
  __typename?: "AudioTagsRawResponse";
  entities?: Maybe<Array<Maybe<AudioTagEntities>>>;
};

export type AudioTranscriptRawResponse = {
  __typename?: "AudioTranscriptRawResponse";
  results?: Maybe<Array<Maybe<AudioSpeechRecognitionResult>>>;
};

export type AudioTts = {
  __typename?: "AudioTts";
  assetUuid?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["Int"]>;
  isPublished?: Maybe<Scalars["Boolean"]>;
  /** @deprecated Field no longer supported */
  snippetUuid?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Boolean"]>;
};

export type AudioUpdateCategoryInput = {
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type AudioUpdateSnippetInput = {
  categoryId?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  distributionHeadline?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["Int"]>;
  guestNames?: Maybe<Array<Maybe<Scalars["String"]>>>;
  headline?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  startTime?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Int"]>;
  tagNames?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailBase64?: Maybe<Scalars["String"]>;
  thumbnailUuid?: Maybe<Scalars["String"]>;
  transcriptPlainText?: Maybe<Scalars["String"]>;
};

export type AudioUpdateSnippetTranscriptPlainTextInput = {
  id: Scalars["Int"];
  transcriptPlainText: Scalars["String"];
};

export type Author = {
  __typename?: "Author";
  /** @deprecated Use roles instead */
  authorType?: Maybe<Scalars["String"]>;
  authorWebsite?: Maybe<Scalars["String"]>;
  body?: Maybe<Scalars["String"]>;
  contactEmail?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  facebookId?: Maybe<Scalars["String"]>;
  hidden?: Maybe<Scalars["Boolean"]>;
  id: Scalars["Int"];
  imageUrl?: Maybe<Scalars["String"]>;
  linkedInId?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  /** @deprecated Use imageUrl instead */
  profileImageUrl?: Maybe<Scalars["String"]>;
  roles?: Maybe<Array<Maybe<Scalars["String"]>>>;
  /** @deprecated Use imageUrl instead */
  thumbnailImageUrl?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  twitterId?: Maybe<Scalars["String"]>;
  urlAlias?: Maybe<Scalars["String"]>;
};

export type BarchartFuture = {
  __typename?: "BarchartFuture";
  close: Scalars["Float"];
  dayCode: Scalars["String"];
  dollarVolume: Scalars["Float"];
  flag: Scalars["String"];
  high: Scalars["Float"];
  ID: Scalars["Int"];
  lastPrice: Scalars["Float"];
  low: Scalars["Float"];
  mode: Scalars["String"];
  name: Scalars["String"];
  netChange: Scalars["Float"];
  numTrades: Scalars["Int"];
  open: Scalars["Float"];
  percentChange: Scalars["Float"];
  previousOpenInterest: Scalars["Float"];
  previousVolume: Scalars["Int"];
  symbol: Scalars["String"];
  tradeTimestamp: Scalars["String"];
  unitCode: Scalars["String"];
  volume: Scalars["Int"];
};

export type BarchartGetFuturesByExchange = {
  __typename?: "BarchartGetFuturesByExchange";
  exchange: Scalars["String"];
  ID: Scalars["Int"];
  results?: Maybe<Array<Maybe<BarchartFuture>>>;
  timestamp: Scalars["Int"];
};

export type BarchartGetLeaders = {
  __typename?: "BarchartGetLeaders";
  exchanges: Scalars["String"];
  ID: Scalars["Int"];
  leaderboardType: Scalars["String"];
  results?: Maybe<Array<Maybe<BarchartLeader>>>;
  timestamp: Scalars["Int"];
};

export type BarchartGetQuote = {
  __typename?: "BarchartGetQuote";
  ID: Scalars["Int"];
  results?: Maybe<Array<Maybe<BarchartQuote>>>;
  symbols: Scalars["String"];
  timestamp: Scalars["Int"];
};

export type BarchartLeader = {
  __typename?: "BarchartLeader";
  country: Scalars["String"];
  exchange: Scalars["String"];
  ID: Scalars["Int"];
  industry: Scalars["String"];
  lastPrice: Scalars["Float"];
  previousClose: Scalars["Float"];
  previousVolume: Scalars["Int"];
  priceNetChange: Scalars["Float"];
  pricePercentChange: Scalars["Float"];
  sicSector: Scalars["String"];
  standardDeviation: Scalars["Float"];
  subIndustry: Scalars["String"];
  symbol: Scalars["String"];
  symbolName: Scalars["String"];
  timestamp: Scalars["String"];
  tradeTimestamp: Scalars["String"];
  volume: Scalars["Int"];
};

export type BarchartQuote = {
  __typename?: "BarchartQuote";
  close: Scalars["Float"];
  dayCode: Scalars["String"];
  dollarVolume: Scalars["Float"];
  flag: Scalars["String"];
  high: Scalars["Float"];
  ID: Scalars["Int"];
  lastPrice: Scalars["Float"];
  low: Scalars["Float"];
  mode: Scalars["String"];
  name: Scalars["String"];
  netChange: Scalars["Float"];
  numTrades: Scalars["Int"];
  open: Scalars["Float"];
  percentChange: Scalars["Float"];
  previousVolume: Scalars["Int"];
  serverTimestamp: Scalars["String"];
  symbol: Scalars["String"];
  tradeTimestamp: Scalars["String"];
  unitCode: Scalars["String"];
  volume: Scalars["Int"];
};

export type BasicPage = NodeInterface & {
  __typename?: "BasicPage";
  author?: Maybe<Author>;
  /** @deprecated Use bodyWithEmbeddedMedia instead */
  body?: Maybe<Scalars["String"]>;
  bodyWithEmbeddedMedia?: Maybe<Body>;
  createdAt?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  published?: Maybe<Scalars["Boolean"]>;
  teaserHeadline?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  urlAlias?: Maybe<Scalars["String"]>;
};

export type Body = {
  __typename?: "Body";
  embeddedMedia?: Maybe<Array<Maybe<EmbeddedMedia>>>;
  value?: Maybe<Scalars["String"]>;
};

export type BreakingNews = NodeInterface & {
  __typename?: "BreakingNews";
  byline?: Maybe<Scalars["String"]>;
  category?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  expirationTime?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  published?: Maybe<Scalars["Boolean"]>;
  teaserHeadline?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  url?: Maybe<Scalars["String"]>;
};

export enum BundleType {
  BasicPage = "BasicPage",
  BreakingNews = "BreakingNews",
  Commentary = "Commentary",
  NewsArticle = "NewsArticle",
  OffTheWire = "OffTheWire",
  PressRelease = "PressRelease",
  Sponsored = "Sponsored",
  StreetTalk = "StreetTalk",
}

export type Category = {
  __typename?: "Category";
  children?: Maybe<Array<Maybe<Category>>>;
  description?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  imageUrl?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  status?: Maybe<Scalars["Boolean"]>;
  urlAlias: Scalars["String"];
  weight?: Maybe<Scalars["Int"]>;
};

export type CategoryMenu = {
  __typename?: "CategoryMenu";
  children?: Maybe<Array<Maybe<Category>>>;
  isParent?: Maybe<Scalars["Boolean"]>;
  parent?: Maybe<Category>;
  self?: Maybe<Category>;
};

export type Commentary = NodeInterface & {
  __typename?: "Commentary";
  allowComments?: Maybe<Scalars["Boolean"]>;
  audioSnippet?: Maybe<AudioSnippet>;
  audioTts?: Maybe<AudioTts>;
  author?: Maybe<Author>;
  /** @deprecated Use bodyWithEmbeddedMedia instead */
  body?: Maybe<Scalars["String"]>;
  bodyWithEmbeddedMedia?: Maybe<Body>;
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars["String"]>;
  featuredContent?: Maybe<EmbeddedMedia>;
  id: Scalars["Int"];
  image?: Maybe<Image>;
  label?: Maybe<Label>;
  legacyThumbnailImageUrl?: Maybe<Scalars["String"]>;
  published?: Maybe<Scalars["Boolean"]>;
  source?: Maybe<Source>;
  summaryBullets?: Maybe<Array<Maybe<Scalars["String"]>>>;
  supportingAuthors?: Maybe<Array<Maybe<Author>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  teaserHeadline?: Maybe<Scalars["String"]>;
  teaserSnippet?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  urlAlias?: Maybe<Scalars["String"]>;
  videoSnippet?: Maybe<VideoSnippet>;
};

export type Company = {
  __typename?: "Company";
  ID: Scalars["String"];
  Name: Scalars["String"];
  Symbol: Scalars["String"];
};

export type Crypto = {
  __typename?: "Crypto";
  currency: Scalars["String"];
  ID: Scalars["Int"];
  results?: Maybe<Array<Maybe<Quote>>>;
  symbol: Scalars["String"];
};

export type CryptoComparePriceFull = {
  __typename?: "CryptoComparePriceFull";
  change24Hour: Scalars["Float"];
  change7Day: Scalars["Float"];
  changeDay: Scalars["Float"];
  changeHour: Scalars["Float"];
  changePct24Hour: Scalars["Float"];
  changePct24HourCalculated: Scalars["Float"];
  changePct7DayCalculated: Scalars["Float"];
  changePctDay: Scalars["Float"];
  changePctHour: Scalars["Float"];
  changePctHourCalculated: Scalars["Float"];
  circulatingSupply: Scalars["Float"];
  circulatingSupplyMktCap: Scalars["Float"];
  conversionSymbol: Scalars["String"];
  conversionType: Scalars["String"];
  flags: Scalars["String"];
  fromSymbol: Scalars["String"];
  high24Hour: Scalars["Float"];
  highDay: Scalars["Float"];
  highHour: Scalars["Float"];
  imageUrl: Scalars["String"];
  lastMarket: Scalars["String"];
  lastTradeId: Scalars["String"];
  lastUpdate: Scalars["Int"];
  lastVolume: Scalars["Float"];
  lastVolumeTo: Scalars["Float"];
  low24Hour: Scalars["Float"];
  lowDay: Scalars["Float"];
  lowHour: Scalars["Float"];
  market: Scalars["String"];
  median: Scalars["Float"];
  mktCap: Scalars["Float"];
  mktCapPenalty: Scalars["Float"];
  open24Hour: Scalars["Float"];
  openDay: Scalars["Float"];
  openHour: Scalars["Float"];
  price: Scalars["Float"];
  supply: Scalars["Float"];
  topTierVolume24Hour: Scalars["Float"];
  topTierVolume24HourTo: Scalars["Float"];
  toSymbol: Scalars["String"];
  totalTopTierVolume24h: Scalars["Float"];
  totalTopTierVolume24hTo: Scalars["Float"];
  totalVolume24h: Scalars["Float"];
  totalVolume24hTo: Scalars["Float"];
  type: Scalars["String"];
  volume24Hour: Scalars["Float"];
  volume24HourTo: Scalars["Float"];
  volumeDay: Scalars["Float"];
  volumeDayTo: Scalars["Float"];
  volumeHour: Scalars["Float"];
  volumeHourTo: Scalars["Float"];
};

export enum Day {
  Today = "Today",
  Yesterday = "Yesterday",
}

export type EmbeddedMedia = {
  __typename?: "EmbeddedMedia";
  assetUuid?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["Int"]>;
  snippetUuid?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Boolean"]>;
  thumbnailUuid?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type ExchangeRate = {
  __typename?: "ExchangeRate";
  ChangePercent: Scalars["Float"];
  Currency: Scalars["String"];
  CurrencyToUsd: Scalars["Float"];
  NYTime: Scalars["String"];
  UsdToCurrency: Scalars["Float"];
};

export type ExitModal = {
  __typename?: "ExitModal";
  active?: Maybe<Scalars["String"]>;
  backgroundImage?: Maybe<Scalars["String"]>;
  buttonColor?: Maybe<Scalars["String"]>;
  subTitle?: Maybe<Scalars["String"]>;
  subTitleColor?: Maybe<Scalars["String"]>;
  title?: Maybe<Scalars["String"]>;
  titleColor?: Maybe<Scalars["String"]>;
};

export type Forex = {
  __typename?: "Forex";
  ID: Scalars["Int"];
  results?: Maybe<Array<Maybe<ForexQuote>>>;
  symbol: Scalars["String"];
};

export type ForexQuote = {
  __typename?: "ForexQuote";
  ask: Scalars["Float"];
  bid: Scalars["Float"];
  change: Scalars["Float"];
  changePercentage: Scalars["Float"];
  ctousd: Scalars["Float"];
  ID: Scalars["Int"];
  mid: Scalars["Float"];
  nytime: Scalars["String"];
  timestamp: Scalars["Int"];
  usdtoc: Scalars["Float"];
};

export type Guest = {
  __typename?: "Guest";
  /** @deprecated Field no longer supported */
  firstName: Scalars["String"];
  /** @deprecated Field no longer supported */
  fullName: Scalars["String"];
  id: Scalars["Int"];
  /** @deprecated Field no longer supported */
  lastName: Scalars["String"];
  name?: Maybe<Scalars["String"]>;
  urlAlias?: Maybe<Scalars["String"]>;
};

export type HistoricalPoints = {
  __typename?: "HistoricalPoints";
  currency: Scalars["String"];
  fiveYear: Quote;
  ID: Scalars["Int"];
  now: Quote;
  oneYear: Quote;
  sixtyDay: Quote;
  symbol: Scalars["String"];
  thirtyDay: Quote;
  timestamp: Scalars["Int"];
};

export type Image = {
  __typename?: "Image";
  detail?: Maybe<ImageDetail>;
  teaser?: Maybe<Scalars["String"]>;
};

export type ImageDetail = {
  __typename?: "ImageDetail";
  default?: Maybe<SourceAttribute>;
  sources?: Maybe<ImageDetailSources>;
};

export type ImageDetailSources = {
  __typename?: "ImageDetailSources";
  desktop?: Maybe<SourceAttribute>;
  mobile?: Maybe<SourceAttribute>;
  tablet?: Maybe<SourceAttribute>;
  teaser_medium?: Maybe<SourceAttribute>;
  teaser_small?: Maybe<SourceAttribute>;
};

export type Label = {
  __typename?: "Label";
  backgroundColor?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  imageUrl?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  textColor?: Maybe<Scalars["String"]>;
  type?: Maybe<Scalars["String"]>;
};

export type LiveSpotGoldPrice = {
  __typename?: "LiveSpotGoldPrice";
  Change: Scalars["Float"];
  ChangePercent: Scalars["Float"];
  Price: Scalars["Float"];
};

export type LiveSpotGoldRow = {
  __typename?: "LiveSpotGoldRow";
  Currency: Scalars["String"];
  Gold: LiveSpotGoldPrice;
  Rate: ExchangeRate;
};

export type LiveSpotGoldTable = {
  __typename?: "LiveSpotGoldTable";
  ID: Scalars["String"];
  Symbol: Scalars["String"];
  Table?: Maybe<Array<Maybe<LiveSpotGoldRow>>>;
};

export type LondonFix = {
  __typename?: "LondonFix";
  currency: Scalars["String"];
  endTime: Scalars["Int"];
  ID: Scalars["Int"];
  results?: Maybe<Array<Maybe<LondonQuote>>>;
  startTime: Scalars["Int"];
};

export type LondonQuote = {
  __typename?: "LondonQuote";
  currency: Scalars["String"];
  goldAM: Scalars["Float"];
  goldPM: Scalars["Float"];
  ID: Scalars["Int"];
  palladiumAM: Scalars["Float"];
  palladiumPM: Scalars["Float"];
  platinumAM: Scalars["Float"];
  platinumPM: Scalars["Float"];
  silver: Scalars["Float"];
  timestamp: Scalars["Int"];
};

export type MarketStatus = {
  __typename?: "MarketStatus";
  next: Scalars["Int"];
  status: Scalars["String"];
};

export type Metal = {
  __typename?: "Metal";
  ask: Scalars["Float"];
  bid: Scalars["Float"];
  change: Scalars["Float"];
  changePercentage: Scalars["Float"];
  currency: Scalars["String"];
  high: Scalars["Float"];
  ID: Scalars["Int"];
  low: Scalars["Float"];
  mid: Scalars["Float"];
  name: Scalars["String"];
  results?: Maybe<Array<Maybe<Quote>>>;
  symbol: Scalars["String"];
  time: Scalars["Int"];
  unit: Scalars["String"];
  weights: Array<Weight>;
};

export type Mutation = {
  __typename?: "Mutation";
  AudioCancelUpload?: Maybe<Scalars["Boolean"]>;
  VideoCancelUpload?: Maybe<Scalars["Boolean"]>;
  VideoQueueworkerUpdateVideo?: Maybe<Scalars["Boolean"]>;
  VideoResetIsExported?: Maybe<Scalars["Boolean"]>;
};

export type MutationAudioCancelUploadArgs = {
  jobId?: Maybe<Scalars["String"]>;
  queue?: Maybe<Scalars["String"]>;
};

export type MutationVideoCancelUploadArgs = {
  jobId?: Maybe<Scalars["String"]>;
  queue?: Maybe<Scalars["String"]>;
};

export type MutationVideoQueueworkerUpdateVideoArgs = {
  input: Scalars["String"];
};

export type MutationVideoResetIsExportedArgs = {
  uuid: Scalars["String"];
};

export type NewsArticle = NodeInterface & {
  __typename?: "NewsArticle";
  allowComments?: Maybe<Scalars["Boolean"]>;
  audioSnippet?: Maybe<AudioSnippet>;
  audioTts?: Maybe<AudioTts>;
  author?: Maybe<Author>;
  /** @deprecated Use bodyWithEmbeddedMedia instead */
  body?: Maybe<Scalars["String"]>;
  bodyWithEmbeddedMedia?: Maybe<Body>;
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars["String"]>;
  featuredContent?: Maybe<EmbeddedMedia>;
  id: Scalars["Int"];
  image?: Maybe<Image>;
  label?: Maybe<Label>;
  legacyThumbnailImageUrl?: Maybe<Scalars["String"]>;
  published?: Maybe<Scalars["Boolean"]>;
  source?: Maybe<Source>;
  summaryBullets?: Maybe<Array<Maybe<Scalars["String"]>>>;
  supportingAuthors?: Maybe<Array<Maybe<Author>>>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  teaserHeadline?: Maybe<Scalars["String"]>;
  teaserSnippet?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  urlAlias?: Maybe<Scalars["String"]>;
  videoSnippet?: Maybe<VideoSnippet>;
};

export type NodeInterface = {
  createdAt?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  published?: Maybe<Scalars["Boolean"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
};

export type NodeListWithPagination = {
  __typename?: "NodeListWithPagination";
  items?: Maybe<Array<NodeInterface>>;
  total: Scalars["Int"];
};

export type OffTheWire = NodeInterface & {
  __typename?: "OffTheWire";
  author?: Maybe<Author>;
  body?: Maybe<Scalars["String"]>;
  category?: Maybe<Category>;
  createdAt?: Maybe<Scalars["String"]>;
  featured?: Maybe<Scalars["Boolean"]>;
  id: Scalars["Int"];
  imageUrl?: Maybe<Scalars["String"]>;
  legacyThumbnailImageUrl?: Maybe<Scalars["String"]>;
  published?: Maybe<Scalars["Boolean"]>;
  source?: Maybe<Source>;
  teaserHeadline?: Maybe<Scalars["String"]>;
  teaserSnippet?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  urlAlias?: Maybe<Scalars["String"]>;
};

export type PreExecuteNodeListWithPagination = {
  __typename?: "PreExecuteNodeListWithPagination";
  items?: Maybe<Array<NodeInterface>>;
  total: Scalars["Int"];
};

export type PressRelease = NodeInterface & {
  __typename?: "PressRelease";
  author?: Maybe<Author>;
  createdAt?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  published?: Maybe<Scalars["Boolean"]>;
  teaserHeadline?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  url: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  AudioGetSnippet?: Maybe<AudioSnippet>;
  authorByUrlAlias?: Maybe<Author>;
  categoriesTree?: Maybe<Array<Maybe<Category>>>;
  categoryByUrlAlias?: Maybe<Category>;
  /** @deprecated Field no longer supported */
  categoryChildrenByUrlAlias?: Maybe<Array<Maybe<Category>>>;
  /** @deprecated Use categoriesTree instead */
  categoryMenu?: Maybe<CategoryMenu>;
  exitModal?: Maybe<ExitModal>;
  GetBarchartFuturesByExchange?: Maybe<BarchartGetFuturesByExchange>;
  GetBarchartLeaders?: Maybe<BarchartGetLeaders>;
  GetBarchartQuotes?: Maybe<BarchartGetQuote>;
  GetCompany?: Maybe<Array<Maybe<Company>>>;
  GetCryptoComparePriceFull?: Maybe<Array<Maybe<CryptoComparePriceFull>>>;
  GetCryptoHistory?: Maybe<Array<Maybe<Crypto>>>;
  GetCryptoQuote?: Maybe<Crypto>;
  GetCurrentGold: Metal;
  GetForexQuote?: Maybe<Forex>;
  GetHistoricalPoints?: Maybe<HistoricalPoints>;
  GetLiveSpotGoldTable?: Maybe<LiveSpotGoldTable>;
  GetLondonFix?: Maybe<LondonFix>;
  GetMarketStatus?: Maybe<MarketStatus>;
  GetMetalHistory?: Maybe<Metal>;
  GetMetalQuote?: Maybe<Metal>;
  GetShanghaiFix?: Maybe<ShanghaiFix>;
  GetStock?: Maybe<Array<Maybe<Stock>>>;
  guestByUrlAlias?: Maybe<Guest>;
  latestNewsQueue?: Maybe<PreExecuteNodeListWithPagination>;
  marketNews?: Maybe<NodeListWithPagination>;
  nodeByUrlAlias?: Maybe<NodeInterface>;
  nodeIdsInQueue?: Maybe<Array<Maybe<Scalars["Int"]>>>;
  nodeList?: Maybe<NodeListWithPagination>;
  nodeListByAuthor?: Maybe<NodeListWithPagination>;
  nodeListByCategory?: Maybe<PreExecuteNodeListWithPagination>;
  nodeListByGuest?: Maybe<NodeListWithPagination>;
  nodeListBySponsor?: Maybe<NodeListWithPagination>;
  nodeListByTag?: Maybe<NodeListWithPagination>;
  nodeListQueue?: Maybe<PreExecuteNodeListWithPagination>;
  nodeListTrending?: Maybe<Array<Maybe<NodeInterface>>>;
  queueListByUrlAlias?: Maybe<Array<Maybe<Scalars["String"]>>>;
  RealtimeGold: Metal;
  reporters?: Maybe<Array<Maybe<Author>>>;
  search?: Maybe<Array<Maybe<SearchResult>>>;
  sponsorByUrlAlias?: Maybe<Sponsor>;
  tagByUrlAlias?: Maybe<Tag>;
  topContributors?: Maybe<Array<Maybe<Author>>>;
  trendingTags?: Maybe<Array<Maybe<Tag>>>;
  VideoExternalGetVideoByAlias?: Maybe<VideoExternalGetVideoByAlias>;
  VideoGetAllByCategoryUrlAlias?: Maybe<VideoCategorySnippets>;
  VideoGetCategories?: Maybe<Array<Maybe<VideoCategory>>>;
  VideoGetSnippet?: Maybe<VideoSnippet>;
  VideoSearchSnippets?: Maybe<VideoSearchSnippetsResponse>;
  VideoVideosListPageExternal?: Maybe<VideoVideosListPageExternal>;
};

export type QueryAudioGetSnippetArgs = {
  uuid?: Maybe<Scalars["String"]>;
};

export type QueryAuthorByUrlAliasArgs = {
  urlAlias: Scalars["String"];
};

export type QueryCategoryByUrlAliasArgs = {
  urlAlias: Scalars["String"];
};

export type QueryCategoryChildrenByUrlAliasArgs = {
  urlAlias: Scalars["String"];
};

export type QueryCategoryMenuArgs = {
  urlAlias: Scalars["String"];
};

export type QueryGetBarchartFuturesByExchangeArgs = {
  category?: Maybe<Scalars["String"]>;
  exchange: Scalars["String"];
  fields?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["Int"]>;
};

export type QueryGetBarchartLeadersArgs = {
  assetType: Scalars["String"];
  exchanges?: Maybe<Scalars["String"]>;
  leaderboardType: Scalars["String"];
  maxRecords?: Maybe<Scalars["Int"]>;
  period?: Maybe<Scalars["String"]>;
  sortDirection?: Maybe<Scalars["String"]>;
  timestamp?: Maybe<Scalars["Int"]>;
};

export type QueryGetBarchartQuotesArgs = {
  symbols: Scalars["String"];
  timestamp: Scalars["Int"];
};

export type QueryGetCryptoComparePriceFullArgs = {
  currency?: Scalars["String"];
  symbols: Scalars["String"];
};

export type QueryGetCryptoHistoryArgs = {
  compareToTime?: Maybe<Scalars["String"]>;
  currency?: Scalars["String"];
  endTime?: Maybe<Scalars["Int"]>;
  groupBy?: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  startTime: Scalars["Int"];
  symbol: Scalars["String"];
};

export type QueryGetCryptoQuoteArgs = {
  compareToTime?: Maybe<Scalars["String"]>;
  currency?: Scalars["String"];
  symbol: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
};

export type QueryGetForexQuoteArgs = {
  symbol: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
};

export type QueryGetHistoricalPointsArgs = {
  currency: Scalars["String"];
  symbol: Scalars["String"];
  timestamp: Scalars["Int"];
};

export type QueryGetLondonFixArgs = {
  currency?: Scalars["String"];
  endTime: Scalars["Int"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  startTime: Scalars["Int"];
};

export type QueryGetMetalHistoryArgs = {
  currency?: Scalars["String"];
  endTime?: Maybe<Scalars["Int"]>;
  groupBy?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  startTime: Scalars["Int"];
  symbol: Scalars["String"];
  unit?: Maybe<Scalars["String"]>;
};

export type QueryGetMetalQuoteArgs = {
  currency?: Scalars["String"];
  symbol: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
};

export type QueryGetShanghaiFixArgs = {
  currency?: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  symbol: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
};

export type QueryGuestByUrlAliasArgs = {
  urlAlias: Scalars["String"];
};

export type QueryLatestNewsQueueArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryMarketNewsArgs = {
  day?: Maybe<Day>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryNodeByUrlAliasArgs = {
  auHash?: Maybe<Scalars["String"]>;
  urlAlias: Scalars["String"];
};

export type QueryNodeIdsInQueueArgs = {
  queueId: Scalars["String"];
};

export type QueryNodeListArgs = {
  bundles?: Maybe<Array<Maybe<BundleType>>>;
  day?: Maybe<Day>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
};

export type QueryNodeListByAuthorArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
};

export type QueryNodeListByCategoryArgs = {
  includeEntityQueues?: Maybe<Scalars["Boolean"]>;
  includeRelatedCategories?: Maybe<Scalars["Boolean"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
};

export type QueryNodeListByGuestArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
};

export type QueryNodeListBySponsorArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
};

export type QueryNodeListByTagArgs = {
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
};

export type QueryNodeListQueueArgs = {
  bundles: Array<Maybe<BundleType>>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  queueId: Scalars["String"];
};

export type QueryNodeListTrendingArgs = {
  bundles: Array<Maybe<BundleType>>;
  limit?: Maybe<Scalars["Int"]>;
  sort?: Maybe<TrendingSort>;
};

export type QueryQueueListByUrlAliasArgs = {
  urlAlias: Scalars["String"];
};

export type QueryRealtimeGoldArgs = {
  currency: Scalars["String"];
};

export type QuerySearchArgs = {
  query: Scalars["String"];
};

export type QuerySponsorByUrlAliasArgs = {
  urlAlias: Scalars["String"];
};

export type QueryTagByUrlAliasArgs = {
  urlAlias: Scalars["String"];
};

export type QueryVideoExternalGetVideoByAliasArgs = {
  urlAlias: Scalars["String"];
};

export type QueryVideoGetAllByCategoryUrlAliasArgs = {
  urlAlias?: Maybe<Scalars["String"]>;
};

export type QueryVideoGetSnippetArgs = {
  uuid?: Maybe<Scalars["String"]>;
};

export type QueryVideoSearchSnippetsArgs = {
  categoryId?: Maybe<Scalars["Int"]>;
  dateEnd?: Maybe<Scalars["String"]>;
  dateStart?: Maybe<Scalars["String"]>;
  isArchived?: Maybe<Scalars["Boolean"]>;
  isChild?: Maybe<Scalars["Boolean"]>;
  isParent?: Maybe<Scalars["Boolean"]>;
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  query?: Maybe<Scalars["String"]>;
  sort?: Maybe<VideoSnippetSearchSort>;
  status?: Maybe<Scalars["Int"]>;
  textFields?: Maybe<Array<Maybe<Scalars["String"]>>>;
};

export type Quote = {
  __typename?: "Quote";
  ask: Scalars["Float"];
  bid: Scalars["Float"];
  change: Scalars["Float"];
  changePercentage: Scalars["Float"];
  close: Scalars["Float"];
  high: Scalars["Float"];
  ID: Scalars["Int"];
  low: Scalars["Float"];
  mid: Scalars["Float"];
  open: Scalars["Float"];
  timestamp: Scalars["Int"];
  unit: Scalars["String"];
};

export type Schema = {
  __typename?: "Schema";
  query?: Maybe<Query>;
};

export type SearchResult = {
  __typename?: "SearchResult";
  excerpt?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  relevance?: Maybe<Scalars["Float"]>;
  title?: Maybe<Scalars["String"]>;
  urlAlias?: Maybe<Scalars["String"]>;
};

export type ShanghaiFix = {
  __typename?: "ShanghaiFix";
  currency: Scalars["String"];
  ID: Scalars["Int"];
  results?: Maybe<Array<Maybe<ShanghaiQuote>>>;
  symbol: Scalars["String"];
};

export type ShanghaiQuote = {
  __typename?: "ShanghaiQuote";
  am: Scalars["Float"];
  currency: Scalars["String"];
  ID: Scalars["Int"];
  pm: Scalars["Float"];
  timestamp: Scalars["Int"];
};

export type Source = {
  __typename?: "Source";
  description?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  subtitle?: Maybe<Scalars["String"]>;
};

export type SourceAttribute = {
  __typename?: "SourceAttribute";
  media?: Maybe<Scalars["String"]>;
  srcset?: Maybe<Scalars["String"]>;
};

export type Sponsor = {
  __typename?: "Sponsor";
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
};

export type Sponsored = NodeInterface & {
  __typename?: "Sponsored";
  allowComments?: Maybe<Scalars["Boolean"]>;
  audioSnippet?: Maybe<AudioSnippet>;
  audioTts?: Maybe<AudioTts>;
  author?: Maybe<Author>;
  /** @deprecated Use bodyWithEmbeddedMedia instead */
  body?: Maybe<Scalars["String"]>;
  bodyWithEmbeddedMedia?: Maybe<Body>;
  createdAt?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  image?: Maybe<Image>;
  legacyThumbnailImageUrl?: Maybe<Scalars["String"]>;
  published?: Maybe<Scalars["Boolean"]>;
  source?: Maybe<Source>;
  sponsor?: Maybe<Sponsor>;
  tags?: Maybe<Array<Maybe<Tag>>>;
  teaserHeadline?: Maybe<Scalars["String"]>;
  teaserSnippet?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  urlAlias?: Maybe<Scalars["String"]>;
  videoSnippet?: Maybe<VideoSnippet>;
};

export type Stock = {
  __typename?: "Stock";
  Change: Scalars["Float"];
  ChangePercentage: Scalars["Float"];
  Currency: Scalars["String"];
  High: Scalars["Float"];
  ID: Scalars["Int"];
  Low: Scalars["Float"];
  Name: Scalars["String"];
  Price: Scalars["Float"];
  Symbol: Scalars["String"];
  Timestamp: Scalars["String"];
  Volume: Scalars["Int"];
};

export type StreetTalk = NodeInterface & {
  __typename?: "StreetTalk";
  createdAt?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  published?: Maybe<Scalars["Boolean"]>;
  source?: Maybe<Scalars["String"]>;
  teaserHeadline?: Maybe<Scalars["String"]>;
  title: Scalars["String"];
  updatedAt?: Maybe<Scalars["String"]>;
  url: Scalars["String"];
};

export type Subscription = {
  __typename?: "Subscription";
  GetCurrentGold: Metal;
  RealtimeGold: Metal;
};

export type SubscriptionRealtimeGoldArgs = {
  currency: Scalars["String"];
};

export type Tag = {
  __typename?: "Tag";
  id: Scalars["Int"];
  name: Scalars["String"];
  urlAlias: Scalars["String"];
};

export enum TrendingSort {
  Day = "Day",
  Month = "Month",
  Week = "Week",
  Year = "Year",
}

export type VideoArchiveSnippetInput = {
  id: Scalars["Int"];
  isArchived: Scalars["Boolean"];
};

export type VideoCategoriesWithSnippetNodes = {
  __typename?: "VideoCategoriesWithSnippetNodes";
  id?: Maybe<Scalars["Int"]>;
  name?: Maybe<Scalars["String"]>;
  snippets?: Maybe<Array<Maybe<VideoSnippet>>>;
  updatedAt?: Maybe<Scalars["Int"]>;
};

export type VideoCategory = {
  __typename?: "VideoCategory";
  id: Scalars["Int"];
  name: Scalars["String"];
  urlAlias?: Maybe<Scalars["String"]>;
};

export type LeadGen = {
  __typename?: "LeadGen";
  id: Scalars["Int"];
  title: Scalars["String"];
  published?: Maybe<Scalars["Boolean"]>;
  urlAlias?: Maybe<Scalars["String"]>;
  featured?: Maybe<Scalars["Boolean"]>;
  body: Scalars["String"];
};

export type VideoCategorySnippets = {
  __typename?: "VideoCategorySnippets";
  category?: Maybe<VideoCategory>;
  latest?: Maybe<Array<Maybe<VideoSnippet>>>;
  upNext?: Maybe<Array<Maybe<VideoSnippet>>>;
  videos?: Maybe<Array<Maybe<VideoSnippet>>>;
};

export type VideoCreateCategoryInput = {
  name: Scalars["String"];
};

export type VideoCreateGuestInput = {
  name: Scalars["String"];
};

export type VideoCreateSnippetInput = {
  author?: Maybe<Scalars["String"]>;
  categoryId?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  distributionHeadline?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["Int"]>;
  guestNames?: Maybe<Array<Maybe<Scalars["String"]>>>;
  headline?: Maybe<Scalars["String"]>;
  parentSnippetId?: Maybe<Scalars["Int"]>;
  snippetUuid?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Int"]>;
  tagNames?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailBase64?: Maybe<Scalars["String"]>;
  thumbnailUuid?: Maybe<Scalars["String"]>;
  transcriptPlainText?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
  videoId?: Maybe<Scalars["Int"]>;
};

export type VideoCreateTagInput = {
  name: Scalars["String"];
};

export type VideoCreateVideoInput = {
  size?: Maybe<Scalars["Int"]>;
  uploadedName?: Maybe<Scalars["String"]>;
  userId?: Maybe<Scalars["String"]>;
  uuid?: Maybe<Scalars["String"]>;
};

export type VideoDeleteCategoryInput = {
  id: Scalars["Int"];
};

export type VideoDeleteSnippetInput = {
  id: Scalars["Int"];
};

export type VideoExportSnippetToAcmsInput = {
  uuid: Scalars["String"];
};

export type VideoExternalGetVideoByAlias = {
  __typename?: "VideoExternalGetVideoByAlias";
  category?: Maybe<VideoCategory>;
  categoryVideos?: Maybe<Array<Maybe<VideoSnippet>>>;
  featured?: Maybe<VideoSnippet>;
  latest?: Maybe<Array<Maybe<VideoSnippet>>>;
  upNext?: Maybe<Array<Maybe<VideoSnippet>>>;
};

export type VideoExternalUpNextAndLatest = {
  __typename?: "VideoExternalUpNextAndLatest";
  latest?: Maybe<Array<Maybe<VideoSnippet>>>;
  upNext?: Maybe<Array<Maybe<VideoSnippet>>>;
};

export type VideoGuest = {
  __typename?: "VideoGuest";
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type VideoJobCounts = {
  __typename?: "VideoJobCounts";
  active?: Maybe<Scalars["Int"]>;
  completed?: Maybe<Scalars["Int"]>;
  delayed?: Maybe<Scalars["Int"]>;
  failed?: Maybe<Scalars["Int"]>;
  paused?: Maybe<Scalars["Int"]>;
  waiting?: Maybe<Scalars["Int"]>;
};

export type VideoProgress = {
  __typename?: "VideoProgress";
  progress?: Maybe<Scalars["Int"]>;
  state?: Maybe<Scalars["String"]>;
};

export type VideoQueueworkerUpdateVideoInput = {
  duration?: Maybe<Scalars["Int"]>;
  size?: Maybe<Scalars["Int"]>;
  tagsRawResponse?: Maybe<Scalars["String"]>;
  transcriptRawResponse?: Maybe<Scalars["String"]>;
  uuid: Scalars["String"];
};

export type VideoSearchSnippetsResponse = {
  __typename?: "VideoSearchSnippetsResponse";
  snippets?: Maybe<Array<Maybe<VideoSnippet>>>;
  total?: Maybe<Scalars["Int"]>;
};

export type VideoSnippet = {
  __typename?: "VideoSnippet";
  author?: Maybe<Scalars["String"]>;
  category?: Maybe<VideoCategory>;
  createdAt?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  distributionHeadline?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["Int"]>;
  frontendPath?: Maybe<Scalars["String"]>;
  guests?: Maybe<Array<Maybe<VideoGuest>>>;
  headline?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["Int"]>;
  isArchived?: Maybe<Scalars["Boolean"]>;
  isExported?: Maybe<Scalars["Boolean"]>;
  parentSnippet?: Maybe<VideoSnippet>;
  source?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Int"]>;
  tags?: Maybe<Array<Maybe<VideoTag>>>;
  thumbnailUuid?: Maybe<Scalars["String"]>;
  transcriptPlainText?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["Int"]>;
  userId?: Maybe<Scalars["String"]>;
  uuid?: Maybe<Scalars["String"]>;
  video?: Maybe<VideoVideo>;
};

export enum VideoSnippetSearchSort {
  DateAsc = "dateAsc",
  DateDesc = "dateDesc",
  Relevance = "relevance",
}

export type VideoSpeechRecognitionAlternative = {
  __typename?: "VideoSpeechRecognitionAlternative";
  words?: Maybe<Array<Maybe<VideoSpeechRecognitionWord>>>;
};

export type VideoSpeechRecognitionResult = {
  __typename?: "VideoSpeechRecognitionResult";
  alternatives?: Maybe<Array<Maybe<VideoSpeechRecognitionAlternative>>>;
};

export type VideoSpeechRecognitionTime = {
  __typename?: "VideoSpeechRecognitionTime";
  nanos?: Maybe<Scalars["Int"]>;
  seconds?: Maybe<Scalars["String"]>;
};

export type VideoSpeechRecognitionWord = {
  __typename?: "VideoSpeechRecognitionWord";
  endTime?: Maybe<VideoSpeechRecognitionTime>;
  startTime?: Maybe<VideoSpeechRecognitionTime>;
  word?: Maybe<Scalars["String"]>;
};

export type VideoTag = {
  __typename?: "VideoTag";
  id: Scalars["Int"];
  name: Scalars["String"];
  tokens: Scalars["String"];
};

export type VideoTagEntities = {
  __typename?: "VideoTagEntities";
  name?: Maybe<Scalars["String"]>;
  salience?: Maybe<Scalars["Float"]>;
  type?: Maybe<Scalars["String"]>;
};

export type VideoTagsRawResponse = {
  __typename?: "VideoTagsRawResponse";
  entities?: Maybe<Array<Maybe<VideoTagEntities>>>;
};

export type VideoTranscriptRawResponse = {
  __typename?: "VideoTranscriptRawResponse";
  results?: Maybe<Array<Maybe<VideoSpeechRecognitionResult>>>;
};

export type VideoUpdateCategoryInput = {
  id: Scalars["Int"];
  name: Scalars["String"];
};

export type VideoUpdateSnippetInput = {
  author?: Maybe<Scalars["String"]>;
  categoryId?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  distributionHeadline?: Maybe<Scalars["String"]>;
  endTime?: Maybe<Scalars["Int"]>;
  guestNames?: Maybe<Array<Maybe<Scalars["String"]>>>;
  headline?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  source?: Maybe<Scalars["String"]>;
  startTime?: Maybe<Scalars["Int"]>;
  status?: Maybe<Scalars["Int"]>;
  tagNames?: Maybe<Array<Maybe<Scalars["String"]>>>;
  thumbnailBase64?: Maybe<Scalars["String"]>;
  thumbnailUuid?: Maybe<Scalars["String"]>;
  transcriptPlainText?: Maybe<Scalars["String"]>;
};

export type VideoVideo = {
  __typename?: "VideoVideo";
  createdAt?: Maybe<Scalars["String"]>;
  duration?: Maybe<Scalars["Int"]>;
  id: Scalars["Int"];
  size?: Maybe<Scalars["Int"]>;
  tagsPlainText?: Maybe<Array<Maybe<Scalars["String"]>>>;
  tagsRawResponse?: Maybe<VideoTagsRawResponse>;
  transcriptPlainText?: Maybe<Scalars["String"]>;
  transcriptRawResponse?: Maybe<VideoTranscriptRawResponse>;
  uploadedName?: Maybe<Scalars["String"]>;
  uuid: Scalars["String"];
};

export type VideoVideosListPageExternal = {
  __typename?: "VideoVideosListPageExternal";
  categories?: Maybe<Array<Maybe<VideoCategoriesWithSnippetNodes>>>;
  featured?: Maybe<VideoSnippet>;
  latest?: Maybe<Array<Maybe<VideoSnippet>>>;
  upNext?: Maybe<Array<Maybe<VideoSnippet>>>;
};

export type Weight = {
  __typename?: "Weight";
  change: Scalars["Float"];
  unit: Scalars["String"];
  value: Scalars["Float"];
};

export type MktQuotesGoldRatiosSidebarQueryVariables = Exact<{
  timestamp: Scalars["Int"];
}>;

export type MktQuotesGoldRatiosSidebarQuery = { __typename?: "Query" } & {
  GetBarchartQuotes?: Maybe<
    { __typename?: "BarchartGetQuote" } & {
      results?: Maybe<
        Array<
          Maybe<{ __typename?: "BarchartQuote" } & BarchartFragmentFragment>
        >
      >;
    }
  >;
};

export type GetMarketStatusQueryVariables = Exact<{ [key: string]: never }>;

export type GetMarketStatusQuery = { __typename?: "Query" } & {
  GetMarketStatus?: Maybe<
    { __typename?: "MarketStatus" } & Pick<MarketStatus, "next" | "status">
  >;
};

export type QueuePressReleasesQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type QueuePressReleasesQuery = { __typename?: "Query" } & {
  ids: Query["nodeIdsInQueue"];
} & {
  pressReleases?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | ({ __typename?: "PressRelease" } & Pick<
                PressRelease,
                "id" | "title" | "createdAt" | "updatedAt" | "url"
              >)
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type GetMetalHistoryQueryVariables = Exact<{
  currency: Scalars["String"];
  startTime: Scalars["Int"];
  endTime: Scalars["Int"];
  groupBy: Scalars["String"];
  limit: Scalars["Int"];
  offset: Scalars["Int"];
  symbol: Scalars["String"];
}>;

export type GetMetalHistoryQuery = { __typename?: "Query" } & {
  GetMetalHistory?: Maybe<
    { __typename?: "Metal" } & Pick<Metal, "symbol"> & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "Quote" } & Pick<
                Quote,
                "timestamp" | "high" | "low" | "open" | "close"
              >
            >
          >
        >;
      }
  >;
};

export type GetCryptoHistoryQueryVariables = Exact<{
  symbol: Scalars["String"];
  currency: Scalars["String"];
  startTime: Scalars["Int"];
  endTime?: Maybe<Scalars["Int"]>;
  groupBy: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type GetCryptoHistoryQuery = { __typename?: "Query" } & {
  GetCryptoHistory?: Maybe<
    Array<
      Maybe<
        { __typename?: "Crypto" } & {
          results?: Maybe<
            Array<
              Maybe<
                { __typename?: "Quote" } & Pick<
                  Quote,
                  "high" | "low" | "open" | "close" | "timestamp"
                >
              >
            >
          >;
        }
      >
    >
  >;
};

export type CryptoQuoteQueryVariables = Exact<{
  symbol: Scalars["String"];
  currency: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
}>;

export type CryptoQuoteQuery = { __typename?: "Query" } & {
  GetCryptoQuote?: Maybe<
    { __typename?: "Crypto" } & Pick<Crypto, "symbol" | "currency"> & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "Quote" } & Pick<
                Quote,
                | "high"
                | "low"
                | "open"
                | "close"
                | "change"
                | "changePercentage"
              >
            >
          >
        >;
      }
  >;
};

export type CryptoResFragment = { __typename?: "Crypto" } & Pick<
  Crypto,
  "ID" | "symbol"
> & {
    results?: Maybe<
      Array<
        Maybe<
          { __typename?: "Quote" } & Pick<
            Quote,
            | "ID"
            | "high"
            | "low"
            | "open"
            | "close"
            | "change"
            | "changePercentage"
          >
        >
      >
    >;
  };

export type CryptosBtcEthLtcXmrXrpQueryVariables = Exact<{
  currency: Scalars["String"];
  timestamp: Scalars["Int"];
}>;

export type CryptosBtcEthLtcXmrXrpQuery = { __typename?: "Query" } & {
  BTC?: Maybe<{ __typename?: "Crypto" } & CryptoResFragment>;
  ETH?: Maybe<{ __typename?: "Crypto" } & CryptoResFragment>;
  LTC?: Maybe<{ __typename?: "Crypto" } & CryptoResFragment>;
  XMR?: Maybe<{ __typename?: "Crypto" } & CryptoResFragment>;
  XRP?: Maybe<{ __typename?: "Crypto" } & CryptoResFragment>;
};

export type CryptosTableQueryVariables = Exact<{
  symbols: Scalars["String"];
  currency: Scalars["String"];
}>;

export type CryptosTableQuery = { __typename?: "Query" } & {
  GetCryptoComparePriceFull?: Maybe<
    Array<
      Maybe<
        { __typename?: "CryptoComparePriceFull" } & Pick<
          CryptoComparePriceFull,
          | "price"
          | "imageUrl"
          | "mktCap"
          | "volumeDay"
          | "changePctHourCalculated"
          | "changePct24HourCalculated"
          | "changePct7DayCalculated"
          | "fromSymbol"
        >
      >
    >
  >;
};

export type DigestStreetTalkQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type DigestStreetTalkQuery = { __typename?: "Query" } & {
  nodeList?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | ({ __typename?: "StreetTalk" } & Pick<
                StreetTalk,
                "id" | "title" | "source" | "createdAt" | "updatedAt" | "url"
              >)
          >
        >;
      }
  >;
};

export type DigestLatestNewsQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type DigestLatestNewsQuery = { __typename?: "Query" } & {
  nodeListQueue?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | ({ __typename?: "NewsArticle" } & Pick<
                NewsArticle,
                | "id"
                | "title"
                | "urlAlias"
                | "createdAt"
                | "updatedAt"
                | "legacyThumbnailImageUrl"
              > & {
                  source?: Maybe<
                    { __typename?: "Source" } & Pick<Source, "id" | "name">
                  >;
                })
            | ({ __typename?: "OffTheWire" } & Pick<
                OffTheWire,
                | "id"
                | "title"
                | "urlAlias"
                | "createdAt"
                | "updatedAt"
                | "legacyThumbnailImageUrl"
              > & {
                  source?: Maybe<
                    { __typename?: "Source" } & Pick<Source, "id" | "name">
                  >;
                })
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | ({ __typename?: "StreetTalk" } & Pick<
                StreetTalk,
                "id" | "title" | "url" | "createdAt" | "updatedAt"
              > & { sourceText: StreetTalk["source"] })
          >
        >;
      }
  >;
};

export type ExitModalQueryVariables = Exact<{ [key: string]: never }>;

export type ExitModalQuery = { __typename?: "Query" } & {
  exitModal?: Maybe<
    { __typename: "ExitModal" } & Pick<
      ExitModal,
      | "active"
      | "backgroundImage"
      | "buttonColor"
      | "subTitle"
      | "subTitleColor"
      | "title"
      | "titleColor"
    >
  >;
};

export type MarketStatusQueryVariables = Exact<{ [key: string]: never }>;

export type MarketStatusQuery = { __typename?: "Query" } & {
  GetMarketStatus?: Maybe<
    { __typename?: "MarketStatus" } & Pick<MarketStatus, "status" | "next">
  >;
};

export type BarchartsGoldIndicatorsQueryVariables = Exact<{
  symbols: Scalars["String"];
  timestamp: Scalars["Int"];
}>;

export type BarchartsGoldIndicatorsQuery = { __typename?: "Query" } & {
  GetBarchartQuotes?: Maybe<
    { __typename?: "BarchartGetQuote" } & {
      results?: Maybe<
        Array<
          Maybe<{ __typename?: "BarchartQuote" } & BarchartFragmentFragment>
        >
      >;
    }
  >;
};

export type BarchartsQuotesQueryVariables = Exact<{
  timestamp: Scalars["Int"];
  symbols: Scalars["String"];
}>;

export type BarchartsQuotesQuery = { __typename?: "Query" } & {
  GetBarchartQuotes?: Maybe<
    { __typename?: "BarchartGetQuote" } & Pick<
      BarchartGetQuote,
      "timestamp" | "symbols"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "BarchartQuote" } & Pick<
                BarchartQuote,
                | "high"
                | "lastPrice"
                | "low"
                | "name"
                | "netChange"
                | "open"
                | "percentChange"
                | "serverTimestamp"
                | "symbol"
                | "volume"
              >
            >
          >
        >;
      }
  >;
};

export type BarchartsLeadersQueryVariables = Exact<{
  leaderType: Scalars["String"];
  limit: Scalars["Int"];
}>;

export type BarchartsLeadersQuery = { __typename?: "Query" } & {
  leaders?: Maybe<
    { __typename?: "BarchartGetLeaders" } & Pick<
      BarchartGetLeaders,
      "exchanges" | "timestamp"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "BarchartLeader" } & Pick<
                BarchartLeader,
                | "symbol"
                | "symbolName"
                | "priceNetChange"
                | "pricePercentChange"
                | "lastPrice"
                | "timestamp"
              >
            >
          >
        >;
      }
  >;
};

export type RegionIndicesQueryVariables = Exact<{
  timestamp: Scalars["Int"];
}>;

export type RegionIndicesQuery = { __typename?: "Query" } & {
  USquotes?: Maybe<
    { __typename?: "BarchartGetQuote" } & Pick<
      BarchartGetQuote,
      "timestamp" | "symbols"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "BarchartQuote" } & Pick<
                BarchartQuote,
                | "lastPrice"
                | "name"
                | "netChange"
                | "percentChange"
                | "serverTimestamp"
                | "symbol"
              >
            >
          >
        >;
      }
  >;
  EUquotes?: Maybe<
    { __typename?: "BarchartGetQuote" } & Pick<
      BarchartGetQuote,
      "timestamp" | "symbols"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "BarchartQuote" } & Pick<
                BarchartQuote,
                | "lastPrice"
                | "name"
                | "netChange"
                | "percentChange"
                | "serverTimestamp"
                | "symbol"
              >
            >
          >
        >;
      }
  >;
  ASIAquotes?: Maybe<
    { __typename?: "BarchartGetQuote" } & Pick<
      BarchartGetQuote,
      "timestamp" | "symbols"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "BarchartQuote" } & Pick<
                BarchartQuote,
                | "lastPrice"
                | "name"
                | "netChange"
                | "percentChange"
                | "serverTimestamp"
                | "symbol"
              >
            >
          >
        >;
      }
  >;
};

export type BarchartsFuturesByExchangeQueryVariables = Exact<{
  exchange: Scalars["String"];
  category: Scalars["String"];
}>;

export type BarchartsFuturesByExchangeQuery = { __typename?: "Query" } & {
  GetBarchartFuturesByExchange?: Maybe<
    { __typename?: "BarchartGetFuturesByExchange" } & Pick<
      BarchartGetFuturesByExchange,
      "timestamp" | "exchange"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "BarchartFuture" } & Pick<
                BarchartFuture,
                | "name"
                | "lastPrice"
                | "percentChange"
                | "netChange"
                | "symbol"
                | "close"
                | "low"
                | "high"
              >
            >
          >
        >;
      }
  >;
};

export type MetalQuoteQueryVariables = Exact<{
  symbol: Scalars["String"];
  currency: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
}>;

export type MetalQuoteQuery = { __typename?: "Query" } & {
  GetMetalQuote?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
};

export type AllMetalsQuoteQueryVariables = Exact<{
  currency: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
}>;

export type AllMetalsQuoteQuery = { __typename?: "Query" } & {
  gold?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  silver?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  platinum?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  palladium?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  rhodium?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
};

export type GoldSilverPlatinumPalladiumQueryVariables = Exact<{
  currency: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
}>;

export type GoldSilverPlatinumPalladiumQuery = { __typename?: "Query" } & {
  gold?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  silver?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  platinum?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  palladium?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
};

export type BaseMetalsQueryVariables = Exact<{
  timestamp?: Maybe<Scalars["Int"]>;
  currency: Scalars["String"];
}>;

export type BaseMetalsQuery = { __typename?: "Query" } & {
  AluminumPrice?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  CopperPrice?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  NickelPrice?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  ZincPrice?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  LeadPrice?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
};

export type MetalPointsInTimeQueryVariables = Exact<{
  now?: Maybe<Scalars["Int"]>;
  thirtyday?: Maybe<Scalars["Int"]>;
  oneyear?: Maybe<Scalars["Int"]>;
  sixmonths?: Maybe<Scalars["Int"]>;
  symbol: Scalars["String"];
}>;

export type MetalPointsInTimeQuery = { __typename?: "Query" } & {
  now?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  thirtyday?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  sixmonths?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  oneyear?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
};

export type MetalHistoryQueryVariables = Exact<{
  symbol: Scalars["String"];
  startTime: Scalars["Int"];
  endTime: Scalars["Int"];
  groupBy?: Maybe<Scalars["String"]>;
  offset?: Maybe<Scalars["Int"]>;
  limit?: Maybe<Scalars["Int"]>;
  currency: Scalars["String"];
}>;

export type MetalHistoryQuery = { __typename?: "Query" } & {
  GetMetalHistory?: Maybe<
    { __typename?: "Metal" } & Pick<Metal, "currency" | "symbol" | "name"> & {
        results?: Maybe<
          Array<Maybe<{ __typename?: "Quote" } & MetalQuoteFragmentFragment>>
        >;
      }
  >;
};

export type GoldSilverPlatinumPalladiumHistoryQueryVariables = Exact<{
  startTime: Scalars["Int"];
  endTime: Scalars["Int"];
  groupBy?: Maybe<Scalars["String"]>;
  limit?: Maybe<Scalars["Int"]>;
  currency: Scalars["String"];
}>;

export type GoldSilverPlatinumPalladiumHistoryQuery = {
  __typename?: "Query";
} & {
  gold?: Maybe<
    { __typename?: "Metal" } & Pick<Metal, "currency" | "symbol" | "name"> & {
        results?: Maybe<
          Array<Maybe<{ __typename?: "Quote" } & MetalQuoteFragmentFragment>>
        >;
      }
  >;
  silver?: Maybe<
    { __typename?: "Metal" } & Pick<Metal, "currency" | "symbol" | "name"> & {
        results?: Maybe<
          Array<Maybe<{ __typename?: "Quote" } & MetalQuoteFragmentFragment>>
        >;
      }
  >;
  platinum?: Maybe<
    { __typename?: "Metal" } & Pick<Metal, "currency" | "symbol" | "name"> & {
        results?: Maybe<
          Array<Maybe<{ __typename?: "Quote" } & MetalQuoteFragmentFragment>>
        >;
      }
  >;
  palladium?: Maybe<
    { __typename?: "Metal" } & Pick<Metal, "currency" | "symbol" | "name"> & {
        results?: Maybe<
          Array<Maybe<{ __typename?: "Quote" } & MetalQuoteFragmentFragment>>
        >;
      }
  >;
};

export type GetNivoDataQueryVariables = Exact<{
  currency: Scalars["String"];
  endTime: Scalars["Int"];
  groupBy: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  startTime: Scalars["Int"];
  symbol: Scalars["String"];
}>;

export type GetNivoDataQuery = { __typename?: "Query" } & {
  now?: Maybe<
    { __typename?: "Metal" } & Pick<
      Metal,
      "ID" | "symbol" | "currency" | "name"
    > & {
        results?: Maybe<
          Array<Maybe<{ __typename?: "Quote" } & MetalQuoteFragmentFragment>>
        >;
      }
  >;
  history?: Maybe<
    { __typename?: "Metal" } & Pick<Metal, "symbol" | "currency"> & {
        results?: Maybe<
          Array<Maybe<{ __typename?: "Quote" } & MetalQuoteFragmentFragment>>
        >;
      }
  >;
};

export type MetalAndCurrenciesQueryVariables = Exact<{
  symbol: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
}>;

export type MetalAndCurrenciesQuery = { __typename?: "Query" } & {
  metal?: Maybe<
    { __typename?: "Metal" } & {
      results?: Maybe<
        Array<
          Maybe<
            { __typename?: "Quote" } & Pick<
              Quote,
              | "ask"
              | "bid"
              | "change"
              | "changePercentage"
              | "high"
              | "low"
              | "mid"
              | "unit"
            >
          >
        >
      >;
    }
  >;
  AUD?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  BRL?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  GBP?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  CAD?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  CNY?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  EURO?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  HKD?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  INR?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  JPY?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  MXN?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  RUB?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  ZAR?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
  CHF?: Maybe<
    { __typename?: "Forex" } & {
      results?: Maybe<
        Array<Maybe<{ __typename?: "ForexQuote" } & ForexFragmentFragment>>
      >;
    }
  >;
};

export type ShanghaiFixQueryVariables = Exact<{
  currency: Scalars["String"];
  timestamp: Scalars["Int"];
  symbol: Scalars["String"];
}>;

export type ShanghaiFixQuery = { __typename?: "Query" } & {
  GetShanghaiFix?: Maybe<
    { __typename?: "ShanghaiFix" } & Pick<
      ShanghaiFix,
      "ID" | "currency" | "symbol"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "ShanghaiQuote" } & Pick<
                ShanghaiQuote,
                "ID" | "timestamp" | "am" | "pm"
              >
            >
          >
        >;
      }
  >;
};

export type LondonFixQueryVariables = Exact<{
  yesterday: Scalars["Int"];
  today: Scalars["Int"];
}>;

export type LondonFixQuery = { __typename?: "Query" } & {
  londonFixUSD?: Maybe<
    { __typename?: "LondonFix" } & Pick<
      LondonFix,
      "currency" | "startTime" | "endTime"
    > & {
        results?: Maybe<
          Array<
            Maybe<{ __typename?: "LondonQuote" } & LondonQuoteFragmentFragment>
          >
        >;
      }
  >;
  londonFixEUR?: Maybe<
    { __typename?: "LondonFix" } & Pick<
      LondonFix,
      "currency" | "startTime" | "endTime"
    > & {
        results?: Maybe<
          Array<
            Maybe<{ __typename?: "LondonQuote" } & LondonQuoteFragmentFragment>
          >
        >;
      }
  >;
  londonFixGBP?: Maybe<
    { __typename?: "LondonFix" } & Pick<
      LondonFix,
      "currency" | "startTime" | "endTime"
    > & {
        results?: Maybe<
          Array<
            Maybe<{ __typename?: "LondonQuote" } & LondonQuoteFragmentFragment>
          >
        >;
      }
  >;
};

export type LondonFixDynamicQueryVariables = Exact<{
  currency: Scalars["String"];
  startTime: Scalars["Int"];
  endTime: Scalars["Int"];
}>;

export type LondonFixDynamicQuery = { __typename?: "Query" } & {
  GetLondonFix?: Maybe<
    { __typename?: "LondonFix" } & Pick<LondonFix, "ID" | "currency"> & {
        results?: Maybe<
          Array<
            Maybe<{ __typename?: "LondonQuote" } & LondonQuoteFragmentFragment>
          >
        >;
      }
  >;
};

export type LondonFixAndShanghaiFixQueryVariables = Exact<{
  currency: Scalars["String"];
  yesterday: Scalars["Int"];
  today: Scalars["Int"];
  symbol: Scalars["String"];
}>;

export type LondonFixAndShanghaiFixQuery = { __typename?: "Query" } & {
  londonFix?: Maybe<
    { __typename?: "LondonFix" } & Pick<
      LondonFix,
      "ID" | "currency" | "startTime" | "endTime"
    > & {
        results?: Maybe<
          Array<
            Maybe<{ __typename?: "LondonQuote" } & LondonQuoteFragmentFragment>
          >
        >;
      }
  >;
  shanghaiFix?: Maybe<
    { __typename?: "ShanghaiFix" } & Pick<
      ShanghaiFix,
      "ID" | "currency" | "symbol"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "ShanghaiQuote" } & Pick<
                ShanghaiQuote,
                "ID" | "timestamp" | "am" | "pm"
              >
            >
          >
        >;
      }
  >;
};

export type SilverPgmQueryVariables = Exact<{
  currency: Scalars["String"];
  timestamp?: Maybe<Scalars["Int"]>;
}>;

export type SilverPgmQuery = { __typename?: "Query" } & {
  silver?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  platinum?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  palladium?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  rhodium?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
};

export type MetalMonthAnnualQueryVariables = Exact<{
  symbol: Scalars["String"];
  currency: Scalars["String"];
  timestamp: Scalars["Int"];
}>;

export type MetalMonthAnnualQuery = { __typename?: "Query" } & {
  GetHistoricalPoints?: Maybe<
    { __typename?: "HistoricalPoints" } & Pick<HistoricalPoints, "ID"> & {
        now: { __typename?: "Quote" } & Pick<
          Quote,
          "ID" | "bid" | "ask" | "low" | "high" | "change" | "changePercentage"
        >;
        thirtyDay: { __typename?: "Quote" } & Pick<
          Quote,
          "ID" | "change" | "changePercentage"
        >;
        sixtyDay: { __typename?: "Quote" } & Pick<
          Quote,
          "ID" | "change" | "changePercentage"
        >;
        oneYear: { __typename?: "Quote" } & Pick<
          Quote,
          "ID" | "change" | "changePercentage"
        >;
        fiveYear: { __typename?: "Quote" } & Pick<
          Quote,
          "ID" | "change" | "changePercentage"
        >;
      }
  >;
};

export type GoldRatiosQueryVariables = Exact<{
  symbols: Scalars["String"];
  timestamp: Scalars["Int"];
}>;

export type GoldRatiosQuery = { __typename?: "Query" } & {
  gold?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  silver?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  palladium?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  platinum?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  quotes?: Maybe<
    { __typename?: "BarchartGetQuote" } & Pick<
      BarchartGetQuote,
      "timestamp" | "symbols"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "BarchartQuote" } & Pick<
                BarchartQuote,
                "lastPrice" | "name" | "serverTimestamp" | "symbol"
              >
            >
          >
        >;
      }
  >;
  crudeOil?: Maybe<
    { __typename?: "BarchartGetFuturesByExchange" } & Pick<
      BarchartGetFuturesByExchange,
      "timestamp" | "exchange"
    > & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "BarchartFuture" } & Pick<
                BarchartFuture,
                "name" | "lastPrice" | "netChange" | "symbol"
              >
            >
          >
        >;
      }
  >;
};

export type ExchangeRatesTableQueryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type ExchangeRatesTableQueryQuery = { __typename?: "Query" } & {
  GetLiveSpotGoldTable?: Maybe<
    { __typename?: "LiveSpotGoldTable" } & Pick<
      LiveSpotGoldTable,
      "ID" | "Symbol"
    > & {
        Table?: Maybe<
          Array<
            Maybe<
              { __typename?: "LiveSpotGoldRow" } & Pick<
                LiveSpotGoldRow,
                "Currency"
              > & {
                  Rate: { __typename?: "ExchangeRate" } & Pick<
                    ExchangeRate,
                    | "CurrencyToUsd"
                    | "UsdToCurrency"
                    | "ChangePercent"
                    | "NYTime"
                  >;
                  Gold: { __typename?: "LiveSpotGoldPrice" } & Pick<
                    LiveSpotGoldPrice,
                    "Price" | "Change" | "ChangePercent"
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type ForexFragmentFragment = { __typename?: "ForexQuote" } & Pick<
  ForexQuote,
  | "timestamp"
  | "ask"
  | "mid"
  | "bid"
  | "change"
  | "changePercentage"
  | "ctousd"
  | "usdtoc"
>;

export type MetalFragmentFragment = { __typename?: "Metal" } & Pick<
  Metal,
  "ID" | "symbol" | "currency" | "name"
> & {
    results?: Maybe<
      Array<Maybe<{ __typename?: "Quote" } & MetalQuoteFragmentFragment>>
    >;
  };

export type MetalQuoteFragmentFragment = { __typename?: "Quote" } & Pick<
  Quote,
  | "ID"
  | "timestamp"
  | "high"
  | "low"
  | "open"
  | "close"
  | "ask"
  | "bid"
  | "mid"
  | "change"
  | "changePercentage"
  | "unit"
>;

export type BarchartFragmentFragment = { __typename?: "BarchartQuote" } & Pick<
  BarchartQuote,
  | "symbol"
  | "name"
  | "lastPrice"
  | "netChange"
  | "percentChange"
  | "open"
  | "high"
  | "low"
  | "close"
>;

export type LondonQuoteFragmentFragment = { __typename?: "LondonQuote" } & Pick<
  LondonQuote,
  | "ID"
  | "goldAM"
  | "goldPM"
  | "timestamp"
  | "silver"
  | "platinumAM"
  | "platinumPM"
  | "palladiumAM"
  | "palladiumPM"
>;

export type MiningPressReleaseQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type MiningPressReleaseQuery = { __typename?: "Query" } & {
  nodeList?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | ({ __typename?: "PressRelease" } & Pick<
                PressRelease,
                "id" | "title" | "createdAt" | "updatedAt" | "url"
              >)
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type NewsByCategoryGenericQueryVariables = Exact<{
  urlAlias: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  includeRelatedCategories?: Maybe<Scalars["Boolean"]>;
  includeEntityQueues?: Maybe<Scalars["Boolean"]>;
}>;

export type NewsByCategoryGenericQuery = { __typename?: "Query" } & {
  nodeListByCategory?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | ({ __typename?: "NewsArticle" } & ArticleTeaserFragmentFragment)
            | ({ __typename?: "OffTheWire" } & OffTheWireFragmentFragment)
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type NewsOffTheWireQueryVariables = Exact<{
  urlAlias: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type NewsOffTheWireQuery = { __typename?: "Query" } & {
  nodeListByCategory?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | ({ __typename?: "OffTheWire" } & Pick<
                OffTheWire,
                | "id"
                | "title"
                | "teaserHeadline"
                | "urlAlias"
                | "createdAt"
                | "updatedAt"
                | "teaserSnippet"
                | "legacyThumbnailImageUrl"
              > & {
                  author?: Maybe<
                    { __typename?: "Author" } & Pick<
                      Author,
                      "email" | "name" | "imageUrl" | "urlAlias"
                    >
                  >;
                  source?: Maybe<
                    { __typename?: "Source" } & Pick<
                      Source,
                      "id" | "description" | "name"
                    >
                  >;
                })
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type NewsTrendingGenericQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
}>;

export type NewsTrendingGenericQuery = { __typename?: "Query" } & {
  nodeListTrending?: Maybe<
    Array<
      Maybe<
        | { __typename?: "BasicPage" }
        | { __typename?: "BreakingNews" }
        | { __typename?: "Commentary" }
        | ({ __typename?: "NewsArticle" } & ArticleTeaserFragmentFragment)
        | { __typename?: "OffTheWire" }
        | { __typename?: "PressRelease" }
        | { __typename?: "Sponsored" }
        | { __typename?: "StreetTalk" }
      >
    >
  >;
};

export type NewsOpinionsGenericQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type NewsOpinionsGenericQuery = { __typename?: "Query" } & {
  opinions?: Maybe<
    { __typename?: "NodeListWithPagination" } & {
      items?: Maybe<
        Array<
          | { __typename?: "BasicPage" }
          | { __typename?: "BreakingNews" }
          | ({ __typename?: "Commentary" } & CommentaryTeaserFragmentFragment)
          | { __typename?: "NewsArticle" }
          | { __typename?: "OffTheWire" }
          | { __typename?: "PressRelease" }
          | { __typename?: "Sponsored" }
          | { __typename?: "StreetTalk" }
        >
      >;
    }
  >;
};

export type NewsGenericPressReleasesQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type NewsGenericPressReleasesQuery = { __typename?: "Query" } & {
  nodeList?: Maybe<
    { __typename?: "NodeListWithPagination" } & {
      items?: Maybe<
        Array<
          | { __typename?: "BasicPage" }
          | { __typename?: "BreakingNews" }
          | { __typename?: "Commentary" }
          | { __typename?: "NewsArticle" }
          | { __typename?: "OffTheWire" }
          | ({ __typename?: "PressRelease" } & Pick<
              PressRelease,
              | "id"
              | "title"
              | "teaserHeadline"
              | "createdAt"
              | "updatedAt"
              | "url"
            >)
          | { __typename?: "Sponsored" }
          | { __typename?: "StreetTalk" }
        >
      >;
    }
  >;
};

export type NodeListQueueQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  queueId: Scalars["String"];
}>;

export type NodeListQueueQuery = { __typename?: "Query" } & {
  ids: Query["nodeIdsInQueue"];
} & {
  nodeListQueue?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | ({ __typename?: "NewsArticle" } & ArticleTeaserFragmentFragment)
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type NewsHomePageCommentariesMobileQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type NewsHomePageCommentariesMobileQuery = { __typename?: "Query" } & {
  ids: Query["nodeIdsInQueue"];
} & {
  commentaries?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | ({ __typename?: "Commentary" } & CommentaryTeaserFragmentFragment)
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type MarketNewsHomePageQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type MarketNewsHomePageQuery = { __typename?: "Query" } & {
  marketNews?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | ({ __typename?: "NewsArticle" } & Pick<
                NewsArticle,
                | "id"
                | "title"
                | "teaserHeadline"
                | "urlAlias"
                | "createdAt"
                | "updatedAt"
                | "legacyThumbnailImageUrl"
              > & {
                  source?: Maybe<
                    { __typename?: "Source" } & SourceFragmentFragment
                  >;
                })
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type NewsGenericByTagQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
}>;

export type NewsGenericByTagQuery = { __typename?: "Query" } & {
  nodeListByTag?: Maybe<
    { __typename?: "NodeListWithPagination" } & {
      items?: Maybe<
        Array<
          | { __typename?: "BasicPage" }
          | { __typename?: "BreakingNews" }
          | { __typename?: "Commentary" }
          | ({ __typename?: "NewsArticle" } & ArticleTeaserFragmentFragment)
          | { __typename?: "OffTheWire" }
          | { __typename?: "PressRelease" }
          | { __typename?: "Sponsored" }
          | { __typename?: "StreetTalk" }
        >
      >;
    }
  >;
};

export type NewsGenericCommentariesQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type NewsGenericCommentariesQuery = { __typename?: "Query" } & {
  ids: Query["nodeIdsInQueue"];
} & {
  commentaries?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | ({ __typename: "Commentary" } & Pick<
                Commentary,
                | "id"
                | "createdAt"
                | "updatedAt"
                | "title"
                | "teaserHeadline"
                | "teaserSnippet"
                | "urlAlias"
                | "legacyThumbnailImageUrl"
              > & {
                  source?: Maybe<
                    { __typename?: "Source" } & SourceFragmentFragment
                  >;
                  image?: Maybe<
                    { __typename?: "Image" } & ImageFragmentFragment
                  >;
                  category?: Maybe<
                    { __typename?: "Category" } & Pick<
                      Category,
                      "id" | "urlAlias" | "name"
                    >
                  >;
                  author?: Maybe<
                    { __typename?: "Author" } & Pick<
                      Author,
                      | "authorWebsite"
                      | "body"
                      | "email"
                      | "facebookId"
                      | "name"
                      | "imageUrl"
                      | "linkedInId"
                      | "title"
                      | "twitterId"
                      | "authorType"
                      | "urlAlias"
                      | "roles"
                    >
                  >;
                })
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type ArticleByAliasQueryVariables = Exact<{
  urlAlias: Scalars["String"];
  auHash?: Maybe<Scalars["String"]>;
}>;

export type ArticleByAliasQuery = { __typename?: "Query" } & {
  nodeByUrlAlias?: Maybe<
    | ({ __typename: "BasicPage" } & Pick<
        BasicPage,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "BreakingNews" } & Pick<
        BreakingNews,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "Commentary" } & Pick<
        Commentary,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "NewsArticle" } & Pick<
        NewsArticle,
        | "summaryBullets"
        | "urlAlias"
        | "teaserSnippet"
        | "legacyThumbnailImageUrl"
        | "createdAt"
        | "updatedAt"
        | "id"
        | "published"
        | "title"
      > & {
          author?: Maybe<
            { __typename?: "Author" } & Pick<
              Author,
              | "authorWebsite"
              | "body"
              | "email"
              | "contactEmail"
              | "facebookId"
              | "name"
              | "imageUrl"
              | "linkedInId"
              | "title"
              | "twitterId"
              | "authorType"
              | "urlAlias"
              | "roles"
            >
          >;
          featuredContent?: Maybe<
            { __typename?: "EmbeddedMedia" } & Pick<
              EmbeddedMedia,
              | "type"
              | "assetUuid"
              | "snippetUuid"
              | "status"
              | "startTime"
              | "endTime"
              | "thumbnailUuid"
            >
          >;
          bodyWithEmbeddedMedia?: Maybe<
            { __typename?: "Body" } & Pick<Body, "value"> & {
                embeddedMedia?: Maybe<
                  Array<
                    Maybe<
                      { __typename?: "EmbeddedMedia" } & Pick<
                        EmbeddedMedia,
                        | "assetUuid"
                        | "snippetUuid"
                        | "status"
                        | "startTime"
                        | "endTime"
                        | "type"
                        | "thumbnailUuid"
                      >
                    >
                  >
                >;
              }
          >;
          source?: Maybe<
            { __typename?: "Source" } & Pick<
              Source,
              "id" | "name" | "description" | "subtitle"
            >
          >;
          category?: Maybe<
            { __typename?: "Category" } & CategoryFragmentFragment
          >;
          image?: Maybe<{ __typename?: "Image" } & ImageFragmentFragment>;
          audioTts?: Maybe<
            { __typename?: "AudioTts" } & Pick<
              AudioTts,
              "isPublished" | "assetUuid" | "status" | "endTime" | "startTime"
            >
          >;
          tags?: Maybe<
            Array<
              Maybe<
                { __typename?: "Tag" } & Pick<Tag, "id" | "name" | "urlAlias">
              >
            >
          >;
          supportingAuthors?: Maybe<
            Array<
              Maybe<
                { __typename?: "Author" } & Pick<
                  Author,
                  | "id"
                  | "name"
                  | "urlAlias"
                  | "imageUrl"
                  | "twitterId"
                  | "linkedInId"
                  | "email"
                  | "body"
                >
              >
            >
          >;
        })
    | ({ __typename: "OffTheWire" } & Pick<
        OffTheWire,
        | "urlAlias"
        | "imageUrl"
        | "featured"
        | "body"
        | "legacyThumbnailImageUrl"
        | "createdAt"
        | "updatedAt"
        | "id"
        | "published"
        | "title"
      > & {
          author?: Maybe<
            { __typename?: "Author" } & Pick<
              Author,
              | "authorWebsite"
              | "body"
              | "email"
              | "facebookId"
              | "name"
              | "imageUrl"
              | "linkedInId"
              | "title"
              | "twitterId"
              | "authorType"
              | "urlAlias"
              | "roles"
            >
          >;
          source?: Maybe<
            { __typename?: "Source" } & Pick<
              Source,
              "name" | "subtitle" | "description"
            >
          >;
        })
    | ({ __typename: "PressRelease" } & Pick<
        PressRelease,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "Sponsored" } & Pick<
        Sponsored,
        | "urlAlias"
        | "teaserSnippet"
        | "createdAt"
        | "updatedAt"
        | "id"
        | "published"
        | "title"
      > & {
          author?: Maybe<
            { __typename?: "Author" } & Pick<
              Author,
              | "authorWebsite"
              | "body"
              | "email"
              | "facebookId"
              | "name"
              | "imageUrl"
              | "linkedInId"
              | "title"
              | "twitterId"
              | "authorType"
              | "urlAlias"
              | "roles"
            >
          >;
          bodyWithEmbeddedMedia?: Maybe<
            { __typename?: "Body" } & Pick<Body, "value"> & {
                embeddedMedia?: Maybe<
                  Array<
                    Maybe<
                      { __typename?: "EmbeddedMedia" } & Pick<
                        EmbeddedMedia,
                        | "assetUuid"
                        | "snippetUuid"
                        | "status"
                        | "startTime"
                        | "endTime"
                        | "type"
                        | "thumbnailUuid"
                      >
                    >
                  >
                >;
              }
          >;
          source?: Maybe<
            { __typename?: "Source" } & Pick<
              Source,
              "id" | "name" | "description" | "subtitle"
            >
          >;
          image?: Maybe<{ __typename?: "Image" } & ImageFragmentFragment>;
          audioTts?: Maybe<
            { __typename?: "AudioTts" } & Pick<
              AudioTts,
              "isPublished" | "assetUuid" | "status" | "endTime" | "startTime"
            >
          >;
          tags?: Maybe<
            Array<
              Maybe<
                { __typename?: "Tag" } & Pick<Tag, "id" | "name" | "urlAlias">
              >
            >
          >;
        })
    | ({ __typename: "StreetTalk" } & Pick<
        StreetTalk,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "LeadGen" } & Pick<
        LeadGen,
        "id" | "published" | "title" | "body"
      >)
  >;
};

export type NodeListByAuthorQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
}>;

export type NodeListByAuthorQuery = { __typename?: "Query" } & {
  nodeListByAuthor?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | ({ __typename: "BasicPage" } & Pick<
                BasicPage,
                "id" | "title" | "createdAt" | "updatedAt"
              >)
            | ({ __typename: "BreakingNews" } & Pick<
                BreakingNews,
                "id" | "title" | "createdAt" | "updatedAt"
              >)
            | ({ __typename: "Commentary" } & Pick<
                Commentary,
                | "id"
                | "teaserSnippet"
                | "title"
                | "urlAlias"
                | "legacyThumbnailImageUrl"
                | "createdAt"
                | "updatedAt"
              > & {
                  category?: Maybe<
                    { __typename?: "Category" } & Pick<
                      Category,
                      "id" | "name" | "urlAlias"
                    >
                  >;
                  source?: Maybe<
                    { __typename?: "Source" } & SourceFragmentFragment
                  >;
                  author?: Maybe<
                    { __typename?: "Author" } & Pick<Author, "id" | "name">
                  >;
                  image?: Maybe<
                    { __typename?: "Image" } & ImageFragmentFragment
                  >;
                })
            | ({ __typename: "NewsArticle" } & Pick<
                NewsArticle,
                "id" | "title" | "createdAt" | "updatedAt"
              > &
                ArticleTeaserFragmentFragment)
            | ({ __typename: "OffTheWire" } & Pick<
                OffTheWire,
                "id" | "title" | "createdAt" | "updatedAt"
              > &
                OffTheWireFragmentFragment)
            | ({ __typename: "PressRelease" } & Pick<
                PressRelease,
                "id" | "title" | "createdAt" | "updatedAt"
              >)
            | ({ __typename: "Sponsored" } & Pick<
                Sponsored,
                "id" | "title" | "createdAt" | "updatedAt"
              >)
            | ({ __typename: "StreetTalk" } & Pick<
                StreetTalk,
                "id" | "title" | "createdAt" | "updatedAt"
              >)
          >
        >;
      }
  >;
};

export type AuthorByUrlAliasQueryVariables = Exact<{
  urlAlias: Scalars["String"];
}>;

export type AuthorByUrlAliasQuery = { __typename?: "Query" } & {
  authorByUrlAlias?: Maybe<
    { __typename?: "Author" } & Pick<
      Author,
      | "authorWebsite"
      | "body"
      | "email"
      | "contactEmail"
      | "facebookId"
      | "name"
      | "hidden"
      | "id"
      | "imageUrl"
      | "linkedInId"
      | "title"
      | "authorType"
      | "twitterId"
      | "roles"
    >
  >;
};

export type NewsCategoriesTreeQueryVariables = Exact<{ [key: string]: never }>;

export type NewsCategoriesTreeQuery = { __typename?: "Query" } & {
  categoriesTree?: Maybe<
    Array<
      Maybe<
        { __typename?: "Category" } & Pick<
          Category,
          "id" | "name" | "urlAlias" | "status"
        > & {
            children?: Maybe<
              Array<
                Maybe<
                  { __typename?: "Category" } & Pick<
                    Category,
                    "id" | "name" | "urlAlias" | "status"
                  > & {
                      children?: Maybe<
                        Array<
                          Maybe<
                            { __typename?: "Category" } & Pick<
                              Category,
                              "id" | "name" | "urlAlias" | "status"
                            > & {
                                children?: Maybe<
                                  Array<
                                    Maybe<
                                      { __typename?: "Category" } & Pick<
                                        Category,
                                        "id"
                                      >
                                    >
                                  >
                                >;
                              }
                          >
                        >
                      >;
                    }
                >
              >
            >;
          }
      >
    >
  >;
};

export type SponsorByUrlAliasQueryVariables = Exact<{
  urlAlias: Scalars["String"];
}>;

export type SponsorByUrlAliasQuery = { __typename?: "Query" } & {
  sponsor?: Maybe<{ __typename?: "Sponsor" } & Pick<Sponsor, "id" | "name">>;
};

export type SponsoredContentQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type SponsoredContentQuery = { __typename?: "Query" } & {
  nodeList?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | ({ __typename?: "Sponsored" } & Pick<
                Sponsored,
                | "id"
                | "title"
                | "teaserHeadline"
                | "teaserSnippet"
                | "urlAlias"
                | "createdAt"
                | "legacyThumbnailImageUrl"
              > & {
                  bodyWithEmbeddedMedia?: Maybe<
                    { __typename?: "Body" } & Pick<Body, "value">
                  >;
                  image?: Maybe<
                    { __typename?: "Image" } & ImageFragmentFragment
                  >;
                  author?: Maybe<
                    { __typename?: "Author" } & Pick<
                      Author,
                      "id" | "name" | "urlAlias"
                    >
                  >;
                })
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type ReportersQueryVariables = Exact<{ [key: string]: never }>;

export type ReportersQuery = { __typename?: "Query" } & {
  reporters?: Maybe<
    Array<
      Maybe<
        { __typename?: "Author" } & Pick<
          Author,
          "id" | "name" | "imageUrl" | "urlAlias" | "hidden"
        >
      >
    >
  >;
};

export type NewsTopContributorsQueryVariables = Exact<{ [key: string]: never }>;

export type NewsTopContributorsQuery = { __typename?: "Query" } & {
  topContributors?: Maybe<
    Array<
      Maybe<
        { __typename?: "Author" } & Pick<
          Author,
          "id" | "name" | "imageUrl" | "urlAlias" | "hidden"
        >
      >
    >
  >;
};

export type NodeListBySponsorQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
}>;

export type NodeListBySponsorQuery = { __typename?: "Query" } & {
  nodeListBySponsor?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | ({ __typename?: "Sponsored" } & Pick<
                Sponsored,
                | "id"
                | "createdAt"
                | "updatedAt"
                | "title"
                | "urlAlias"
                | "teaserSnippet"
                | "legacyThumbnailImageUrl"
              > & {
                  sponsor?: Maybe<
                    { __typename?: "Sponsor" } & Pick<Sponsor, "id" | "name">
                  >;
                  author?: Maybe<
                    { __typename?: "Author" } & Pick<
                      Author,
                      "id" | "name" | "urlAlias"
                    >
                  >;
                  image?: Maybe<
                    { __typename?: "Image" } & ImageFragmentFragment
                  >;
                })
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type NewsTrendingTagsQueryVariables = Exact<{ [key: string]: never }>;

export type NewsTrendingTagsQuery = { __typename?: "Query" } & {
  trendingTags?: Maybe<
    Array<Maybe<{ __typename?: "Tag" } & Pick<Tag, "id" | "urlAlias" | "name">>>
  >;
};

export type NewsIndexPageQueryQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type NewsIndexPageQueryQuery = { __typename?: "Query" } & {
  queue?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | ({ __typename: "NewsArticle" } & Pick<
                NewsArticle,
                | "id"
                | "title"
                | "teaserSnippet"
                | "teaserHeadline"
                | "urlAlias"
                | "createdAt"
                | "updatedAt"
                | "legacyThumbnailImageUrl"
              > & {
                  category?: Maybe<
                    { __typename?: "Category" } & Pick<
                      Category,
                      "id" | "name" | "urlAlias"
                    >
                  >;
                  source?: Maybe<
                    { __typename?: "Source" } & Pick<
                      Source,
                      "name" | "subtitle" | "description"
                    >
                  >;
                  audioTts?: Maybe<
                    { __typename?: "AudioTts" } & Pick<
                      AudioTts,
                      "isPublished" | "assetUuid"
                    >
                  >;
                  image?: Maybe<
                    { __typename?: "Image" } & {
                      detail?: Maybe<
                        { __typename?: "ImageDetail" } & {
                          default?: Maybe<
                            { __typename?: "SourceAttribute" } & Pick<
                              SourceAttribute,
                              "srcset"
                            >
                          >;
                        }
                      >;
                    }
                  >;
                })
            | ({ __typename: "OffTheWire" } & Pick<
                OffTheWire,
                | "id"
                | "title"
                | "body"
                | "urlAlias"
                | "createdAt"
                | "updatedAt"
                | "imageUrl"
                | "featured"
                | "legacyThumbnailImageUrl"
              > & {
                  category?: Maybe<
                    { __typename?: "Category" } & Pick<
                      Category,
                      "id" | "name" | "urlAlias"
                    >
                  >;
                  source?: Maybe<
                    { __typename?: "Source" } & Pick<
                      Source,
                      "name" | "subtitle" | "description"
                    >
                  >;
                })
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type BreakingNewsQueryVariables = Exact<{ [key: string]: never }>;

export type BreakingNewsQuery = { __typename?: "Query" } & {
  nodeList?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | ({ __typename?: "BreakingNews" } & Pick<
                BreakingNews,
                | "id"
                | "title"
                | "createdAt"
                | "updatedAt"
                | "category"
                | "byline"
                | "url"
              >)
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type StreetNewsHomePageQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type StreetNewsHomePageQuery = { __typename?: "Query" } & {
  nodeList?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | ({ __typename?: "StreetTalk" } & Pick<
                StreetTalk,
                | "id"
                | "title"
                | "teaserHeadline"
                | "source"
                | "createdAt"
                | "updatedAt"
                | "url"
              >)
          >
        >;
      }
  >;
};

export type NewsCategoryChildrenQueryVariables = Exact<{
  urlAlias: Scalars["String"];
}>;

export type NewsCategoryChildrenQuery = { __typename?: "Query" } & {
  categoryChildrenByUrlAlias?: Maybe<
    Array<
      Maybe<
        { __typename?: "Category" } & Pick<Category, "id" | "urlAlias" | "name">
      >
    >
  >;
};

export type TagByUrlAliasQueryVariables = Exact<{
  urlAlias: Scalars["String"];
}>;

export type TagByUrlAliasQuery = { __typename?: "Query" } & {
  tagByUrlAlias?: Maybe<
    { __typename?: "Tag" } & Pick<Tag, "id" | "name" | "urlAlias">
  >;
};

export type NodeListByTagQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
}>;

export type NodeListByTagQuery = { __typename?: "Query" } & {
  nodeListByTag?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | ({ __typename?: "Commentary" } & CommentaryTeaserFragmentFragment)
            | ({ __typename?: "NewsArticle" } & ArticleTeaserFragmentFragment)
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type GuestByUrlAliasQueryVariables = Exact<{
  urlAlias: Scalars["String"];
}>;

export type GuestByUrlAliasQuery = { __typename?: "Query" } & {
  guest?: Maybe<
    { __typename?: "Guest" } & Pick<Guest, "id" | "fullName" | "urlAlias">
  >;
};

export type NodeListByGuestQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
  urlAlias: Scalars["String"];
}>;

export type NodeListByGuestQuery = { __typename?: "Query" } & {
  guestNodes?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | ({ __typename?: "Commentary" } & CommentaryTeaserFragmentFragment)
            | ({ __typename?: "NewsArticle" } & ArticleTeaserFragmentFragment)
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | ({ __typename?: "Sponsored" } & Pick<
                Sponsored,
                | "title"
                | "teaserHeadline"
                | "id"
                | "urlAlias"
                | "createdAt"
                | "updatedAt"
                | "legacyThumbnailImageUrl"
              >)
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type DrupalSearchQueryVariables = Exact<{
  query: Scalars["String"];
  symbol: Scalars["String"];
  currency: Scalars["String"];
  timestamp: Scalars["Int"];
}>;

export type DrupalSearchQuery = { __typename?: "Query" } & {
  searchData?: Maybe<
    Array<
      Maybe<
        { __typename?: "SearchResult" } & Pick<
          SearchResult,
          "excerpt" | "id" | "relevance" | "title" | "urlAlias"
        >
      >
    >
  >;
  metalData?: Maybe<{ __typename?: "Metal" } & MetalFragmentFragment>;
  cryptoData?: Maybe<
    { __typename?: "Crypto" } & Pick<Crypto, "symbol" | "currency"> & {
        results?: Maybe<
          Array<
            Maybe<
              { __typename?: "Quote" } & Pick<
                Quote,
                | "ask"
                | "bid"
                | "high"
                | "low"
                | "open"
                | "close"
                | "change"
                | "changePercentage"
              >
            >
          >
        >;
      }
  >;
};

export type CategoryFragmentFragment = { __typename?: "Category" } & Pick<
  Category,
  "id" | "name" | "urlAlias"
>;

export type SourceFragmentFragment = { __typename?: "Source" } & Pick<
  Source,
  "description" | "id" | "name" | "subtitle"
>;

export type ImageFragmentFragment = { __typename?: "Image" } & {
  detail?: Maybe<
    { __typename?: "ImageDetail" } & {
      default?: Maybe<
        { __typename?: "SourceAttribute" } & Pick<SourceAttribute, "srcset">
      >;
      sources?: Maybe<
        { __typename?: "ImageDetailSources" } & {
          teaser_small?: Maybe<
            { __typename?: "SourceAttribute" } & Pick<
              SourceAttribute,
              "srcset" | "media"
            >
          >;
          teaser_medium?: Maybe<
            { __typename?: "SourceAttribute" } & Pick<
              SourceAttribute,
              "srcset" | "media"
            >
          >;
          desktop?: Maybe<
            { __typename?: "SourceAttribute" } & Pick<
              SourceAttribute,
              "media" | "srcset"
            >
          >;
          mobile?: Maybe<
            { __typename?: "SourceAttribute" } & Pick<
              SourceAttribute,
              "media" | "srcset"
            >
          >;
          tablet?: Maybe<
            { __typename?: "SourceAttribute" } & Pick<
              SourceAttribute,
              "media" | "srcset"
            >
          >;
        }
      >;
    }
  >;
};

export type ArticleTeaserFragmentFragment = {
  __typename: "NewsArticle";
} & Pick<
  NewsArticle,
  | "id"
  | "teaserSnippet"
  | "title"
  | "teaserHeadline"
  | "urlAlias"
  | "createdAt"
  | "updatedAt"
  | "legacyThumbnailImageUrl"
> & {
    category?: Maybe<
      { __typename?: "Category" } & Pick<Category, "id" | "name" | "urlAlias">
    >;
    source?: Maybe<
      { __typename?: "Source" } & Pick<
        Source,
        "name" | "subtitle" | "description"
      >
    >;
    audioTts?: Maybe<
      { __typename?: "AudioTts" } & Pick<
        AudioTts,
        "isPublished" | "snippetUuid"
      >
    >;
    image?: Maybe<{ __typename?: "Image" } & ImageFragmentFragment>;
  };

export type OffTheWireFragmentFragment = { __typename: "OffTheWire" } & Pick<
  OffTheWire,
  | "id"
  | "body"
  | "title"
  | "teaserHeadline"
  | "urlAlias"
  | "createdAt"
  | "updatedAt"
  | "imageUrl"
  | "featured"
  | "legacyThumbnailImageUrl"
> & {
    category?: Maybe<
      { __typename?: "Category" } & Pick<Category, "id" | "name" | "urlAlias">
    >;
    source?: Maybe<
      { __typename?: "Source" } & Pick<
        Source,
        "name" | "subtitle" | "description"
      >
    >;
  };

export type VideoSnippetFragmentFragment = {
  __typename: "VideoSnippet";
} & Pick<
  VideoSnippet,
  | "id"
  | "createdAt"
  | "description"
  | "endTime"
  | "frontendPath"
  | "headline"
  | "source"
  | "startTime"
  | "status"
  | "thumbnailUuid"
  | "updatedAt"
  | "uuid"
> & {
    category?: Maybe<
      { __typename?: "VideoCategory" } & Pick<
        VideoCategory,
        "id" | "name" | "urlAlias"
      >
    >;
    guests?: Maybe<
      Array<
        Maybe<{ __typename?: "VideoGuest" } & Pick<VideoGuest, "id" | "name">>
      >
    >;
    tags?: Maybe<
      Array<Maybe<{ __typename?: "VideoTag" } & Pick<VideoTag, "id" | "name">>>
    >;
    video?: Maybe<
      { __typename?: "VideoVideo" } & Pick<VideoVideo, "id" | "uuid">
    >;
  };

export type CommentaryTeaserFragmentFragment = {
  __typename: "Commentary";
} & Pick<
  Commentary,
  | "id"
  | "teaserSnippet"
  | "title"
  | "teaserHeadline"
  | "urlAlias"
  | "createdAt"
  | "updatedAt"
  | "legacyThumbnailImageUrl"
> & {
    author?: Maybe<{ __typename?: "Author" } & AuthorFragmentFragment>;
    tags?: Maybe<
      Array<
        Maybe<{ __typename?: "Tag" } & Pick<Tag, "id" | "name" | "urlAlias">>
      >
    >;
    image?: Maybe<{ __typename?: "Image" } & ImageFragmentFragment>;
  };

export type AuthorFragmentFragment = { __typename?: "Author" } & Pick<
  Author,
  | "authorWebsite"
  | "body"
  | "email"
  | "facebookId"
  | "name"
  | "imageUrl"
  | "linkedInId"
  | "title"
  | "twitterId"
  | "authorType"
  | "urlAlias"
  | "roles"
>;

export type OpinionByUrlAliasQueryVariables = Exact<{
  urlAlias: Scalars["String"];
  auHash?: Maybe<Scalars["String"]>;
}>;

export type OpinionByUrlAliasQuery = { __typename?: "Query" } & {
  nodeByUrlAlias?: Maybe<
    | ({ __typename: "BasicPage" } & Pick<
        BasicPage,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "BreakingNews" } & Pick<
        BreakingNews,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "Commentary" } & Pick<
        Commentary,
        | "summaryBullets"
        | "urlAlias"
        | "teaserSnippet"
        | "legacyThumbnailImageUrl"
        | "createdAt"
        | "updatedAt"
        | "id"
        | "published"
        | "title"
      > & {
          author?: Maybe<
            { __typename?: "Author" } & Pick<
              Author,
              | "authorWebsite"
              | "body"
              | "email"
              | "facebookId"
              | "name"
              | "imageUrl"
              | "linkedInId"
              | "title"
              | "twitterId"
              | "authorType"
              | "urlAlias"
              | "roles"
            >
          >;
          bodyWithEmbeddedMedia?: Maybe<
            { __typename?: "Body" } & Pick<Body, "value"> & {
                embeddedMedia?: Maybe<
                  Array<
                    Maybe<
                      { __typename?: "EmbeddedMedia" } & Pick<
                        EmbeddedMedia,
                        | "assetUuid"
                        | "snippetUuid"
                        | "status"
                        | "startTime"
                        | "endTime"
                        | "type"
                        | "thumbnailUuid"
                      >
                    >
                  >
                >;
              }
          >;
          category?: Maybe<
            { __typename?: "Category" } & CategoryFragmentFragment
          >;
          supportingAuthors?: Maybe<
            Array<
              Maybe<
                { __typename?: "Author" } & Pick<
                  Author,
                  | "id"
                  | "name"
                  | "urlAlias"
                  | "imageUrl"
                  | "twitterId"
                  | "linkedInId"
                  | "email"
                  | "body"
                >
              >
            >
          >;
          featuredContent?: Maybe<
            { __typename?: "EmbeddedMedia" } & Pick<
              EmbeddedMedia,
              | "type"
              | "assetUuid"
              | "snippetUuid"
              | "status"
              | "startTime"
              | "endTime"
              | "thumbnailUuid"
            >
          >;
          source?: Maybe<
            { __typename?: "Source" } & Pick<
              Source,
              "id" | "name" | "description" | "subtitle"
            >
          >;
          image?: Maybe<{ __typename?: "Image" } & ImageFragmentFragment>;
          audioTts?: Maybe<
            { __typename?: "AudioTts" } & Pick<
              AudioTts,
              "isPublished" | "assetUuid" | "status" | "endTime" | "startTime"
            >
          >;
          tags?: Maybe<
            Array<
              Maybe<
                { __typename?: "Tag" } & Pick<Tag, "id" | "name" | "urlAlias">
              >
            >
          >;
        })
    | ({ __typename: "NewsArticle" } & Pick<
        NewsArticle,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "OffTheWire" } & Pick<
        OffTheWire,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "PressRelease" } & Pick<
        PressRelease,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "Sponsored" } & Pick<
        Sponsored,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
    | ({ __typename: "StreetTalk" } & Pick<
        StreetTalk,
        "createdAt" | "updatedAt" | "id" | "published" | "title"
      >)
  >;
};

export type OpinionsByCategoryGenericQueryVariables = Exact<{
  urlAlias: Scalars["String"];
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type OpinionsByCategoryGenericQuery = { __typename?: "Query" } & {
  nodeListByCategory?: Maybe<
    { __typename?: "PreExecuteNodeListWithPagination" } & Pick<
      PreExecuteNodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | ({ __typename: "Commentary" } & Pick<
                Commentary,
                | "id"
                | "teaserSnippet"
                | "title"
                | "urlAlias"
                | "createdAt"
                | "updatedAt"
                | "legacyThumbnailImageUrl"
              > & {
                  category?: Maybe<
                    { __typename?: "Category" } & CategoryFragmentFragment
                  >;
                  bodyWithEmbeddedMedia?: Maybe<
                    { __typename?: "Body" } & Pick<Body, "value">
                  >;
                  image?: Maybe<
                    { __typename?: "Image" } & ImageFragmentFragment
                  >;
                  author?: Maybe<
                    { __typename?: "Author" } & Pick<
                      Author,
                      | "authorWebsite"
                      | "id"
                      | "name"
                      | "urlAlias"
                      | "body"
                      | "email"
                      | "facebookId"
                      | "imageUrl"
                      | "linkedInId"
                      | "title"
                      | "twitterId"
                      | "authorType"
                      | "roles"
                    >
                  >;
                })
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type ListVideosQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type ListVideosQuery = { __typename?: "Query" } & {
  VideoSearchSnippets?: Maybe<
    { __typename?: "VideoSearchSnippetsResponse" } & Pick<
      VideoSearchSnippetsResponse,
      "total"
    > & {
        snippets?: Maybe<
          Array<
            Maybe<
              { __typename?: "VideoSnippet" } & Pick<
                VideoSnippet,
                | "createdAt"
                | "headline"
                | "id"
                | "thumbnailUuid"
                | "uuid"
                | "source"
                | "frontendPath"
              > & {
                  guests?: Maybe<
                    Array<
                      Maybe<
                        { __typename?: "VideoGuest" } & Pick<
                          VideoGuest,
                          "id" | "name"
                        >
                      >
                    >
                  >;
                  tags?: Maybe<
                    Array<
                      Maybe<
                        { __typename?: "VideoTag" } & Pick<
                          VideoTag,
                          "id" | "name"
                        >
                      >
                    >
                  >;
                  video?: Maybe<
                    { __typename?: "VideoVideo" } & Pick<
                      VideoVideo,
                      "id" | "uuid"
                    >
                  >;
                }
            >
          >
        >;
      }
  >;
};

export type AllVideosPageQueryVariables = Exact<{ [key: string]: never }>;

export type AllVideosPageQuery = { __typename?: "Query" } & {
  VideoVideosListPageExternal?: Maybe<
    { __typename?: "VideoVideosListPageExternal" } & {
      featured?: Maybe<
        { __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment
      >;
      upNext?: Maybe<
        Array<
          Maybe<{ __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment>
        >
      >;
      latest?: Maybe<
        Array<
          Maybe<{ __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment>
        >
      >;
      categories?: Maybe<
        Array<
          Maybe<
            { __typename?: "VideoCategoriesWithSnippetNodes" } & Pick<
              VideoCategoriesWithSnippetNodes,
              "id" | "name"
            > & {
                snippets?: Maybe<
                  Array<
                    Maybe<
                      {
                        __typename?: "VideoSnippet";
                      } & VideoSnippetFragmentFragment
                    >
                  >
                >;
              }
          >
        >
      >;
    }
  >;
};

export type AllVideosByPlaylistUrlAliasQueryVariables = Exact<{
  urlAlias?: Maybe<Scalars["String"]>;
}>;

export type AllVideosByPlaylistUrlAliasQuery = { __typename?: "Query" } & {
  VideoGetAllByCategoryUrlAlias?: Maybe<
    { __typename?: "VideoCategorySnippets" } & {
      category?: Maybe<
        { __typename?: "VideoCategory" } & Pick<
          VideoCategory,
          "id" | "name" | "urlAlias"
        >
      >;
      videos?: Maybe<
        Array<
          Maybe<{ __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment>
        >
      >;
      upNext?: Maybe<
        Array<
          Maybe<{ __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment>
        >
      >;
      latest?: Maybe<
        Array<
          Maybe<{ __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment>
        >
      >;
    }
  >;
};

export type VideoByAliasQueryVariables = Exact<{
  urlAlias: Scalars["String"];
}>;

export type VideoByAliasQuery = { __typename?: "Query" } & {
  VideoExternalGetVideoByAlias?: Maybe<
    { __typename?: "VideoExternalGetVideoByAlias" } & {
      category?: Maybe<
        { __typename?: "VideoCategory" } & Pick<
          VideoCategory,
          "id" | "name" | "urlAlias"
        >
      >;
      categoryVideos?: Maybe<
        Array<
          Maybe<{ __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment>
        >
      >;
      upNext?: Maybe<
        Array<
          Maybe<{ __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment>
        >
      >;
      latest?: Maybe<
        Array<
          Maybe<{ __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment>
        >
      >;
      featured?: Maybe<
        { __typename?: "VideoSnippet" } & VideoSnippetFragmentFragment
      >;
    }
  >;
};

export type VideoGetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type VideoGetCategoriesQuery = { __typename?: "Query" } & {
  VideoGetCategories?: Maybe<
    Array<
      Maybe<
        { __typename?: "VideoCategory" } & Pick<
          VideoCategory,
          "id" | "name" | "urlAlias"
        >
      >
    >
  >;
};

export type ListDayMarketNewsQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type ListDayMarketNewsQuery = { __typename?: "Query" } & {
  today?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | ({ __typename?: "NewsArticle" } & Pick<
                NewsArticle,
                "id" | "title" | "urlAlias"
              > & {
                  source?: Maybe<
                    { __typename?: "Source" } & SourceFragmentFragment
                  >;
                })
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
  yesterday?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | ({ __typename?: "NewsArticle" } & Pick<
                NewsArticle,
                "id" | "title" | "urlAlias"
              > & {
                  source?: Maybe<
                    { __typename?: "Source" } & SourceFragmentFragment
                  >;
                })
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};

export type ListDayStreetTalkQueryVariables = Exact<{
  limit?: Maybe<Scalars["Int"]>;
  offset?: Maybe<Scalars["Int"]>;
}>;

export type ListDayStreetTalkQuery = { __typename?: "Query" } & {
  today?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | ({ __typename?: "StreetTalk" } & Pick<
                StreetTalk,
                "id" | "title" | "source" | "createdAt" | "updatedAt" | "url"
              >)
          >
        >;
      }
  >;
  yesterday?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | ({ __typename?: "StreetTalk" } & Pick<
                StreetTalk,
                "id" | "title" | "source" | "createdAt" | "updatedAt" | "url"
              >)
          >
        >;
      }
  >;
};

export type NewsLeadGenQueryQueryVariables = Exact<{ [key: string]: never }>;

export type NewsLeadGenQueryQuery = { __typename?: "Query" } & {
  queue?: Maybe<
    { __typename?: "NodeListWithPagination" } & Pick<
      NodeListWithPagination,
      "total"
    > & {
        items?: Maybe<
          Array<
            | { __typename?: "BasicPage" }
            | { __typename?: "BreakingNews" }
            | ({ __typename?: "LeadGen" } & Pick<
                LeadGen,
                | "id"
                | "title"
                | "published"
                | "urlAlias"
                | "featured"
                | "__typename"
              >)
            | { __typename?: "Commentary" }
            | { __typename?: "NewsArticle" }
            | { __typename?: "OffTheWire" }
            | { __typename?: "PressRelease" }
            | { __typename?: "Sponsored" }
            | { __typename?: "StreetTalk" }
          >
        >;
      }
  >;
};
