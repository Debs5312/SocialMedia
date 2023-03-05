import { Link } from "react-router-dom";
import { Button, Container, Header, Image, Segment } from "semantic-ui-react";

export default function Homepage() {
    return (
        <Segment inverted textAlign="center" vertical className="masthead">
            <Container text>
                <Header as='h1' inverted>
                    <Image size="massive" src='/Items/logo.png' alt='logo' style={{ marginBottom: 12 }} />
                    Twitter
                </Header>
                <Header as='h2' inverted content='Welcome to Twitter' />
                <Button as={Link} to='/activities' size='huge' inverted>
                    Take me to Activity
                </Button>
            </Container>
        </Segment>
    )
}