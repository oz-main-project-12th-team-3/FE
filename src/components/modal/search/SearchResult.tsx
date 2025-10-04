import type { SearchRes } from "./SearchModal";

export function SearchResult ({searchRes}:{searchRes:SearchRes}) {
    return <>{searchRes.id}</>
}