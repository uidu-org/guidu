import {
  AbstractResource,
  OnProviderChange,
  Provider,
  ServiceConfig,
  utils as serviceUtils,
} from '@atlaskit/util-service-support';
import { CategoryId } from '../components/picker/categories';
import { selectedToneStorageKey } from '../util/constants';
import { isMediaEmoji, isPromise, toEmojiId } from '../util/type-helpers';
import {
  EmojiDescription,
  EmojiId,
  EmojiResponse,
  EmojiSearchResult,
  EmojiUpload,
  OptionalEmojiDescription,
  OptionalUser,
  SearchOptions,
  ToneSelection,
  User,
} from '../types';
import debug from '../util/logger';
import EmojiLoader from './EmojiLoader';
import EmojiRepository from './EmojiRepository';
import SiteEmojiResource from './media/SiteEmojiResource';

export interface EmojiResourceConfig {
  /**
   * The service configuration for remotely recording emoji selections.
   * A post will be performed to this URL with the EmojiId as the body.
   */
  recordConfig?: ServiceConfig;

  /**
   * This defines the different providers. Later providers will override earlier
   * providers when performing shortName based look up.
   */
  providers: ServiceConfig[];

  /**
   * Must be set to true to enable upload support in the emoji components.
   *
   * Can be used for the restriction of the upload UI based on permissions, or feature flags.
   *
   * Note this also requires that other conditions are met (for example, one of the providers
   * must support upload for the UploadingEmojiResource implementation of UploadingEmojiProvider).
   */
  allowUpload?: boolean;

  /**
   * Logged user in the Product.
   */
  currentUser?: User;
}

export interface OnEmojiProviderChange
  extends OnProviderChange<EmojiSearchResult, any, void> {}

export interface Retry<T> {
  (): Promise<T> | T;
}

export interface ResolveReject<T> {
  resolve(result: T): void;
  reject(reason?: any): void;
}

export interface EmojiProvider
  extends Provider<string, EmojiSearchResult, any, undefined, SearchOptions> {
  /**
   * Returns the first matching emoji matching the shortName, or null if none found.
   *
   * Will load media api images before returning.
   */
  findByShortName(
    shortName: string,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;

  /**
   * Returns the first matching emoji matching the emojiId.id.
   *
   * If not found or emojiId.id is undefined, fallback to a search by shortName.
   *
   * Will load media api images before returning.
   */
  findByEmojiId(
    emojiId: EmojiId,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;

  /**
   * Return the emoji that matches the supplied id or undefined. As with findByEmojiId, this call should load
   * the media api images before returning.
   */
  findById(
    id: string,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;

  /**
   * Finds emojis belonging to specified category.
   *
   * Does not automatically load Media API images.
   */
  findInCategory(categoryId: string): Promise<EmojiDescription[]>;

  /**
   * Returns a map matching ascii representations to their corresponding EmojiDescription.
   */
  getAsciiMap(): Promise<Map<string, EmojiDescription>>;

  /**
   * Returns, in a Promise, an array of the most frequently used emoji, ordered from most frequent to least frequent.
   * If there is no frequently used data then an empty array should be returned.
   *
   * @param options supply options to be applied to the request.
   */
  getFrequentlyUsed(options?: SearchOptions): Promise<EmojiDescription[]>;

  /**
   * Records an emoji selection, for example for using in tracking recent emoji.
   * If no recordConfig is configured then a resolved promise should be returned
   *
   * Optional.
   */
  recordSelection?(emoji: EmojiDescription): Promise<any>;

  /**
   * Deletes the given emoji from the site emoji service
   * No changes are made if it is not a media emoji, no siteEmojiResource has been initialised
   * or the user is not authorised.
   * It should also be removed from the EmojiResource so it cannot be returned via search
   *
   * Optional.
   *
   * @return a boolean indicating whether the delete was successful
   */
  deleteSiteEmoji(emoji: EmojiDescription): Promise<boolean>;

  /**
   * Load media emoji that may require authentication to download, producing
   * a new EmojiDescription to be used for rendering, if necessary.
   *
   * Future results may be returned from a cache.
   *
   * Acts as a no-op if not a media emoji.
   *
   * Downloads and caches the altRepresentation image if useAlt is passed in
   *
   * @return an OptionalEmojiDescription or a promise for one, may be the same as the input,
   *   or updated with a new url to cached image data. Will return the original EmojiDescription
   *   if not a custom emoji.
   */
  loadMediaEmoji(
    emoji: EmojiDescription,
    useAlt?: boolean,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription>;

  /**
   * Indicates if media emoji should be rendered optimistically,
   * i.e. assume the url can be rendered directly from the URL, and
   * only explicitly loaded via loadEmojiImageData if it fails to load.
   *
   * If useAlt is provided, the altRepresentation image URL is used
   */
  optimisticMediaRendering(emoji: EmojiDescription, useAlt?: boolean): boolean;

  /**
   * Used by the picker and typeahead to obtain a skin tone preference
   * if the user has previously selected one via the Tone Selector
   */
  getSelectedTone(): ToneSelection;

  /**
   * Used by Tone Selector to indicate to the provider that the user
   * has selected a skin tone preference that should be remembered
   */
  setSelectedTone(tone: ToneSelection): void;

  /**
   * Returns a list of all the non-standard categories with emojis in the EmojiRepository
   * e.g. 'FREQUENT', 'ATLASSIAN' and 'CUSTOM'
   */
  calculateDynamicCategories?(): Promise<string[]>;

  /**
   * Returns the logged user passed by the Product
   */
  getCurrentUser(): OptionalUser;
}

export interface UploadingEmojiProvider extends EmojiProvider {
  /**
   * Returns true if upload is supported.
   *
   * Waits until resources have loaded before returning.
   */
  isUploadSupported(): Promise<boolean>;

  /**
   * Uploads an emoji to the configured repository.
   *
   * Will return a promise with the EmojiDescription once completed.
   *
   * The last search will be re-run to ensure the new emoji is considered in the search.
   */
  uploadCustomEmoji(upload: EmojiUpload): Promise<EmojiDescription>;

  /**
   * Allows the preloading of data (e.g. authentication tokens) to speed the uploading of emoji.
   */
  prepareForUpload(): Promise<void>;
}

/**
 * Checks if the emojiProvider can support uploading at a feature level.
 *
 * Follow this up with an isUploadSupported() check to see if the provider is actually
 * configured to support uploads.
 */
export const supportsUploadFeature = (
  emojiProvider: EmojiProvider,
): emojiProvider is UploadingEmojiProvider => {
  const {
    isUploadSupported,
    prepareForUpload,
    uploadCustomEmoji,
  } = emojiProvider as UploadingEmojiProvider;
  return !!(isUploadSupported && prepareForUpload && uploadCustomEmoji);
};

export interface LastQuery {
  query?: string;
  options?: SearchOptions;
}

export class EmojiResource
  extends AbstractResource<
    string,
    EmojiSearchResult,
    any,
    undefined,
    SearchOptions
  >
  implements EmojiProvider {
  protected recordConfig?: ServiceConfig;
  protected emojiRepository?: EmojiRepository;
  protected lastQuery?: LastQuery;
  protected activeLoaders: number = 0;
  protected retries: Map<Retry<any>, ResolveReject<any>> = new Map();
  protected siteEmojiResource?: SiteEmojiResource;
  protected selectedTone: ToneSelection;
  protected currentUser?: User;

  constructor(config: EmojiResourceConfig) {
    super();
    this.recordConfig = config.recordConfig;
    this.currentUser = config.currentUser;

    // Ensure order is retained by tracking until all done.
    const emojiResponses: EmojiResponse[] = [];

    this.activeLoaders = config.providers.length;

    config.providers.forEach((provider, index) => {
      const loader = new EmojiLoader(provider);
      const emojis = loader.loadEmoji();
      emojis
        .then(emojiResponse => {
          emojiResponses[index] = emojiResponse;
          this.initEmojiRepository(emojiResponses);
          this.initSiteEmojiResource(emojiResponse, provider).then(() => {
            this.activeLoaders--;
            this.performRetries();
            this.refreshLastFilter();
          });
        })
        .catch(reason => {
          this.activeLoaders--;
          this.notifyError(reason);
        });
    });

    if (typeof window !== 'undefined' && window.localStorage) {
      this.selectedTone = this.loadStoredTone();
    }

    if (config.providers.length === 0) {
      throw new Error('No providers specified');
    }
  }

  protected initEmojiRepository(emojiResponses: EmojiResponse[]): void {
    let emojis: EmojiDescription[] = [];
    emojiResponses.forEach(emojiResponse => {
      emojis = emojis.concat(emojiResponse.emojis);
    });
    this.emojiRepository = new EmojiRepository(emojis);
  }

  protected initSiteEmojiResource(
    emojiResponse: EmojiResponse,
    provider: ServiceConfig,
  ): Promise<void> {
    if (!this.siteEmojiResource && emojiResponse.mediaApiToken) {
      this.siteEmojiResource = new SiteEmojiResource(
        provider,
        emojiResponse.mediaApiToken,
      );

      // Prime cache type + optimistic rendering by checking first Emoji.
      // If this is fails, it won't be primed until a good emoji is loaded later.
      const { emojis } = emojiResponse;
      if (emojis.length) {
        const done = this.siteEmojiResource.optimisticRendering(emojis[0]);
        if (isPromise(done)) {
          return done
            .then(() => {
              debug('Primed siteEmojiResource');
            })
            .catch(() => {
              debug('Failed to prime siteEmojiResource');
            });
        } else {
          debug('Already primed siteEmojiResource');
        }
      } else {
        debug('No emoji to prime siteEmojiResource with');
      }
    }
    return Promise.resolve();
  }

  private performRetries(): void {
    const currentRetries = this.retries;
    this.retries = new Map();
    currentRetries.forEach((resolveReject, retry) => {
      const result = retry();
      if (isPromise(result)) {
        result
          .then(response => {
            resolveReject.resolve(response);
          })
          .catch(reason => {
            resolveReject.reject(reason);
          });
      } else {
        resolveReject.resolve(result);
      }
    });
  }

  private loadStoredTone(): ToneSelection {
    const storedToneString = window.localStorage.getItem(
      selectedToneStorageKey,
    );
    if (storedToneString) {
      const storedTone = parseInt(storedToneString, 10);
      return !isNaN(storedTone) ? storedTone : undefined;
    }

    return undefined;
  }

  protected refreshLastFilter(): void {
    if (typeof this.lastQuery !== 'undefined') {
      const { query, options } = this.lastQuery;
      this.filter(query, options);
    }
  }

  protected isLoaded = () => this.activeLoaders === 0 && this.emojiRepository;

  protected retryIfLoading<T>(retry: Retry<T>, defaultResponse: T): Promise<T> {
    if (!this.isLoaded()) {
      return new Promise<T>((resolve, reject) => {
        this.retries.set(retry, { resolve, reject });
      });
    }
    return Promise.resolve<T>(defaultResponse);
  }

  protected notifyResult(result: EmojiSearchResult): void {
    if (this.lastQuery && result.query === this.lastQuery.query) {
      super.notifyResult(result);
    }
  }

  loadMediaEmoji(
    emoji: EmojiDescription,
    useAlt?: boolean,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    if (!this.siteEmojiResource || !isMediaEmoji(emoji)) {
      return emoji;
    }
    return this.siteEmojiResource.loadMediaEmoji(emoji, useAlt);
  }

  optimisticMediaRendering(emoji: EmojiDescription, useAlt?: boolean): boolean {
    if (!isMediaEmoji(emoji)) {
      return true;
    }
    if (!this.siteEmojiResource) {
      // Shouldn't have a media emoji without a siteEmojiResouce, but anyway ;)
      return false;
    }
    const optimistic = this.siteEmojiResource.optimisticRendering(
      emoji,
      useAlt,
    );

    if (isPromise(optimistic)) {
      // Not sure yet, so lets say no for now (this should normally be primed in most/all cases)
      return false;
    }

    return optimistic;
  }

  filter(query?: string, options?: SearchOptions): void {
    this.lastQuery = {
      query,
      options,
    };
    if (this.emojiRepository) {
      this.notifyResult(this.emojiRepository.search(query, options));
    } else {
      // not ready
      this.notifyNotReady();
    }
  }

  findByShortName(
    shortName: string,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    if (this.isLoaded()) {
      // Wait for all emoji to load before looking by shortName (to ensure correct priority)
      return this.emojiRepository!.findByShortName(shortName);
    }
    return this.retryIfLoading<any>(
      () => this.findByShortName(shortName),
      undefined,
    );
  }

  findByEmojiId(
    emojiId: EmojiId,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    const { id, shortName } = emojiId;
    if (this.emojiRepository) {
      if (id) {
        const emoji = this.emojiRepository.findById(id);
        if (emoji) {
          return emoji;
        }
        if (this.isLoaded()) {
          // all loaded but not found by id, try server to see if
          // this is a newly uploaded emoji
          if (this.siteEmojiResource) {
            return this.siteEmojiResource.findEmoji(emojiId).then(emoji => {
              if (!emoji) {
                // if not, fallback to searching by shortName to
                // at least render an alternative
                return this.findByShortName(shortName);
              }
              this.addUnknownEmoji(emoji);
              return emoji;
            });
          }

          // if not, fallback to searching by shortName to
          // at least render an alternative
          return this.findByShortName(shortName);
        }
      } else {
        // no id fallback to shortName
        return this.findByShortName(shortName);
      }
    }
    return this.retryIfLoading(() => this.findByEmojiId(emojiId), undefined);
  }

  findById(
    id: string,
  ): OptionalEmojiDescription | Promise<OptionalEmojiDescription> {
    if (this.isLoaded()) {
      return this.emojiRepository!.findById(id);
    }

    return this.retryIfLoading(() => this.findById(id), undefined);
  }

  findInCategory(categoryId: CategoryId): Promise<EmojiDescription[]> {
    if (this.isLoaded()) {
      return Promise.resolve(this.emojiRepository!.findInCategory(categoryId));
    }
    return this.retryIfLoading(() => this.findInCategory(categoryId), []);
  }

  getAsciiMap(): Promise<Map<string, EmojiDescription>> {
    if (this.isLoaded()) {
      return Promise.resolve(this.emojiRepository!.getAsciiMap());
    }
    return this.retryIfLoading(() => this.getAsciiMap(), new Map());
  }

  getFrequentlyUsed(options?: SearchOptions): Promise<EmojiDescription[]> {
    if (this.isLoaded()) {
      return Promise.resolve(this.emojiRepository!.getFrequentlyUsed(options));
    }

    return this.retryIfLoading(() => this.getFrequentlyUsed(options), []);
  }

  /**
   * Record the selection of an emoji to a remote service if 'recordConfig' has been supplied.
   * Regardless of the recordConfig, emoji selections will always be recorded on the EmojiRepository
   * for the purposes of tracking the frequency of use.
   *
   * @param emoji The full description of the emoji to record usage for.
   */
  recordSelection(emoji: EmojiDescription): Promise<any> {
    const { recordConfig } = this;

    if (this.emojiRepository) {
      this.emojiRepository.used(emoji);
    }

    if (recordConfig) {
      const queryParams = {
        emojiId: toEmojiId(emoji),
      };
      const requestInit = {
        method: 'POST',
      };
      return serviceUtils.requestService(recordConfig, {
        queryParams,
        requestInit,
      });
    }

    return Promise.resolve();
  }

  deleteSiteEmoji(emoji: EmojiDescription): Promise<boolean> {
    if (this.siteEmojiResource && emoji.id) {
      return this.siteEmojiResource
        .deleteEmoji(emoji)
        .then(success => {
          if (success && this.emojiRepository) {
            this.emojiRepository.delete(emoji);
            return true;
          }
          return false;
        })
        .catch(err => {
          // eslint-disable-next-line no-console
          console.error('failed to delete site emoji', err);
          return false;
        });
    }
    return this.retryIfLoading(() => this.deleteSiteEmoji(emoji), false);
  }

  getSelectedTone(): ToneSelection {
    return this.selectedTone;
  }

  setSelectedTone(tone: ToneSelection) {
    this.selectedTone = tone;
    if (window.localStorage) {
      try {
        window.localStorage.setItem(
          selectedToneStorageKey,
          tone ? tone.toString() : '',
        );
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error('failed to store selected emoji skin tone', e);
      }
    }
  }

  calculateDynamicCategories(): Promise<CategoryId[]> {
    if (this.isLoaded()) {
      return Promise.resolve(this.emojiRepository!.getDynamicCategoryList());
    }

    return this.retryIfLoading(() => this.calculateDynamicCategories(), []);
  }

  getCurrentUser(): OptionalUser {
    return this.currentUser;
  }

  protected addUnknownEmoji(emoji: EmojiDescription) {
    if (this.emojiRepository) {
      this.emojiRepository.addUnknownEmoji(emoji);
    }
  }
}

export default class UploadingEmojiResource extends EmojiResource
  implements UploadingEmojiProvider {
  protected allowUpload: boolean;

  constructor(config: EmojiResourceConfig) {
    super(config);
    this.allowUpload = !!config.allowUpload;
  }

  isUploadSupported(): Promise<boolean> {
    if (!this.allowUpload) {
      return Promise.resolve(false);
    }
    if (this.siteEmojiResource) {
      return this.siteEmojiResource.hasUploadToken();
    }
    return this.retryIfLoading(() => this.isUploadSupported(), false);
  }

  uploadCustomEmoji(upload: EmojiUpload): Promise<EmojiDescription> {
    return this.isUploadSupported().then(supported => {
      if (!supported || !this.siteEmojiResource) {
        return Promise.reject('No media api support is configured');
      }

      return this.siteEmojiResource.uploadEmoji(upload).then(emoji => {
        this.addUnknownEmoji(emoji);
        this.refreshLastFilter();
        return emoji;
      });
    });
  }

  prepareForUpload(): Promise<void> {
    if (this.siteEmojiResource) {
      this.siteEmojiResource.prepareForUpload();
    }
    return this.retryIfLoading(() => this.prepareForUpload(), undefined);
  }
}
