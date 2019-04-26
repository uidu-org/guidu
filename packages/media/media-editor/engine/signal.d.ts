export declare class Signal<SignalData> {
    private handler;
    emit(data: SignalData): void;
    listen(handler: (data: SignalData) => void): void;
    reset(): void;
}
