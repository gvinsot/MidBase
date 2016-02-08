///<reference path="EventHandler.ts" />

module TypeScriptTools {
    // Interface
    export interface IDisposable {
        Dispose(): void;
    }

    export interface INotifyPropertyChanged {
        PropertyChanged: EventHandler;
    }

}
