import React, { createContext, useContext } from 'react';
import baseLangStrings from './ko-kr.json';

type LangKey = "ko-kr";
type JsonLocalizedStrings = typeof baseLangStrings;

const baseTextContext = createContext<JsonLocalizedStrings>(baseLangStrings);
const TextProvidingWrapper = baseTextContext.Provider;

function AggregateTextProvider({ children }: React.PropsWithChildren){

    const [langStrings, setLangStrings] = React.useState<JsonLocalizedStrings>(baseLangStrings);

    return (
        <TextProvidingWrapper value={langStrings}>
            {children}
        </TextProvidingWrapper>
    );
}

type Pages = "home" | 
    "testUserLeadership" | "testUserSchedule" | "testUserBudgetAverage" | "testUserBudgetSpecial" | 
    "result" | "chemistry"

function usePageString(page: Pages) {
    return Object(useContext(baseTextContext).public.pages[page]);
}

function usePageAsset(page: Pages) {
    // return useContext(baseTextContext).public.assets[page];
}

export { AggregateTextProvider, usePageAsset, usePageString }