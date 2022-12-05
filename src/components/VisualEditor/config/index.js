import { sidebar, renderer, layer, library, navbar, configPanel, basic, model, batch } from './editor'
import { chart } from './chart'
import { text } from './text'
import { decoration } from './decoration'
import { search } from './search'
import { table } from './table'

const config = {
  component: { chart, text, decoration, search, table },
  operation: { sidebar, renderer, layer, library, navbar, configPanel },
  basic,
  model,
  batch
}

export default config
