import React from "react";
import { Container, Header } from "semantic-ui-react";
// import Markdown from 'react-markdown'
// import azure from './azure.md'

// class Azure extends Component {
//     constructor(props) {
//         super(props)
//         this.state = { md: '' }
//     }

//     componentDidMount() {
//         fetch(azure)
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

const Azure = () => (
    <Container text>
        <Header as="h1">Setup CICD on Azure with Github</Header>
    </Container>
);

export default Azure;