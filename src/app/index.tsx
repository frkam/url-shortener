import "normalize.css"
import "./styles/typography.scss"
import "./index.scss"
import "./styles/utility.scss"
import { Routing } from "@/pages"
import { withRedux } from "@/app/providers"

const App = () => {
  return <Routing />
}

export default withRedux(App)
