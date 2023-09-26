import { useState, createContext, useContext, PropsWithChildren } from 'react';
// import baseLangStrings from './ko-kr.json';
import baseLangStrings from './texts';
// import { TestName } from '../interface/interfaces';

type LangKey = "ko-kr";
type JsonLocalizedStrings = typeof baseLangStrings;

const baseTextContext = createContext<JsonLocalizedStrings>(baseLangStrings);
const TextProvidingWrapper = baseTextContext.Provider;

function AggregateTextProvider({ children }: PropsWithChildren){

    const [langStrings, setLangStrings] = useState<JsonLocalizedStrings>(baseLangStrings);

    return (
        <TextProvidingWrapper value={langStrings}>
            {children}
        </TextProvidingWrapper>
    );
}

type Page = "home" | "result" | "chemistry" | "test";
type TextKey = "emojis" | "nations";

function usePageString(page: Page) {
    return Object(useContext(baseTextContext).public.pages[page]);
}

function useString(key: TextKey) {
    return Object(useContext(baseTextContext).public[key]);
}

function usePageAsset(page: Page) {
    // return useContext(baseTextContext).public.assets[page];
}

export { AggregateTextProvider, usePageAsset, usePageString, useString }