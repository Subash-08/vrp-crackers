import type { Metadata } from 'next';
import './globals.css';
import { StoreProvider } from '@/components/vrp/store';
export const metadata:Metadata={title:{default:'VRP Crackers · Mecheri, Salem',template:'%s · VRP Crackers'},description:'Explore the VRP Crackers 2026 catalogue, shortlist products and enquire on WhatsApp for manufacturer-coordinated delivery.',icons:{icon:'/favicon.png',shortcut:'/favicon.png'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Noto+Sans+Tamil:wght@400;600&display=swap" rel="stylesheet"/></head><body><StoreProvider>{children}</StoreProvider></body></html>}
