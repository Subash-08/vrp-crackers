import type {AnchorHTMLAttributes} from 'react';
// Native document navigation keeps URLs, browser history, hashes and catch-all routes aligned.
// It avoids reliance on client-side route interception for this catalogue.
export function SiteLink({href,...props}:AnchorHTMLAttributes<HTMLAnchorElement>&{href:string}){return <a href={href} {...props}/>;}
