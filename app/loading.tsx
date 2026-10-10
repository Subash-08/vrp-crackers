import {Skeleton} from '@/components/ui/skeleton';
export default function Loading(){return <main className="wrap section" aria-label="Loading catalogue"><Skeleton className="h-14 w-2/3 mb-8"/><div className="product-grid">{[1,2,3,4].map(x=><Skeleton key={x} className="h-96 rounded-2xl"/>)}</div></main>}
