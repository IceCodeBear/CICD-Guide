import React from "react";
import { Container, Dropdown, Menu } from "semantic-ui-react";

const navbar = () => (
    <div>
        <Menu fixed="top" inverted>
        <Container>
            <Menu.Item as="a" header href="/">
            <span aria-label="bear" role="img" style={{ marginRight: "1em" }}>
                &#x2601;
            </span>

            CICD-Guide
            </Menu.Item>

            <Dropdown item simple text="Getting Started">
                <Dropdown.Menu>
                    <Dropdown.Item href="/budget101">CICD 101</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>

            <Menu.Item as="a" href="/aws">AWS</Menu.Item>

            <Menu.Item as="a" href="/azure">Azure</Menu.Item>

            <Menu.Item as="a" href="/gcp">GCP</Menu.Item>

        </Container>
        </Menu>
    </div>
);

export default navbar;
