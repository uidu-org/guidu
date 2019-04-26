import { PopupUploadEventPayloadMap } from '../src/components/types';
export declare type Event = {
    readonly name: string;
    readonly payload: any;
};
export declare type RecentUploadCard = {
    readonly filename: string;
};
/**
 * Popup Simple Example Page Object
 * @see https://www.seleniumhq.org/docs/06_test_design_considerations.jsp#page-object-design-pattern
 */
export declare class PopupSimplePage {
    private readonly page;
    constructor(page: any);
    clickUploadButton(): Promise<void>;
    getRecentUploadCards(): Promise<RecentUploadCard[]>;
    getRecentUploadCard(filename: string): Promise<RecentUploadCard | undefined>;
    clickInsertButton(): Promise<void>;
    getEvents(): Promise<Event[]>;
    getEvent(name: keyof PopupUploadEventPayloadMap): Promise<Event>;
    uploadFile(localPath: string): Promise<void>;
}
export declare function gotoPopupSimplePage(client: any): Promise<PopupSimplePage>;
