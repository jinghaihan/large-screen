import { sidebar, renderer, library, navbar, configPanel, basic, model } from './editor'
import { chart } from './chart'
import { text } from './text'
import { decoration } from './decoration'
import { search } from './search'
import { table } from './table'

const config = {
  component: { chart, text, decoration, search, table },
  operation: { sidebar, renderer, library, navbar, configPanel },
  basic,
  model
}

export default config
