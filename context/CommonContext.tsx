import { useRouter } from "next/router";
import { createContext, ReactNode } from "react";

type commonContextType = {
    locale: string;
};

const commonContextDefaultValues: commonContextType = {
    locale:'',
};

const CommonContext = createContext<commonContextType>(commonContextDefaultValues);

export function useCommon() {
    const router = useRouter()

    const getLocale = () => {
        if (!router.locale) return 'en';
        if (router.locale !== 'en') return router.locale;
        return 'en';
    }

    return {
        locale:getLocale(),
    };
}

type Props = {
    children: ReactNode;
};

export function CommonProvider({ children }: Props) {
    return (
        <>
            <CommonContext.Provider value={useCommon()}>
                {children}
            </CommonContext.Provider>
        </>
    );
}
