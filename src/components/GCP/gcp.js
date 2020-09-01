import React from "react";
import { Container, Header } from "semantic-ui-react";
// import Markdown from 'react-markdown'
// import google from './gcp.md'

// class GCP extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { md: '' }
//     }

//     componentDidMount() {
//         fetch(google)
//             .then((res) => res.text())
//             .then((md) => {
//             this.setState({ md })
//         })
//     }

//     render() {
//         return (
//             <Container text>
//                 <div>
//                     <Markdown source={this.state.md}/>
//                 </div>
//             </Container>
//         )
//     }
// }
const GCP = () => (
    <Container text>
        <Header as="h1">Setup CICD on GCP with Github</Header>
        {/* <Markdown path="./gcp.md"/> */}
    </Container>
);

export default GCP;