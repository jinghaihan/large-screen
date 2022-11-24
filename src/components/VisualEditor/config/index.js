import { chart } from './chart'
import { sidebar, renderer, layer, library, navbar, configPanel, basic } from './editor'
import { text } from './text'

const config = {
  component: { chart, text },
  operation: { sidebar, renderer, layer, library, navbar, configPanel },
  basic
}

export default config
