import { sidebar, renderer, layer, library, navbar, configPanel, basic } from './editor'
import { chart } from './chart'
import { text } from './text'
import { decoration } from './decoration'
import { search } from './search'

const config = {
  component: { chart, text, decoration, search },
  operation: { sidebar, renderer, layer, library, navbar, configPanel },
  basic
}

export default config
