'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main className="not-found"><h1>We couldn’t load this page.</h1><p>Your Enquiry List is saved on this device. Please try again.</p><button className="btn primary" onClick={()=>reset()}>Try again</button><a href="/">Back to Home</a></main>}
