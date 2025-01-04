import { ThemeProvider } from '@/components/theme-provider'
import React from 'react'

type Props = {children: React.ReactNode}

const Layout = ({children}: Props) => {
  return (
    <div>
        <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
    </div>
  )
}

export default Layout