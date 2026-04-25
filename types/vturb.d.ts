import * as React from 'react'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'vturb-smartplayer': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          id?: string
        },
        HTMLElement
      >
    }
  }
}

export {}
