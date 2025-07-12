declare module "speech-to-text" {
  interface SpeechToTextOptions {
    continuous?: boolean;
    interimResults?: boolean;
    lang?: string;
  }

  type OnFinalisedCallback = (text: string) => void;
  type OnEndEventCallback = () => void;
  type OnAnythingSaidCallback = (text: string) => void;

  export default class SpeechToText {
    constructor(
      onFinalised: OnFinalisedCallback,
      onEndEvent?: OnEndEventCallback,
      onAnythingSaid?: OnAnythingSaidCallback,
      options?: SpeechToTextOptions
    );

    startListening(): void;
    stopListening(): void;
    isListening(): boolean;
    supportsSpeechRecognition(): boolean;
  }
}
