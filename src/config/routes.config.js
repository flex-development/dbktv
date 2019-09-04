// Components
import {
  Articles, Default, Multimedia, News, Slide
} from '../components/templates'

/**
 * @file Route config
 * @author Lexus Drumgold <lex@lexusdrumgold.design>
 */
export default [
  {
    path: '/articles/:slug',
    component: Slide,
    template: Articles
  },
  {
    path: '/default/:slug',
    component: Slide,
    template: Default
  },
  {
    path: '/multimedia/:slug',
    component: Slide,
    template: Multimedia
  },
  {
    path: '/news/:slug',
    component: Slide,
    template: News
  }
]
