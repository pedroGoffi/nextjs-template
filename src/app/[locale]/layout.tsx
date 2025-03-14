import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {Locale, routing} from '@i18n/routing';
import { AppProvider } from '@ui/providers/providers';
import { redirect } from '@i18n/navigation';
import "@css/globals.css"
 
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  // Ensure that the incoming `locale` is valid  
  let { locale } = await params;      
  if (!routing.locales.includes(locale as Locale)){
    // Not accepted route redirects to home with default language to make sure its safer
    redirect({ href: "/", locale: routing.defaultLocale })
    return null
  }
   
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider 
          messages={messages}
        >
          <AppProvider>
            {children}
          </AppProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}